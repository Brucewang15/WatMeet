from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import json
import os

# Set up the Selenium WebDriver
service = Service(executable_path="chromedriver\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")
options.binary_location = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
driver = webdriver.Chrome(service=service, options=options)

# Helper function to find contact links
def find_contact_links():
    links = {}
    try:
        links["email"] = driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href")
    except NoSuchElementException:
        links["email"] = None

    try:
        links["instagram"] = driver.find_element(By.XPATH, "//a[contains(@href, 'instagram')]").get_attribute("href")
    except NoSuchElementException:
        links["instagram"] = None

    try:
        links["facebook"] = driver.find_element(By.XPATH, "//a[contains(@href, 'facebook')]").get_attribute("href")
    except NoSuchElementException:
        links["facebook"] = None

    try:
        links["discord"] = driver.find_element(By.XPATH, "//a[contains(@href, 'discord')]").get_attribute("href")
    except NoSuchElementException:
        links["discord"] = None

    try:
        links["website"] = driver.find_element(By.XPATH, "//a[contains(@href, 'http') and not(contains(@href, 'mailto')) and not(contains(@href, 'instagram')) and not(contains(@href, 'facebook')) and not(contains(@href, 'discord'))]").get_attribute("href")
    except NoSuchElementException:
        links["website"] = None

    return links

# Helper function to scrape the executive team
def scrape_executive_team():
    try:
        team_section = driver.find_elements(By.XPATH, "//ul/li[contains(text(), ':')]")
        return [member.text for member in team_section]
    except NoSuchElementException:
        return []

# Scraping functions
def scrape_club(url, club_name):
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "c-story-blocks")))

    data = {"club": club_name}
    try:
        data["description"] = driver.find_element(By.XPATH, "//div[contains(@class,'c-story-blocks')]//p").text
    except NoSuchElementException:
        data["description"] = "Description not available"

    try:
        data["try_it_sessions"] = driver.find_element(By.XPATH, "//table").text
    except NoSuchElementException:
        data["try_it_sessions"] = "Try-it session details not available"

    try:
        data["fee"] = driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text
    except NoSuchElementException:
        try:
            data["fee"] = driver.find_element(By.XPATH, "//p[contains(text(),'Fee')]").text
        except NoSuchElementException:
            data["fee"] = "Fee information not available"

    try:
        data["membership_link"] = driver.find_element(By.XPATH, "//a[contains(@href, 'membership')]").get_attribute("href")
    except NoSuchElementException:
        data["membership_link"] = "Membership link not available"

    try:
        data["schedule_link"] = driver.find_element(By.XPATH, "//a[contains(text(),'schedule') or contains(text(),'Schedule')]").get_attribute("href")
    except NoSuchElementException:
        data["schedule_link"] = "Schedule link not available"

    try:
        data["join_now_link"] = driver.find_element(By.XPATH, "//a[contains(text(),'JOIN TODAY')]").get_attribute("href")
    except NoSuchElementException:
        data["join_now_link"] = "Join link not available"

    # Add contact and executive team data
    data["contact"] = find_contact_links()
    data["executive_team"] = scrape_executive_team()

    return data

# Main function
def main():
    folder_path = "webscraping/recreational sports clubs"
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Club details
    clubs = [
        {"url": "https://athletics.uwaterloo.ca/sports/2022/12/19/artistic-synchronized-swimming-club.aspx", "name": "Artistic Swimming"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-dragon-boat-club.aspx", "name": "Dragon Boat"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-lifesaving.aspx", "name": "Lifesaving"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-triathlon-club.aspx", "name": "Triathlon"},
        {"url": "https://athletics.uwaterloo.ca/sports/2024/3/1/underwater-hockey.aspx", "name": "Underwater Hockey"}
    ]

    # Scrape each club's page and collect data
    clubs_data = [scrape_club(club["url"], club["name"]) for club in clubs]

    # Save JSON file in the specified folder
    json_path = os.path.join(folder_path, "aquatic_clubs.json")
    with open(json_path, "w") as outfile:
        json.dump(clubs_data, outfile, indent=4)

    print(f"Data scraped and saved to {json_path}")

if __name__ == "__main__":
    main()
    driver.quit()
