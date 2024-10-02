from django.test import Client, TestCase


class ReaderApiTest(TestCase):
    fixtures = ["libraryquest_app"]

    def test_readers(self):
        client = Client()
        response = client.get("/api/readers/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["name"], "Robin Swift")
