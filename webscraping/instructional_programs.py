from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

# Set up the Selenium WebDriver
service = Service(executable_path="C:\\Users\\PC\\Documents\\GitHub\\WatMeet\\chromedriver\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=service, options=options)

# URL of the instructional programs page
url = 'https://athletics.uwaterloo.ca/sports/2010/7/21/Instructional_Classes.aspx'
driver.get(url)

# Wait for the page to fully load
wait = WebDriverWait(driver, 10)

# Prepare data dictionary to store scraped data
programs_data = []

# Scrape each program category
try:
    categories = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'c-story-blocks__block-container')))
    current_category = None

    for category in categories:
        header = category.find_elements(By.TAG_NAME, 'h3')
        if header:
            current_category = header[0].text.strip()
        
        # Find program sections within each category
        program_sections = category.find_elements(By.CLASS_NAME, 'c-story-blocks__structural_accordion_block__list-item')
        
        for section in program_sections:
            # Expand each program section to reveal all class details
            try:
                program_name_button = section.find_element(By.CLASS_NAME, 'c-story-blocks__structural_accordion_block__list-item-toggle')
                program_name_button.click()
            except Exception:
                pass
            
            # Collect all classes under this program section
            content = section.find_elements(By.CLASS_NAME, 'c-story-blocks__block-container')
            for block in content:
                program_info = {
                    'Category': current_category,
                    'Program Name': 'N/A',
                    'Class Description': 'N/A',
                    'Class Times': 'N/A',
                    'Location': 'N/A',
                    'Instructor Name': 'N/A',
                    'Instructor Description': 'N/A',
                    'Registration Link': 'N/A'
                }
                
                # Program name
                class_name = block.find_elements(By.TAG_NAME, 'h4')
                if class_name:
                    program_info['Program Name'] = class_name[0].text.strip()

                # Class times and description
                description = block.find_elements(By.TAG_NAME, 'p')
                if description:
                    program_info['Class Description'] = description[0].text.strip()

                for p in description:
                    if 'Offering' in p.text or 'Fall' in p.text:
                        program_info['Class Times'] = p.text.strip()
                
                # Registration link
                reg_link = block.find_elements(By.TAG_NAME, 'a')
                if reg_link:
                    program_info['Registration Link'] = reg_link[0].get_attribute('href')
                
                # Instructor details
                instructor_header = block.find_elements(By.TAG_NAME, 'h4')
                if instructor_header and 'Instructor' in instructor_header[0].text:
                    instructor_name = instructor_header[0].find_element(By.XPATH, 'following-sibling::p')
                    instructor_description = instructor_name.find_element(By.XPATH, 'following-sibling::p') if instructor_name else None
                    program_info['Instructor Name'] = instructor_name.text.strip() if instructor_name else 'N/A'
                    program_info['Instructor Description'] = instructor_description.text.strip() if instructor_description else 'N/A'
                
                # Append each class within the category
                programs_data.append(program_info)

except Exception as e:
    print(f"Error scraping programs: {e}")

# Close the browser
driver.quit()

# Write the collected data into a JSON file
with open('instructional_programs.json', 'w') as json_file:
    json.dump(programs_data, json_file, indent=4)

print("Scraping complete. Data has been saved to instructional_programs.json")
