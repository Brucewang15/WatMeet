import json
import os
import re
os.chdir('./organizations/info')

# Open and read the JSON file
with open(r"club_info.json", 'r') as file:
    data = json.load(file)

# Print the data

def extract_links(club_info):
    # Define regex to find URLs in the overview text
    url_pattern = r'(https?://[^\s]+|[^\s]+\.com|[^\s]+\.ca|[^\s]+\.org)'
    platform_names_pattern = r'(YouTube|Facebook|Instagram|Twitter|E-mail|Email|Email:[^\s]+@[^.]+\.\w+)'
    
    # Initialize a dictionary to store extracted links
    links = {
        'YouTube': [],
        'Facebook': [],
        'Instagram': [],
        'Twitter': [],
        'Website': [],
        'Email': []
    }

    # Find all URLs in the 'overviews' section of the dictionary
    overview_text = club_info.get('overviews', '')
    found_urls = re.findall(url_pattern, overview_text)
    
    # Categorize URLs based on platform and add to links dictionary
    for url in found_urls:
        if 'youtube' in url:
            links['YouTube'].append(url)
        elif 'facebook' in url:
            links['Facebook'].append(url)
        elif 'instagram' in url:
            links['Instagram'].append(url)
        elif 'twitter' in url:
            links['Twitter'].append(url)
        elif '@gmail' in url:
            links['Email'].append(url)
        else:
            links['Website'].append(url)
    
    # Remove URLs from overview text after extraction
    cleaned_overview = re.sub(url_pattern, '', overview_text)
    cleaned_overview = re.sub(platform_names_pattern, '', cleaned_overview)
    club_info['overviews'] = cleaned_overview.strip()
    
    # Add the extracted links to the club_info dictionary
    club_info['links'] = links
    
    return club_info

for i in range(len(data)):
    data[i] = extract_links(data[i])

# Save the cleaned data to a new JSON file
with open(r"cleaned_club_info.json", 'w') as file:
    json.dump(data, file, indent=4)