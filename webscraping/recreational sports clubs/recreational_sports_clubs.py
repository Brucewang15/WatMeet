# File path: recreational_sports_club_scraper.py

from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import time
import os

def initialize_driver():
    """Initializes the Selenium WebDriver."""
    driver = webdriver.Chrome()
    return driver

def scrape_artistic_swimming(driver, url):
    """Scrapes data for the Artistic Swimming club and adds it to the JSON file."""
    driver.get(url)
    time.sleep(2)  # Allow the page to load

    artistic_swimming_data = {
        "club_name": "Artistic Swimming",
        "description": None,
        "join_today_link": None,
        "try_it_sessions": [],
        "fee": None,
        "executive_team": [],
        "schedule": [],
        "competitions": [],
        "contacts": [],
        "coordinator_contact": None
    }

    # Scrape data for Artistic Swimming
    try:
        club_name_element = driver.find_element(By.XPATH, "//h2[text()='Artistic Swimming']")
        artistic_swimming_data["club_name"] = club_name_element.text
    except:
        pass

    try:
        description_element = driver.find_element(By.XPATH, "//h2[contains(text(), 'DESCRIPTION')]/following-sibling::div/p")
        artistic_swimming_data["description"] = description_element.text.strip()
    except:
        pass

    try:
        join_link_element = driver.find_element(By.XPATH, "//a[contains(text(), 'JOIN TODAY!')]")
        artistic_swimming_data["join_today_link"] = join_link_element.get_attribute("href")
    except:
        pass

    try:
        try_it_table = driver.find_element(By.XPATH, "//h2[contains(text(), 'TRY-IT SESSIONS')]/following-sibling::div/table")
        rows = try_it_table.find_elements(By.TAG_NAME, "tr")
        for row in rows[1:]:
            columns = row.find_elements(By.TAG_NAME, "td")
            artistic_swimming_data["try_it_sessions"].append({
                "date": columns[0].text.strip(),
                "location": columns[1].text.strip(),
                "time": columns[2].text.strip()
            })
    except:
        pass

    try:
        fee_element = driver.find_element(By.XPATH, "//h2[contains(text(), 'FEE')]/following-sibling::div/ul/li")
        artistic_swimming_data["fee"] = fee_element.text.strip()
    except:
        pass

    try:
        exec_team_elements = driver.find_elements(By.XPATH, "//h2[contains(text(), 'OUR EXECUTIVE TEAM')]/following-sibling::div/ul/li")
        for exec_member in exec_team_elements:
            artistic_swimming_data["executive_team"].append(exec_member.text.strip())
    except:
        pass

    try:
        schedule_elements = driver.find_elements(By.XPATH, "//h2[contains(text(), 'SCHEDULE')]/following-sibling::div/ul/li")
        for schedule in schedule_elements:
            artistic_swimming_data["schedule"].append(schedule.text.strip())
    except:
        pass

    try:
        competition_sections = driver.find_elements(By.XPATH, "//h2[contains(text(), 'COMPETITIONS')]/following-sibling::div/ul/li")
        for competition in competition_sections:
            comp_title = competition.find_element(By.TAG_NAME, "button").text.strip()
            comp_content = competition.find_element(By.CLASS_NAME, "c-story-blocks__block-container").text.strip()
            artistic_swimming_data["competitions"].append({
                "title": comp_title,
                "details": comp_content
            })
    except:
        pass

    try:
        contact_links = driver.find_elements(By.XPATH, "//a[contains(text(), 'EMAIL') or contains(text(), 'INSTAGRAM') or contains(text(), 'FACEBOOK')]")
        for contact in contact_links:
            artistic_swimming_data["contacts"].append({
                "type": contact.text.strip(),
                "link": contact.get_attribute("href")
            })
    except:
        pass

    try:
        coordinator_element = driver.find_element(By.XPATH, "//p[contains(text(), 'Coordinator Contact Information')]")
        artistic_swimming_data["coordinator_contact"] = coordinator_element.text.split("-")[-1].strip()
    except:
        pass

    append_to_json(artistic_swimming_data)

def scrape_dragon_boat(driver, url):
    """Scrapes data for the Dragon Boat club and adds it to the JSON file."""
    driver.get(url)
    time.sleep(2)  # Allow the page to load

    dragon_boat_data = {
        "club_name": "Dragon Boat Club",
        "description": None,
        "join_today_link": None,
        "try_it_sessions": [],
        "fee": None,
        "executive_team": [],
        "schedule": [],
        "competitions": [],
        "contacts": [],
        "coordinator_contact": None
    }

    # Scrape data for Dragon Boat
    try:
        description_element = driver.find_element(By.XPATH, "//h2[contains(text(), 'DESCRIPTION')]/following-sibling::div/p")
        dragon_boat_data["description"] = description_element.text.strip()
    except:
        pass

    try:
        join_link_element = driver.find_element(By.XPATH, "//a[contains(text(), 'JOIN TODAY!')]")
        dragon_boat_data["join_today_link"] = join_link_element.get_attribute("href")
    except:
        pass

    try:
        try_it_table = driver.find_element(By.XPATH, "//h2[contains(text(), 'TRY-IT SESSIONS')]/following-sibling::div/table")
        rows = try_it_table.find_elements(By.TAG_NAME, "tr")
        for row in rows[1:]:
            columns = row.find_elements(By.TAG_NAME, "td")
            dragon_boat_data["try_it_sessions"].append({
                "date": columns[0].text.strip(),
                "location": columns[1].text.strip()
            })
    except:
        pass

    try:
        fee_element = driver.find_element(By.XPATH, "//h2[contains(text(), 'FEE')]/following-sibling::div/ul/li")
        dragon_boat_data["fee"] = fee_element.text.strip()
    except:
        pass

    try:
        exec_team_elements = driver.find_elements(By.XPATH, "//h2[contains(text(), 'OUR EXECUTIVE TEAM')]/following-sibling::div/ul/li")
        for exec_member in exec_team_elements:
            dragon_boat_data["executive_team"].append(exec_member.text.strip())
    except:
        pass

    try:
        schedule_elements = driver.find_elements(By.XPATH, "//h2[contains(text(), 'SCHEDULE')]/following-sibling::div/ul/li")
        for schedule in schedule_elements:
            dragon_boat_data["schedule"].append(schedule.text.strip())
    except:
        pass

    try:
        competition_sections = driver.find_elements(By.XPATH, "//h2[contains(text(), 'COMPETITIONS')]/following-sibling::div/ul/li")
        for competition in competition_sections:
            comp_title = competition.find_element(By.TAG_NAME, "button").text.strip()
            comp_content = competition.find_element(By.CLASS_NAME, "c-story-blocks__block-container").text.strip()
            dragon_boat_data["competitions"].append({
                "title": comp_title,
                "details": comp_content
            })
    except:
        pass

    try:
        contact_links = driver.find_elements(By.XPATH, "//a[contains(text(), 'Website') or contains(text(), 'INSTAGRAM') or contains(text(), 'DISCORD')]")
        for contact in contact_links:
            dragon_boat_data["contacts"].append({
                "type": contact.text.strip(),
                "link": contact.get_attribute("href")
            })
    except:
        pass

    try:
        coordinator_element = driver.find_element(By.XPATH, "//p[contains(text(), 'Coordinator Contact Information')]")
        dragon_boat_data["coordinator_contact"] = coordinator_element.text.split("-")[-1].strip()
    except:
        pass

    append_to_json(dragon_boat_data)

def append_to_json(club_data, filename="recreational_sports_club.json"):
    """Appends club data to the JSON file under the Aquatic Sports section."""
    if os.path.exists(filename):
        with open(filename, "r+", encoding="utf-8") as json_file:
            data = json.load(json_file)
            if "Aquatic Sports" not in data:
                data["Aquatic Sports"] = []
            data["Aquatic Sports"].append(club_data)
            json_file.seek(0)
            json.dump(data, json_file, ensure_ascii=False, indent=4)
    else:
        with open(filename, "w", encoding="utf-8") as json_file:
            json.dump({"Aquatic Sports": [club_data]}, json_file, ensure_ascii=False, indent=4)

    print(f"Data for {club_data['club_name']} added to {filename}")

# Main script execution
if __name__ == "__main__":
    driver = initialize_driver()
    try:
        scrape_artistic_swimming(driver, "https://athletics.uwaterloo.ca/sports/2022/12/19/artistic-synchronized-swimming-club.aspx")
        scrape_dragon_boat(driver, "https://athletics.uwaterloo.ca/sports/2023/9/21/rec-landing-page-dragon-boat-club.aspx")
    finally:
        driver.quit()
