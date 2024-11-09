# File path: web_scraper.py

from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import time

def scrape_artistic_swimming_page(url, output_filename="artistic_swimming.json"):
    # Initialize the Selenium WebDriver
    driver = webdriver.Chrome()
    
    # Open the webpage
    driver.get(url)
    time.sleep(2)  # Allow the page to load

    # Extract club data
    club_data = {
        "club_name": None,
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

    # Club name
    try:
        club_name_element = driver.find_element(By.XPATH, "//h2[text()='Artistic Swimming']")
        club_data["club_name"] = club_name_element.text
    except:
        pass

    # Description
    try:
        description_element = driver.find_element(By.XPATH, "//h2[contains(text(), 'DESCRIPTION')]/following-sibling::div/p")
        club_data["description"] = description_element.text.strip()
    except:
        pass

    # Join Today link
    try:
        join_link_element = driver.find_element(By.XPATH, "//a[contains(text(), 'JOIN TODAY!')]")
        club_data["join_today_link"] = join_link_element.get_attribute("href")
    except:
        pass

    # Try-It Sessions
    try:
        try_it_table = driver.find_element(By.XPATH, "//h2[contains(text(), 'TRY-IT SESSIONS')]/following-sibling::div/table")
        rows = try_it_table.find_elements(By.TAG_NAME, "tr")
        for row in rows[1:]:  # Skip header row
            columns = row.find_elements(By.TAG_NAME, "td")
            club_data["try_it_sessions"].append({
                "date": columns[0].text.strip(),
                "location": columns[1].text.strip(),
                "time": columns[2].text.strip()
            })
    except:
        pass

    # Fee
    try:
        fee_element = driver.find_element(By.XPATH, "//h2[contains(text(), 'FEE')]/following-sibling::div/ul/li")
        club_data["fee"] = fee_element.text.strip()
    except:
        pass

    # Executive Team
    try:
        exec_team_elements = driver.find_elements(By.XPATH, "//h2[contains(text(), 'OUR EXECUTIVE TEAM')]/following-sibling::div/ul/li")
        for exec_member in exec_team_elements:
            club_data["executive_team"].append(exec_member.text.strip())
    except:
        pass

    # Schedule
    try:
        schedule_elements = driver.find_elements(By.XPATH, "//h2[contains(text(), 'SCHEDULE')]/following-sibling::div/ul/li")
        for schedule in schedule_elements:
            club_data["schedule"].append(schedule.text.strip())
    except:
        pass

    # Competitions
    try:
        competition_sections = driver.find_elements(By.XPATH, "//h2[contains(text(), 'COMPETITIONS')]/following-sibling::div/ul/li")
        for competition in competition_sections:
            comp_title = competition.find_element(By.TAG_NAME, "button").text.strip()
            comp_content = competition.find_element(By.CLASS_NAME, "c-story-blocks__block-container").text.strip()
            club_data["competitions"].append({
                "title": comp_title,
                "details": comp_content
            })
    except:
        pass

    # Contact Links
    try:
        contact_links = driver.find_elements(By.XPATH, "//a[contains(text(), 'EMAIL') or contains(text(), 'INSTAGRAM') or contains(text(), 'FACEBOOK')]")
        for contact in contact_links:
            club_data["contacts"].append({
                "type": contact.text.strip(),
                "link": contact.get_attribute("href")
            })
    except:
        pass

    # Coordinator Contact
    try:
        coordinator_element = driver.find_element(By.XPATH, "//p[contains(text(), 'Coordinator Contact Information')]")
        club_data["coordinator_contact"] = coordinator_element.text.split("-")[-1].strip()
    except:
        pass

    # Close the driver
    driver.quit()

    # Save to a JSON file
    with open(output_filename, "w", encoding="utf-8") as json_file:
        json.dump(club_data, json_file, ensure_ascii=False, indent=4)

    print(f"Data extraction complete and saved to {output_filename}")

# Example usage
scrape_artistic_swimming_page("https://athletics.uwaterloo.ca/sports/2022/12/19/artistic-synchronized-swimming-club.aspx")
