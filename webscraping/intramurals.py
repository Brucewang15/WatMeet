from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

# Set up the Selenium WebDriver (use the path where you installed ChromeDriver)
driver = webdriver.Chrome(executable_path="C:\Users\PC\Documents\GitHub\WatMeet\google chromedriver\chromedriver-win64\chromedriver-win64\chromedriver.exe")

# URL of the UWaterloo intramurals page
url = 'https://athletics.uwaterloo.ca/sports/2022/4/27/intramurals.aspx'

# Open the webpage
driver.get(url)

# Wait for the page to fully load
time.sleep(5)  # Adjust this based on the complexity of the page

# Scrape the sport details from the page
sports_data = []

# Example: Inspect the page for actual CSS selectors
sections = driver.find_elements(By.CSS_SELECTOR, 'div.some-class')  # Adjust 'div.some-class'

for section in sections:
    # Extract the sport name
    title_elem = section.find_element(By.TAG_NAME, 'h2')  # Adjust 'h2' based on structure
    sport_name = title_elem.text if title_elem else 'Unknown Sport'
    
    # Extract the sport description
    description_elem = section.find_element(By.TAG_NAME, 'p')  # Adjust 'p'
    sport_description = description_elem.text if description_elem else 'No description available.'
    
    # Extract links, if available
    link_elem = section.find_element(By.TAG_NAME, 'a')  # Adjust 'a'
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
with open('uwaterloo_intramurals.json', 'w') as json_file:
    json.dump(sports_data, json_file, indent=4)

print("Scraping complete. Data has been saved to uwaterloo_intramurals.json")
