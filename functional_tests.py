from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest
import time


class NewVisitorTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_logged_in_user_sees_a_map(self):
        # user visits the website
        self.browser.get("http://localhost:5173/")

        # sees the Library Quest header
        self.assertIn("Welcome to Library Quest!", self.browser.title)

        # sees a map
        map_box = self.browser.find_element(By.CLASS_NAME, "map-box")
        self.assertTrue(map_box.is_displayed())

    def test_logged_in_user_sees_membership_markers(self): 
        # FIXME set up a logged in user
        self.browser.get("http://localhost:5173/")
        time.sleep(5)
        membership_markers = self.browser.find_elements(By.CLASS_NAME, "membership-marker")
        self.assertEqual(len(membership_markers), 3) # FIXME add a membership zone to the test user

    def test_can_select_libraries_and_retrieve_them_later(self):
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