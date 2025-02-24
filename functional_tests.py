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
        non_membership_markers = self.browser.find_elements(
            By.CLASS_NAME, "library-1246"
        )
        marker = non_membership_markers[0]
        marker.click()
        visible_info_windows = self.browser.find_elements(By.CLASS_NAME, "info-window")
        self.assertEqual(len(visible_info_windows), 1)
        next_marker = self.browser.find_elements(By.CLASS_NAME, "library-1247")
        next_marker[0].click()
        visible_info_windows = self.browser.find_elements(By.CLASS_NAME, "info-window")
        self.assertEqual(len(visible_info_windows), 1)

    @unittest.skip("skip until we can also delete users")
    def test_can_create_user(self):
        self.browser.get("http://localhost:5173/")
        time.sleep(3)
        login_button = self.browser.find_element(By.ID, "signup-button")
        login_button.click()
        name_box = self.browser.find_element(By.NAME, "name")
        username_box = self.browser.find_element(By.NAME, "new_username")
        email_box = self.browser.find_element(By.NAME, "email")
        password_box = self.browser.find_element(By.NAME, "new_password")
        re_password_box = self.browser.find_element(By.NAME, "re_password")
        name_box.send_keys("ally aardvark")
        username_box.send_keys("aardvark")
        email_box.send_keys("aaa@ants.org")
        password_box.send_keys("antlover")
        re_password_box.send_keys("antlover")
        time.sleep(3)
        submit_button = self.browser.find_element(By.ID, "submit-signup")
        submit_button.click()
        time.sleep(3)
        welcome = self.browser.find_element(By.CLASS_NAME, "header--welcome-name")
        self.assertIn(welcome.text, "Welcome, ally aardvark!")

    # FIXME these tests will break if any changes are made to the test user's memberships
    def test_logged_in_user_sees_membership_markers(self):
        self.browser.get("http://localhost:5173/")
        time.sleep(3)
        login_button = self.browser.find_element(By.ID, "login-button")
        login_button.click()
        password_box = self.browser.find_element(By.NAME, "password")
        username_box = self.browser.find_element(By.NAME, "username")
        login_button = self.browser.find_element(By.ID, "submit-login")
        password_box.send_keys("babelbook")
        username_box.send_keys("robinswift")
        login_button.click()
        time.sleep(3)
        welcome = self.browser.find_element(By.CLASS_NAME, "header--welcome-name")
        self.assertIn(welcome.text, "Welcome, Robin Swift!")
        membership_markers = self.browser.find_elements(
            By.CLASS_NAME, "membership-marker"
        )
        self.assertEqual(len(membership_markers), 3)

    def test_user_can_add_and_remove_memberships(self):
        self.browser.get("http://localhost:5173/")
        time.sleep(3)
        login_button = self.browser.find_element(By.ID, "login-button")
        login_button.click()
        password_box = self.browser.find_element(By.NAME, "password")
        username_box = self.browser.find_element(By.NAME, "username")
        submit_button = self.browser.find_element(By.ID, "submit-login")
        password_box.send_keys("babelbook")
        username_box.send_keys("robinswift")
        submit_button.click()
        time.sleep(3)
        non_membership_markers = self.browser.find_elements(
            By.CLASS_NAME, "library-1246"
        )
        marker = non_membership_markers[0]
        marker.click()
        time.sleep(3)
        add_membership_button = self.browser.find_element(
            By.CLASS_NAME, "change-membership-button"
        )
        add_membership_button.click()
        time.sleep(3)
        membership_markers = self.browser.find_elements(
            By.CLASS_NAME, "membership-marker"
        )
        self.assertEqual(len(membership_markers), 29)
        marker.click()
        remove_membership_button = self.browser.find_element(
            By.CLASS_NAME, "change-membership-button"
        )
        remove_membership_button.click()
        time.sleep(3)
        membership_markers = self.browser.find_elements(
            By.CLASS_NAME, "membership-marker"
        )
        self.assertEqual(len(membership_markers), 3)

    def test_search(self):
        self.browser.get("http://localhost:5173/")
        time.sleep(3)
        submit_button = self.browser.find_element(By.ID, "submit-library-search")
        search_box = self.browser.find_element(By.NAME, "search_input")
        search_box.send_keys("rockridge")
        submit_button.click()
        markers = self.browser.find_elements(By.CLASS_NAME, "no-membership-marker")
        self.assertEqual(len(markers), 1)
        clear_button = self.browser.find_element(By.ID, "clear-library-search")
        clear_button.click()
        time.sleep(3)
        markers = self.browser.find_elements(By.CLASS_NAME, "no-membership-marker")
        self.assertGreater(len(markers), 1)


if __name__ == "__main__":
    unittest.main(warnings="ignore")
