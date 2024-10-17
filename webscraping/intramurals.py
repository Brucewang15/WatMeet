import requests
from bs4 import BeautifulSoup
import json

# URL of the UWaterloo intramurals page
url = 'https://athletics.uwaterloo.ca/sports/2022/4/27/intramurals.aspx'

# Send a GET request to fetch the HTML content
response = requests.get(url)
if response.status_code == 404:
    print(f"Error: The page was not found (404).")
    exit()

if response.status_code != 200:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    exit()

# Parse the page content with BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find the relevant sections containing sports offerings
sports_data = []
sections = soup.find_all('div', class_='content')

for section in sections:
    # Extract sports name (headers or titles)
    title = section.find('h2')
    if title:
        sport_name = title.text.strip()

        # Extract sport description
        description = section.find('p')
        if description:
            sport_description = description.text.strip()
        else:
            sport_description = 'No description available.'

        # Extract any links related to the sport
        link = section.find('a')
        if link:
            sport_link = link['href']
        else:
            sport_link = 'No link available.'

        # Collect data for each sport
        sports_data.append({
            'name': sport_name,
            'description': sport_description,
            'link': sport_link
        })

# Write the collected data into a JSON file
with open('uwaterloo_intramurals.json', 'w') as json_file:
    json.dump(sports_data, json_file, indent=4)

print("Scraping complete. Data has been saved to uwaterloo_intramurals.json")
