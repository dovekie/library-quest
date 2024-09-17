from django.test import TestCase
from django.urls import resolve
from django.http import HttpRequest
from libraryquest_app.views import home_page

class SmokeTest(TestCase):
    def test_root_url(self):
        found = resolve("/")
        self.assertEqual(found.func, home_page)

    def test_home_page_returns_correct_html(self):
        request = HttpRequest()
        response = home_page(request)
        html = response.content.decode("utf8")
        self.assertTrue(html.startswith("<html>"))
        self.assertIn("<title>Welcome to Library Quest!</title>", html)
        self.assertTrue(html.endswith("</html>"))