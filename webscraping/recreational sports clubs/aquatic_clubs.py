from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time

# Set up the Selenium WebDriver
service = Service(executable_path="chromedriver\chromedriver-win64\chromedriver-win64\chromedriver.exe")
options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")  # Bypass sandbox mode to avoid permission issues
driver = webdriver.Chrome(service=service, options=options)

import json
import time

# Initialize the WebDriver
driver = webdriver.Chrome()

def scrape_artistic_swimming():
    url = "https://athletics.uwaterloo.ca/sports/2022/12/19/artistic-synchronized-swimming-club.aspx"
    driver.get(url)
    time.sleep(2)  # Wait for page to load
    
    data = {
        "club": "Artistic Swimming",
        "description": driver.find_element(By.XPATH, "//div[contains(text(),'The Artistic Swimming Club...')]").text,
        "try_it_sessions": driver.find_element(By.XPATH, "//table").text,
        "fee": driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text,
        "contact": driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href"),
    }
    return data

def scrape_dragon_boat():
    url = "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-dragon-boat-club.aspx"
    driver.get(url)
    time.sleep(2)  # Wait for page to load
    
    data = {
        "club": "Dragon Boat",
        "description": driver.find_element(By.XPATH, "//p[contains(text(),'Dragon Boat is...')]").text,
        "try_it_sessions": driver.find_element(By.XPATH, "//table").text,
        "fee": driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text,
        "contact": driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href"),
    }
    return data

def scrape_lifesaving():
    url = "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-lifesaving.aspx"
    driver.get(url)
    time.sleep(2)  # Wait for page to load
    
    data = {
        "club": "Lifesaving",
        "description": driver.find_element(By.XPATH, "//p[contains(text(),'Welcome to the Lifesaving')]").text,
        "try_it_sessions": driver.find_element(By.XPATH, "//table").text,
        "fee": driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text,
        "contact": driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href"),
    }
    return data

def scrape_triathlon():
    url = "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-triathlon-club.aspx"
    driver.get(url)
    time.sleep(2)  # Wait for page to load
    
    data = {
        "club": "Triathlon",
        "description": driver.find_element(By.XPATH, "//p[contains(text(),'The Warriors Triathlon Club')]").text,
        "try_it_sessions": driver.find_element(By.XPATH, "//table").text,
        "fee": driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text,
        "contact": driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href"),
    }
    return data

def scrape_underwater_hockey():
    url = "https://athletics.uwaterloo.ca/sports/2024/3/1/underwater-hockey.aspx"
    driver.get(url)
    time.sleep(2)  # Wait for page to load
    
    data = {
        "club": "Underwater Hockey",
        "description": driver.find_element(By.XPATH, "//p[contains(text(),'Underwater Hockey is a co-ed')]").text,
        "try_it_sessions": driver.find_element(By.XPATH, "//table").text,
        "fee": driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text,
        "contact": driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href"),
    }
    return data

def main():
    clubs_data = []
    
    # Scrape each club's page
    clubs_data.append(scrape_artistic_swimming())
    clubs_data.append(scrape_dragon_boat())
    clubs_data.append(scrape_lifesaving())
    clubs_data.append(scrape_triathlon())
    clubs_data.append(scrape_underwater_hockey())
    
    # Save to JSON file
    with open("aquatic_clubs.json", "w") as outfile:
        json.dump(clubs_data, outfile, indent=4)
    
    print("Data scraped and saved to aquatic_clubs.json")

if __name__ == "__main__":
    main()
    driver.quit()
