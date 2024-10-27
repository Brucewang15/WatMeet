from django.urls import path
from . import views

urlpatterns = [
    path('get_club_data/', views.get_club_data),
    path('get_individual_club_data', views.get_individual_club_data),
]