import requests
from bs4 import BeautifulSoup
import json

url = 'https://athletics.uwaterloo.ca/sports/2022/4/27/intramurals.aspx'

# Send a GET request to fetch the HTML content
response = requests.get(url)
if response.status_code != 200:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    exit()

# HTML parser to parse page content
soup = BeautifulSoup(response.content, 'html.parser')

# Finds relavent information to sports offered
sports_data = []
sections = soup.find_all('div', class_='content')

for section in sections:
    # Extract sports name (headers/titles)
    title = section.find('h2')
    if title:
        sport_name = title.text.strip()

        # Extracts sport descriptions
        description = section.find('p')
        if description:
            sport_description = description.text.strip()
        else:
            sport_description = 'No description available.'

        # Extracts links related to the sport
        link = section.find('a')
        if link:
            sport_link = link['href']
        else:
            sport_link = 'No link available.'

        # Collects data for each sport
        sports_data.append({
            'name': sport_name,
            'description': sport_description,
            'link': sport_link
        })

# Writes data into JSON file
with open('intramurals.json', 'w') as json_file:
    json.dump(sports_data, json_file, indent=4)

print("Scraping complete. Data has been saved to uwaterloo_intramurals.json")

