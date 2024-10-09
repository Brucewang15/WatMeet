from bs4 import BeautifulSoup
import requests
import json


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
        'names': "",
        'overviews' : "",
        'membership_type': "",
    }

    club_overviews = overview.findAll("div", attrs={'id':"full-text"})

    club_name = overview.find('h5', attrs={'class':"club-name-header text-center text-md-start"})

    club_membership = constitution.find('section', attrs={'id':"membership_structure"})
    club_membership_layer2 = club_membership.find('section', attrs={'id':"membership_structure"})
    club_membership_type = club_membership_layer2.find('div', attrs={'class':"alert alert-secondary"}) #fix this

    club_info['names'] = club_name.text
    club_info['membership_type'] = club_membership_type.text
    
    for page in club_overviews:
        club_overview = page.findAll("p")
        club_overview_temp = "" 
        
        for txt in club_overview:
            club_overview_temp += txt.text
        club_info['overviews']= club_overview_temp
    
    
    return club_info


# club_numbers = []
# club_data = []
# for i in range(20):
#     club_numbers.append(get_club_links(f'https://clubs.wusa.ca/club_listings?page={i+1}'))
#     for k in range(len(club_numbers[i])):
#         club_data.append(get_club_info(club_numbers[i][k]))
# print(club_data)

# with open('club_info.json', 'w') as json_file:
#     json.dump(club_data, json_file, indent=4)



def get_designTeam_info(url):
    page_to_scrape=requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

    all_design_info=[]


    all_teams = soup.findAll('details', attrs={'class':"uw-details"})
    for team in all_teams:
        
        design_info = {
            'name': "",
            "img_url": "",
            "description": "",
            "links": [],
        }
        name_temp = team.find('summary', attrs={'class':"details__summary"})
        design_info['name'] = name_temp.find('h2').text

        content = team.find('div', attrs={'class':"uw-copy-text"})
        img_url_temp = content.find('img')
        design_info['img_url'] = img_url_temp.get('src')


    return all_design_info

print(get_designTeam_info('https://uwaterloo.ca/sedra-student-design-centre/directory-teams'))



