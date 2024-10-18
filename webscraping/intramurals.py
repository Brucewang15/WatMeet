from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

# Set up the Selenium WebDriver (use the path where you installed ChromeDriver)
service = Service(executable_path="C:\\Users\\PC\\Documents\\GitHub\\WatMeet\\chromedriver\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=service, options=options)

# URL of the UWaterloo intramurals page
url = 'https://athletics.uwaterloo.ca/sports/2022/4/27/intramurals.aspx'
driver.get(url)

# Wait for the page to fully load
wait = WebDriverWait(driver, 10)

# Prepare data dictionary to store scraped data
sports_data = {
    'fall_sports': [],
    'winter_sports': [],
    'sport_rules_links': []
}

# Scrape Fall Sports
try:
    fall_sports_section = wait.until(EC.presence_of_element_located((By.XPATH, "//h2/span[contains(text(), 'Fall')]/following::ul[1]")))
    fall_sports = fall_sports_section.find_elements(By.TAG_NAME, 'li')
    for sport in fall_sports:
        sports_data['fall_sports'].append(sport.text)
except Exception as e:
    print(f"Error scraping Fall sports: {e}")

# Scrape Winter Sports
try:
    winter_sports_section = wait.until(EC.presence_of_element_located((By.XPATH, "//h2/span[contains(text(), 'Winter')]/following::ul[1]")))
    winter_sports = winter_sports_section.find_elements(By.TAG_NAME, 'li')
    for sport in winter_sports:
        sports_data['winter_sports'].append(sport.text)
except Exception as e:
    print(f"Error scraping Winter sports: {e}")

# Scrape Intramural Rules and Links
try:
    rules_section = wait.until(EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Rules')]/following::ul[1]")))
    rules_links = rules_section.find_elements(By.TAG_NAME, 'a')
    for rule in rules_links:
        rule_data = {
            'name': rule.text,
            'link': rule.get_attribute('href')
        }
        sports_data['sport_rules_links'].append(rule_data)
except Exception as e:
    print(f"Error scraping sport rules: {e}")

# Close the browser
driver.quit()

# Write the collected data into a JSON file
with open('intramurals.json', 'w') as json_file:
    json.dump(sports_data, json_file, indent=4)

print("Scraping complete. Data has been saved to intramurals.json")
