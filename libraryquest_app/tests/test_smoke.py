from django.test import TestCase
from django.urls import resolve
from libraryquest_app.views import default_view


class SmokeTest(TestCase):
    def test_root_url(self):
        print("Starting the smoke test")
        found = resolve("/")
        self.assertEqual(found.func, default_view)


