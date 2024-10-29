from django.shortcuts import render
from django.http import JsonResponse
import json

# Create your views here.



def sort_data(request):
    data = json.loads(request)
    print(data)
    return data


