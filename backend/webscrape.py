from bs4 import BeautifulSoup
import requests


def get_club_links(url):
    page_to_scrape=requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

    wusa_clubs = soup.findAll("div", attrs={'class':"card card-body mb-3 rounded-3"})

    club_links = []
    for club in wusa_clubs:
        link_temp = club.find("a")
        club_links.append(link_temp.get('href'))
    return club_links

def get_club_info(club_url):
    print(f'https://clubs.wusa.ca{club_url}')
    page_to_scrape=requests.get(f'https://clubs.wusa.ca{club_url}')
    soup=BeautifulSoup(page_to_scrape.text, 'html.parser')

    club_info = {
        'names': [],
        'overviews' : [],
    }

    club_overviews = soup.findAll("div", attrs={'id':"truncated-text"})
    club_name = soup.find('h5', attrs={'class':"club-name-header text-center text-md-start"})
    club_info['names'].append(club_name.text)
    
    for page in club_overviews:
        overview = page.findAll("p")
        overview_temp = "" 
        
        for txt in overview:
            overview_temp += txt.text
        club_info['overviews'].append(overview_temp)
    
    
    return club_info




club_numbers = []
club_data = []
for i in range(20):
    club_numbers.append(get_club_links(f'https://clubs.wusa.ca/club_listings?page={i+1}'))
    for k in range(len(club_numbers[i])):
        club_data.append(get_club_info(club_numbers[i][k]))
print(club_data)
        



