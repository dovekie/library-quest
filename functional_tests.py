from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest
import time


class NewVisitorTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_visitor_sees_a_map(self):
        # user visits the website
        self.browser.get("http://localhost:5173/")

        # sees the Library Quest header
        self.assertIn("Welcome to Library Quest!", self.browser.title)

        # sees a map
        map_box = self.browser.find_element(By.CLASS_NAME, "map-box")
        self.assertTrue(map_box.is_displayed())
    
    def test_one_info_window_shows_on_marker_click(self):
        self.browser.get("http://localhost:5173/")
        time.sleep(3)
        non_membership_markers = self.browser.find_elements(By.CLASS_NAME, "no-membership-marker")
        marker = non_membership_markers[0]
        marker.click()
        visible_info_windows = self.browser.find_elements(By.CLASS_NAME, "info_window")
        self.assertEqual(len(visible_info_windows), 1)
        next_marker = non_membership_markers[-1]
        next_marker.click()
        visible_info_windows = self.browser.find_elements(By.CLASS_NAME, "info_window")
        self.assertEqual(len(visible_info_windows), 1)

# FIXME these tests will break if any changes are made to the test user's memberships
    def test_logged_in_user_sees_membership_markers(self): 
        self.browser.get("http://localhost:5173/")
        time.sleep(3)
        login_button = self.browser.find_element(By.NAME, "login-button")
        login_button.click()
        password_box = self.browser.find_element(By.NAME, "password")
        username_box = self.browser.find_element(By.NAME, "username")
        login_button = self.browser.find_element(By.CLASS_NAME, "submit")
        password_box.send_keys("babelbook")
        username_box.send_keys("robinswift")
        login_button.click()
        time.sleep(3)
        membership_markers = self.browser.find_elements(By.CLASS_NAME, "membership-marker")
        self.assertEqual(len(membership_markers), 3)

    def test_user_can_add_and_remove_memberships(self):
        self.browser.get("http://localhost:5173/")
        time.sleep(3)
        login_button = self.browser.find_element(By.NAME, "login-button")
        login_button.click()
        password_box = self.browser.find_element(By.NAME, "password")
        username_box = self.browser.find_element(By.NAME, "username")
        submit_button = self.browser.find_element(By.CLASS_NAME, "submit")
        password_box.send_keys("babelbook")
        username_box.send_keys("robinswift")
        submit_button.click()
        time.sleep(3)
        non_membership_markers = self.browser.find_elements(By.CLASS_NAME, "no-membership-marker")
        marker = non_membership_markers[0]
        marker.click()
        time.sleep(3)
        add_membership_button = self.browser.find_element(By.CLASS_NAME, "change-membership-button")
        add_membership_button.click()
        time.sleep(3)
        membership_markers = self.browser.find_elements(By.CLASS_NAME, "membership-marker")
        self.assertEqual(len(membership_markers), 4)
        marker.click()
        remove_membership_button = self.browser.find_element(By.CLASS_NAME, "change-membership-button")
        remove_membership_button.click()
        time.sleep(3)
        membership_markers = self.browser.find_elements(By.CLASS_NAME, "membership-marker")
        self.assertEqual(len(membership_markers), 3)

if __name__ == "__main__":
    unittest.main(warnings="ignore")