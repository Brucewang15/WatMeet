from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from organizations.models import Organization

# Create your views here.
def get_club_data(request):
    data = Organization.objects.all().values()
    return JsonResponse(list(data), safe=False)
