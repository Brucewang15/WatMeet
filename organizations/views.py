from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from organizations.models import Organization
import json

# Create your views here.
def get_club_data(request):
    data = Organization.objects.all().values()
    return JsonResponse(list(data), safe=False)

def get_individual_club_data(request):
    body_unicode = request.body # users code
    body_data = json.loads(body_unicode)

    org_id = body_data.get('org_id')
    club = Organization.objects.get(org_id = org_id)

    return JsonResponse({'org_name': club.org_name, 'overview': club.overview, 'star_rating': club.star_rating, 'ranking_num': club.ranking_num, 'org_type': club.org_type})
