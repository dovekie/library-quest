from django.test import Client, TestCase


class LibraryApiTest(TestCase):
    fixtures = ["libraryquest_app"]

    def test_libraries(self):
        client = Client()
        response = client.get("/api/libraries/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data[0],
            {
                "id": 1,
                "name": "Oakland Public Library Main",
                "address": "125 14th St, Oakland, CA 94612",
                "lat": 37.80131995454677,
                "lon": -122.26345590757161,
                "membership_zone": 1,
            },
        )

