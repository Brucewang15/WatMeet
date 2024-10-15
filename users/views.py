from django.shortcuts import render
from django.http import HttpResponse

from .scripts.confirmationEmail.sendEmail import sendEmail
from .scripts.confirmationEmail.CreateNumber import CreateNumber

# Create your views here.




# return the varification page after the "create account" button is pressed
def varify(request):
    variCode = CreateNumber()

    sendEmail("qanyi27@gmail.com", variCode)
    return HttpResponse("email sent")




