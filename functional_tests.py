from selenium import webdriver
import unittest


class NewVisitorTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_can_select_libraries_and_retrieve_them_later(self):
        # user visits the website
        self.browser.get("http://localhost:8000")

        # sees the Library Quest header
        self.assertIn("Welcome to Library Quest!", self.browser.title)
        self.fail("Finish the test!")

        # is invited to enter their location

        # is shown a map of nearby libraries

        # is shown a list of libraries

        # can check off libraries to indicate whether they have a library card for that library yet

        # the page updates to show the checked-off libraries

        # the site generates a unique URL for the user

        # when the user returns to that URL, their libraries are still checked off

if __name__ == "__main__":
    unittest.main(warnings="ignore")