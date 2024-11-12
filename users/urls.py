from django.urls import path
from . import views

urlpatterns = [
    path('confirmationEmail/', views.verify),
    path('get-csrf-token/', views.getCSRF),
    path('verify-email/', views.verify_email),
    path('login/', views.login),
    path('forgotPassword/', views.forgotPassword),
    path('get_user/', views.get_user),
    path('get_bookmark_state/', views.get_bookmark_state),
    path('change_bookmark/', views.change_bookmark),
]