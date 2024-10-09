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
    club_pages = soup.findAll("div", attrs={'class':"truncated-text"})
    club_info = {
        'overview' : [],
    }
    for page in club_pages:
        overview = page.findAll("p")
        overview_temp = ""
        for p in overview:
            overview_temp += p.text
        club_info['overview'].append(overview_temp)
    print(club_info)
    return club_info




club_numbers = []
for i in range(20):
    club_numbers.append(get_club_links(f'https://clubs.wusa.ca/club_listings?page={i+1}'))
    for k in range(len(club_numbers[i])):
        get_club_info(club_numbers[i][k])



