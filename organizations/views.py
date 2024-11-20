from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from organizations.models import Organization
from organizations.models import Tag

from .search.sort_data import sort_data
from .search.searchDropDrown.sort_data_prefix import sort_data_prefix
from .search.tfidfSearch.tfidfSearch import tfidfSearch
from .filterSearch.filter import filterData
import json

# Create your views here.

# used for the drop down for searchs
def get_potential_club_data(request):
    query = json.loads(request.body).get("query")
    
    data = Organization.objects.all().values()
    data = sort_data_prefix(data, query)
    return JsonResponse(data, safe=False)
        

def get_club_data(request):
    
    selectedType = json.loads(request.body).get("selectedType")
    if selectedType == 'All':
        data = Organization.objects.all().values()
    elif selectedType == 'Clubs':
        data = Organization.objects.filter(org_type = 'club').values()
    elif selectedType == 'Design Teams':
        data = Organization.objects.filter(org_type = 'design').values()
    elif selectedType == 'Sports':
        data = Organization.objects.filter(org_type = 'sportclub')
    elif selectedType == 'Intramurals':
        data = Organization.objects.filter(org_type = 'Intramurals')

    search_propt = json.loads(request.body).get("searchPropt")
    minStarRating = json.loads(request.body).get("minStarRating")
    minAmountRating = json.loads(request.body).get("minAmountRating")
    tagStates = json.loads(request.body).get("tagStates") #array

    new_data = sort_data(data, search_propt)

    #testing
    """for d in new_data:
        print(d["org_name"])
    print("\n\n\n DONE \n\n\n")"""

    if len(new_data) < 10:
        new_data += list(filter(lambda x: not (x in new_data), tfidfSearch(search_propt, data)))
    
    #testing
    """for d in new_data:
        print(d["org_name"])"""

    #filter out everything below minRating
    
    data = list(filter(lambda elem: Organization.objects.get(org_name=elem["org_name"]).star_rating >= float(minStarRating), new_data)) #array of dictionaries of clubs
    data = list(filter(lambda elem: Organization.objects.get(org_name=elem["org_name"]).number_of_star_rating >= float(minAmountRating), data))

    data = filterData(data, tagStates)

    return JsonResponse(data, safe=False)

def get_individual_club_data(request):
    body_unicode = request.body # users code
    body_data = json.loads(body_unicode)

    orgId = body_data.get('org_id')
    print(orgId, 'org_id')
    club = Organization.objects.get(org_id = orgId)
    # Initialize empty lists
    types = []
    links = []

    # Check each social media attribute and append if not None
    if club.discord is not None:
        types.append('discord')
        links.append(club.discord)

    if club.instagram is not None:
        types.append('instagram')
        links.append(club.instagram)

    if club.youtube is not None:
        types.append('youtube')
        links.append(club.youtube)

    if club.linktr is not None:
        types.append('linktr')
        links.append(club.linktr)

    if club.linkedin is not None:
        types.append('linkedin')
        links.append(club.linkedin)

    if club.facebook is not None:
        types.append('facebook')
        links.append(club.facebook)

    if club.email is not None:
        types.append('email')
        links.append(club.email)

    if club.website is not None:
        types.append('website')
        links.append(club.website)
    
    tags = Tag.objects.filter(org_id=orgId).values()
    all_tags = []
    for tag in tags:
        all_tags.append(tag['tag_name'])
    print(all_tags)
    
    return JsonResponse({'org_name': club.org_name, 
                         'overview': club.overview, 
                         'star_rating': club.star_rating, 
                         'number_of_star_rating': club.number_of_star_rating, 
                         'ranking_num': club.ranking_num, 
                         'org_type': club.org_type, 
                         'types': types, 
                         'links': links,
                         'tags': all_tags})
