from bs4 import BeautifulSoup
import requests


def get_club_links(url): #takes in wusa club page url and returns a list of links to all clubs on the page.
    page_to_scrape=requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

    wusa_clubs = soup.findAll("div", attrs={'class':"card card-body mb-3 rounded-3"})

    club_links = []
    for club in wusa_clubs:
        link_temp = club.find("a")
        club_links.append(link_temp.get('href'))
    return club_links

def get_club_info(club_url): #takes in a specific club url. 
    
    page_to_scrape=requests.get(f'https://clubs.wusa.ca{club_url}')
    page_to_scrape2 = requests.get(f'https://clubs.wusa.ca{club_url}/constitution')

    overview=BeautifulSoup(page_to_scrape.text, 'html.parser')
    constitution = BeautifulSoup(page_to_scrape2.text, 'html.parser') # don't forget this

    club_info = {
        'names': [],
        'overviews' : [],
        'membership_type': [],
    }

    club_overviews = overview.findAll("div", attrs={'id':"truncated-text"})

    club_name = overview.find('h5', attrs={'class':"club-name-header text-center text-md-start"})

    club_membership = constitution.find('section', attrs={'id':"membership_structure"})
    club_membership_layer2 = club_membership.find('section', attrs={'id':"membership_structure"})
    club_membership_type = club_membership_layer2.find('div', attrs={'class':"alert alert-secondary"})

    club_info['names'].append(club_name.text)
    club_info['membership_type'].append(club_membership_type.text)
    
    for page in club_overviews:
        club_overview = page.findAll("p")
        club_overview_temp = "" 
        
        for txt in club_overview:
            club_overview_temp += txt.text
        club_info['overviews'].append(club_overview_temp)
    
    
    return club_info


club_numbers = []
club_data = []
for i in range(20):
    club_numbers.append(get_club_links(f'https://clubs.wusa.ca/club_listings?page={i+1}'))
    for k in range(len(club_numbers[i])):
        club_data.append(get_club_info(club_numbers[i][k]))
print(club_data)
        



