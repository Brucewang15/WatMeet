from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
# make sure python version and selenium matches up (compare pip -V and Python Interpreter)
import time
import json

# Incorporates Selenium Manager, if driver isn't found on system path, 
# Selenium Manager will automatically download it
service = Service(executable_path="C:/Users/PC/Documents/GitHub/WatMeet/google chromedriver/chromedriver-win64/chromedriver-win64/chromedriver.exe")
options = webdriver.ChromeOptions()

# Set up the Selenium WebDriver (use the path where you installed ChromeDriver)
driver = webdriver.Chrome(service=service, options=options)

# URL of the UWaterloo intramurals page
url = 'https://athletics.uwaterloo.ca/sports/2022/4/27/intramurals.aspx'

# Open the webpage
driver.get(url)

# Wait for the page to fully load (adjust time if necessary)
time.sleep(5)

# Scrape the sport details from the page
sports_data = {
    'fall_sports': [],
    'winter_sports': [],
    'sport_rules_links': []
}

# Extract the fall sports list (adjust based on your inspection)
fall_sports_section = driver.find_element(By.XPATH, "//h3[text()='Fall']/following-sibling::ul")
fall_sports = fall_sports_section.find_elements(By.TAG_NAME, 'li')
for sport in fall_sports:
    sports_data['fall_sports'].append(sport.text)

# Extract the winter sports list (adjust based on your inspection)
winter_sports_section = driver.find_element(By.XPATH, "//h3[text()='Winter']/following-sibling::ul")
winter_sports = winter_sports_section.find_elements(By.TAG_NAME, 'li')
for sport in winter_sports:
    sports_data['winter_sports'].append(sport.text)

# Extract the links to the intramural sport rules (adjust based on your inspection)
rules_section = driver.find_element(By.XPATH, "//ul[preceding-sibling::h3[text()='Intramural Rules']]")
rules_links = rules_section.find_elements(By.TAG_NAME, 'a')
for rule in rules_links:
    rule_data = {
        'name': rule.text,
        'link': rule.get_attribute('href')
    }
    sports_data['sport_rules_links'].append(rule_data)

# Close the browser
driver.quit()

# Write the collected data into a JSON file
with open('uwaterloo_intramurals.json', 'w') as json_file:
    json.dump(sports_data, json_file, indent=4)

print("Scraping complete. Data has been saved to uwaterloo_intramurals.json")
