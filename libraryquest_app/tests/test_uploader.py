from django.test import Client, TestCase
from rest_framework import status
from requests import Session
from unittest.mock import MagicMock, patch, PropertyMock
from libraryquest_app.models import Library, MembershipZone, Reader
from rest_framework_simplejwt.tokens import AccessToken


class LibraryUploaderTest(TestCase):

    def setUp(self):
        # Incoming data from https://www.library.ca.gov/wp-content/uploads/2022/08/LocalLibraryLocations.csv
        self.mock_library_data = MagicMock()
        type(self.mock_library_data).text = PropertyMock(
            return_value="Location,Main Library Name,10.15 Phone,Latitude,Longtitude,10.6 Street Address,10.7 City,10.8 Zip Code,10.9 Zip+4 Code,10.1 FSCSKey,URL\n\
A. K. SMILEY PUBLIC LIBRARY,A. K. SMILEY PUBLIC LIBRARY,(909) 798-7565,34.05408,-117.18396,125 W. VINE ST.,REDLANDS,92373,4728,CA0165,http://www.akspl.org\n\
ALBANY LIBRARY,ALAMEDA COUNTY LIBRARY,(510) 526-3720,37.88797,-122.29299,1247 MARIN AVENUE,ALBANY,94706,1796,CA0001,http://www.aclibrary.org\n"
        )

        # only superusers can import library data, so set one up.
        admin = Reader.objects.create_superuser(
            "myuser", "myemail@test.com", "password"
        )
        self.token = AccessToken.for_user(admin)

        self.client = Client()

    @patch.object(Session, "get")
    def test_uploader(self, mock_get):
        # One Membership Zone already exists when we start importing libraries
        MembershipZone.objects.create(name="A. K. Smiley Public Library")
        
        mock_get.return_value = self.mock_library_data
        response = self.client.post(
            "/api/libraries/batch/",
            {"url": "http://source/of/library/info.csv"},
            headers={"Authorization": f"JWT {self.token}"},
        )
        libraries = Library.objects.all()
        self.assertEqual(len(libraries), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
