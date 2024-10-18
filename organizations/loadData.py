import json

from organizations.models import Organization

#.../webscraping/club_info.json
#    webscraping/club_info.json

f = open('webscraping/club_info.json') # your current directory is the main

# returns JSON object as a dictionary
data = json.load(f)

for i in data:
    print(i)

# Closing file
f.close() 