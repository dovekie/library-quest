from django.test import TestCase
from rest_framework.test import APIClient
from ..models import Reader
from rest_framework_simplejwt.tokens import RefreshToken


class ReaderApiTest(TestCase):
    fixtures = ["libraryquest_app"]

    def test_superuser_can_get_reader_list(self):
        super_reader = Reader.objects.create_superuser(
            username="foo", email="foo@bar.baz", password="fooisI"
        )
        client = APIClient()
        refresh = RefreshToken.for_user(super_reader)
        client.credentials(HTTP_AUTHORIZATION=f"JWT {refresh.access_token}")
        response = client.get("/api/readers/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["name"], "Robin Swift")

    def test_reader_can_get_own_record(self):
        reader = Reader.objects.create_user(
            username="biz", email="biz@bar.baz", password="bizisI"
        )
        client = APIClient()
        refresh = RefreshToken.for_user(reader)
        client.credentials(HTTP_AUTHORIZATION=f"JWT {refresh.access_token}")
        response = client.get(f"/api/readers/{reader.id}/")
        self.assertEqual(response.status_code, 200)

    def test_reader_cannot_get_someone_elses_record(self):
        reader = Reader.objects.create_user(
            username="zip", email="zip@bar.baz", password="zipisI"
        )
        client = APIClient()
        refresh = RefreshToken.for_user(reader)
        client.credentials(HTTP_AUTHORIZATION=f"JWT {refresh.access_token}")
        response = client.get(f"/api/readers/1/")
        self.assertEqual(response.status_code, 403)
