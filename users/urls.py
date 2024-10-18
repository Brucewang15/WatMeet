from django.urls import path
from . import views

urlpatterns = [
    path('confirmationEmail/', views.verify),
    path('get-csrf-token/', views.getCSRF),
    path('verify-email/', views.verify_email),
    path('login/', views.login),
]