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
    minStarRating = json.loads(request.body).get("minStarRating")

    data = sort_data(data, search_propt)

    #filter out everything below minRating
    
    data = list(filter(lambda elem: Organization.objects.get(org_name=elem["org_name"]).star_rating >= float(minStarRating), data))
    return JsonResponse(data, safe=False)

def get_individual_club_data(request):
    body_unicode = request.body # users code
    body_data = json.loads(body_unicode)

    org_id = body_data.get('org_id')
    club = Organization.objects.get(org_id = org_id)

    return JsonResponse({'org_name': club.org_name, 'overview': club.overview, 'star_rating': club.star_rating, 'number_of_star_rating': club.number_of_star_rating, 'ranking_num': club.ranking_num, 'org_type': club.org_type})
