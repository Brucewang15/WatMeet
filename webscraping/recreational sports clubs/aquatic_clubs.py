from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import json
import os

# Set up the Selenium WebDriver with correct Chrome binary path and no sandbox option
service = Service(executable_path="chromedriver\chromedriver-win64\chromedriver-win64\chromedriver.exe")
options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")
options.binary_location = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
driver = webdriver.Chrome(service=service, options=options)

# Scraping functions
def scrape_artistic_swimming():
    url = "https://athletics.uwaterloo.ca/sports/2022/12/19/artistic-synchronized-swimming-club.aspx"
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "c-story-blocks")))

    data = {"club": "Artistic Swimming"}
    try:
        data["description"] = driver.find_element(By.XPATH, "//div[contains(@class,'c-story-blocks')]//p").text
        data["try_it_sessions"] = driver.find_element(By.XPATH, "//table").text
        data["fee"] = driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text
        data["contact"] = driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href")
    except NoSuchElementException as e:
        print(f"Element not found in Artistic Swimming page: {e}")
    return data

def scrape_dragon_boat():
    url = "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-dragon-boat-club.aspx"
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "c-story-blocks")))

    data = {"club": "Dragon Boat"}
    try:
        data["description"] = driver.find_element(By.XPATH, "//div[contains(@class,'c-story-blocks')]//p").text
        data["try_it_sessions"] = driver.find_element(By.XPATH, "//table").text
        data["fee"] = driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text
        data["contact"] = driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href")
    except NoSuchElementException as e:
        print(f"Element not found in Dragon Boat page: {e}")
    return data

def scrape_lifesaving():
    url = "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-lifesaving.aspx"
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "c-story-blocks")))

    data = {"club": "Lifesaving"}
    try:
        data["description"] = driver.find_element(By.XPATH, "//div[contains(@class,'c-story-blocks')]//p").text
        data["try_it_sessions"] = driver.find_element(By.XPATH, "//table").text
        data["fee"] = driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text
        data["contact"] = driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href")
    except NoSuchElementException as e:
        print(f"Element not found in Lifesaving page: {e}")
    return data

def scrape_triathlon():
    url = "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-triathlon-club.aspx"
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "c-story-blocks")))

    data = {"club": "Triathlon"}
    try:
        data["description"] = driver.find_element(By.XPATH, "//div[contains(@class,'c-story-blocks')]//p").text
        data["try_it_sessions"] = driver.find_element(By.XPATH, "//table").text
        data["fee"] = driver.find_element(By.XPATH, "//ul/li[contains(text(),'$')]").text
        data["contact"] = driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href")
    except NoSuchElementException as e:
        print(f"Element not found in Triathlon page: {e}")
    return data

def scrape_underwater_hockey():
    url = "https://athletics.uwaterloo.ca/sports/2024/3/1/underwater-hockey.aspx"
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "c-story-blocks")))

    data = {"club": "Underwater Hockey"}
    try:
        data["description"] = driver.find_element(By.XPATH, "//div[contains(@class,'c-story-blocks')]//p").text
        data["try_it_sessions"] = driver.find_element(By.XPATH, "//table").text
        
        # Attempt to locate fee; if not found, default to "Fee info not available"
        try:
            data["fee"] = driver.find_element(By.XPATH, "//*[contains(text(),'$')]").text
        except NoSuchElementException:
            print("Fee information not found on Underwater Hockey page.")
            data["fee"] = "Fee info not available"

        data["contact"] = driver.find_element(By.XPATH, "//a[contains(@href, 'mailto')]").get_attribute("href")
    except NoSuchElementException as e:
        print(f"Element not found in Underwater Hockey page: {e}")
    
    return data

def main():
    # Folder path where you want to save the JSON file
    folder_path = "webscraping/recreational sports clubs"
    
    # Create the folder if it does not exist
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    
    # Scrape each club's page and collect data
    clubs_data = [
        scrape_artistic_swimming(),
        scrape_dragon_boat(),
        scrape_lifesaving(),
        scrape_triathlon(),
        scrape_underwater_hockey(),
    ]
    
    # Save JSON file in the specified folder
    json_path = os.path.join(folder_path, "aquatic_clubs.json")
    with open(json_path, "w") as outfile:
        json.dump(clubs_data, outfile, indent=4)
    
    print(f"Data scraped and saved to {json_path}")


if __name__ == "__main__":
    main()
    driver.quit()
