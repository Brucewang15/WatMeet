from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json

# Incorporates Selenium Manager, if driver isn't found on system path
service = Service(executable_path="C:\\Users\\PC\\Documents\\GitHub\\WatMeet\\chromedriver\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
options = webdriver.ChromeOptions()

# Set up the Selenium WebDriver (use the path where you installed ChromeDriver)
driver = webdriver.Chrome(service=service, options=options)

# URL of the UWaterloo intramurals page
url = 'https://athletics.uwaterloo.ca/sports/2022/4/27/intramurals.aspx'

# Open the webpage
driver.get(url)

# Use WebDriverWait instead of time.sleep to wait for elements to load
wait = WebDriverWait(driver, 10)

# Scrape the sport details from the page
sports_data = {
    'fall_sports': [],
    'winter_sports': [],
    'sport_rules_links': []
}

# Find the fall sports section (adjust based on your inspection)
try:
    fall_sports_section = wait.until(EC.presence_of_element_located((By.XPATH, "//h2[text()='Fall']/following-sibling::ul")))  # Adjust based on the correct structure
    fall_sports = fall_sports_section.find_elements(By.TAG_NAME, 'li')
    for sport in fall_sports:
        sports_data['fall_sports'].append(sport.text)
except Exception as e:
    print(f"Failed to scrape fall sports: {e}")

# Find the winter sports section (adjust based on your inspection)
try:
    winter_sports_section = wait.until(EC.presence_of_element_located((By.XPATH, "//h2[text()='Winter']/following-sibling::ul")))  # Adjust based on the correct structure
    winter_sports = winter_sports_section.find_elements(By.TAG_NAME, 'li')
    for sport in winter_sports:
        sports_data['winter_sports'].append(sport.text)
except Exception as e:
    print(f"Failed to scrape winter sports: {e}")

# Extract the links to the intramural sport rules (adjust based on your inspection)
try:
    rules_section = wait.until(EC.presence_of_element_located((By.XPATH, "//ul[preceding-sibling::h2[text()='Intramural Rules']]")))
    rules_links = rules_section.find_elements(By.TAG_NAME, 'a')
    for rule in rules_links:
        rule_data = {
            'name': rule.text,
            'link': rule.get_attribute('href')
        }
        sports_data['sport_rules_links'].append(rule_data)
except Exception as e:
    print(f"Failed to scrape intramural rules links: {e}")

# Close the browser
driver.quit()

# Write the collected data into a JSON file
with open('intramurals.json', 'w') as json_file:
    json.dump(sports_data, json_file, indent=4)

print("Scraping complete. Data has been saved to intramurals.json")
