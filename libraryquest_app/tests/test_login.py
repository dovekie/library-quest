from django.test import Client, TestCase
from django.core import mail
from rest_framework import status

from libraryquest_app.models import Reader


class PasswordResetTest(TestCase):
    # endpoints needed
    send_reset_password_email_url = "/auth/users/reset_password/"
    confirm_reset_password_url = "/auth/users/reset_password_confirm/"
    login_url = "/auth/jwt/create/"

    def test_reset_password(self):
        client = Client()
        reader = Reader.objects.create_user(
            username="biz", email="biz@bar.baz", password="bizisI"
        )

        # a user asks to reset their password
        data = {"email": reader.email}
        response = client.post(self.send_reset_password_email_url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # they receive an email with a password reset link
        email_lines = mail.outbox[0].body.splitlines()
        reset_link = [l for l in email_lines if "/reset_password/" in l][0]
        uid, token = reset_link.split("/")[-2:]

        # they send a new password using that link
        data = {"uid": uid, "token": token, "new_password": "new_verysecret"}
        response = self.client.post(
            self.confirm_reset_password_url, data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # their old password should no longer work
        response = self.client.post(
            self.login_url,
            {"username": reader.username, "password": "bizisI"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # they can log in with their new password
        login_data = {
            "username": reader.username,
            "password": "new_verysecret",
        }
        response = self.client.post(self.login_url, login_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
