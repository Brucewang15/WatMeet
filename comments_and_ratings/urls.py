from django.urls import path
from . import views

urlpatterns = [
    path('get_comments/', views.get_comments),
]