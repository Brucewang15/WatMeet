from django.shortcuts import render
from django.http import HttpResponse

from .scripts.confirmationEmail.sendEmail import sendEmail

# Create your views here.

def send_email(request):
    sendEmail("bruce.wang15@outlook.com", "hi")
    return HttpResponse('email sent')