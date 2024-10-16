from django.shortcuts import render
from django.http import HttpResponse
from users.models import User
from .scripts.confirmationEmail.CreateNumber import CreateNumber
from .scripts.confirmationEmail.sendEmail import sendEmail

# Create your views here.

def index(request):
    if request.method == "POST":
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password_name = request.POST.get('password_name')
        verification_code = request.POST.get('verification_code')

        s = User(first_name = first_name, last_name = last_name, 
                email = email, password_name = password_name, verification_code = verification_code)
        s.save()
    return render(request, '/templates/2_signup_page.html')



# return the varification page after the "create account" button is pressed
def verify(request):
    variCode = CreateNumber()

    sendEmail("b225wang@uwaterloo.ca", variCode)
    return render(request, '../templates/1_signup_page.html')

#def add(request):
    


