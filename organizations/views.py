from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from organizations.models import Organization

from .search.sort_data import sort_data
import json

# Create your views here.

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
    minRating = json.loads(request.body).get("minRating")

    data = sort_data(data, search_propt)

    #filter out everything below minRating
    
    data = list(filter(lambda elem: Organization.objects.get(org_name=elem["org_name"]).star_rating >= float(minRating), data))
    return JsonResponse(data, safe=False)

def get_individual_club_data(request):
    body_unicode = request.body # users code
    body_data = json.loads(body_unicode)

    org_id = body_data.get('org_id')
    club = Organization.objects.get(org_id = org_id)
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
    
    return JsonResponse({'org_name': club.org_name, 'overview': club.overview, 'star_rating': club.star_rating, 'number_of_star_rating': club.number_of_star_rating, 'ranking_num': club.ranking_num, 'org_type': club.org_type, 'types': types, 'links': links})
