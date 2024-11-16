from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException, StaleElementReferenceException
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
    links = {
        "email": None,
        "instagram": None,
        "facebook": None,
        "discord": None,
        "website": None
    }

    def safe_find(xpath):
        try:
            # Re-fetch element to avoid stale reference
            return WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.XPATH, xpath))
            ).get_attribute("href")
        except (NoSuchElementException, TimeoutException, StaleElementReferenceException):
            return None

    links["email"] = safe_find("//a[contains(@href, 'mailto')]")
    links["instagram"] = safe_find("//a[contains(@href, 'instagram')]")
    links["facebook"] = safe_find("//a[contains(@href, 'facebook')]")
    links["discord"] = safe_find("//a[contains(@href, 'discord')]")
    links["website"] = safe_find("//a[contains(@href, 'http') and contains(@href, 'uw') and not(contains(@href, 'mailto'))]")

    return links


# Helper function to scrape the executive team
def scrape_executive_team():
    try:
        team_section = driver.find_elements(By.XPATH, "//ul/li[contains(text(), ':')]")
        return [member.text.strip() for member in team_section]
    except NoSuchElementException:
        return []

# Helper function to scrape other sections
def scrape_section_by_header(header_text):
    try:
        section_header = driver.find_element(By.XPATH, f"//h2/span[contains(text(), '{header_text}')]")
        section_container = section_header.find_element(By.XPATH, "./ancestor::div[contains(@class, 'c-story-blocks__block-container')]")
        return section_container.text.strip()
    except NoSuchElementException:
        return f"{header_text} not available"

# Scraping function for each club
def scrape_club(url, club_name):
    driver.get(url)

    # Wait for the page to load
    try:
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "c-story-blocks")))
    except TimeoutException:
        print(f"Error: Timeout loading page for {club_name}")
        return {"club": club_name, "error": "Page load timeout"}

    data = {"club": club_name}

    # Scrape description
    try:
        data["description"] = driver.find_element(By.XPATH, "//div[contains(@class, 'c-story-blocks')]//p").text.strip()
    except NoSuchElementException:
        data["description"] = "Description not available"

    # Scrape try-it sessions or schedules
    data["try_it_sessions"] = scrape_section_by_header("SCHEDULE")

    # Scrape fees
    try:
        data["fee"] = driver.find_element(By.XPATH, "//ul/li[contains(text(), '$')]").text.strip()
    except NoSuchElementException:
        try:
            data["fee"] = driver.find_element(By.XPATH, "//p[contains(text(), 'Fee')]").text.strip()
        except NoSuchElementException:
            data["fee"] = "Fee information not available"

    # Scrape membership link
    try:
        data["membership_link"] = driver.find_element(By.XPATH, "//a[contains(@href, 'membership') and contains(@href, 'uwaterloo')]").get_attribute("href")
    except NoSuchElementException:
        data["membership_link"] = "Membership link not available"

    # Scrape join-now link
    try:
        data["join_now_link"] = driver.find_element(By.XPATH, "//a[contains(text(),'JOIN TODAY') or contains(text(),'Join Now')]").get_attribute("href")
    except NoSuchElementException:
        data["join_now_link"] = "Join link not available"

    # Scrape links
    data["contact"] = find_contact_links()

    # Scrape executive team
    data["executive_team"] = scrape_executive_team()

    return data

# Main function to scrape all clubs
def main():
    folder_path = "webscraping/recreational sports clubs"
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Club details
    clubs = [
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/22/rec-landing-page-chinese-martial-arts.aspx", "name": "Chinese Martial Arts"},
        {"url": "https://athletics.uwaterloo.ca/sports/2022/12/19/fencing-club.aspx", "name": "Fencing"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/22/rec-landing-page-judo.aspx", "name": "Judo"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/22/rec-landing-page-karate-jujitsu-club.aspx", "name": "Karate & Jujitsu"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/22/rec-landing-page-kendo-club.aspx", "name": "Kendo"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/9/22/rec-landing-page-muay-thai-club.aspx", "name": "Muay Thai"},
        {"url": "https://athletics.uwaterloo.ca/sports/2023/12/15/tae-kwon-do-club.aspx", "name": "Taekwondo"}
    ]

    # Scrape each club's page and collect data
    clubs_data = [scrape_club(club["url"], club["name"]) for club in clubs]

    # Save JSON file in the specified folder
    json_path = os.path.join(folder_path, "combat_sports_clubs.json")
    with open(json_path, "w") as outfile:
        json.dump(clubs_data, outfile, indent=4)

    print(f"Data scraped and saved to {json_path}")

if __name__ == "__main__":
    main()
    driver.quit()
