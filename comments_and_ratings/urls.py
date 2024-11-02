from django.urls import path
from . import views

urlpatterns = [
    path('get_comments/', views.get_comments),
    path('post_comment/', views.post_comment),
    path('rate_comment/', views.rate_comments),
]