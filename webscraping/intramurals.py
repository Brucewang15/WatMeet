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
sports_data = []

# Example: Locate the correct sections (adjust CSS selector based on the exact page structure)
sections = driver.find_elements(By.CSS_SELECTOR, 'div.sidearm-schedule-game')  # Example of a container for each sport

for section in sections:
    # Extract the sport name (adjust based on the correct HTML tag, e.g., h3, h2)
    title_elem = section.find_element(By.TAG_NAME, 'h3')  # Check if h3 contains the title
    sport_name = title_elem.text if title_elem else 'Unknown Sport'
    
    # Extract the sport description
    description_elem = section.find_element(By.TAG_NAME, 'p')  # Description in a paragraph tag
    sport_description = description_elem.text if description_elem else 'No description available.'
    
    # Extract links, if available
    link_elem = section.find_element(By.TAG_NAME, 'a')  # Links for more info
    sport_link = link_elem.get_attribute('href') if link_elem else 'No link available.'

    # Store the data
    sports_data.append({
        'name': sport_name,
        'description': sport_description,
        'link': sport_link
    })

# Close the browser
driver.quit()

# Write the collected data into a JSON file
with open('intramurals.json', 'w') as json_file:
    json.dump(sports_data, json_file, indent=4)

print("Scraping complete. Data has been saved to intramurals.json")
