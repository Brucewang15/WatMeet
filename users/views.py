from django.shortcuts import render
import json
from django.http import HttpResponse
from django.http import JsonResponse
from users.models import User
from .scripts.confirmationEmail.CreateNumber import CreateNumber
from .scripts.confirmationEmail.sendEmail import sendEmail
from django.middleware.csrf import get_token
import urllib.parse


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

    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    username = body_data.get('username')
    first_name = 'hi'
    last_name = 'hi'
    email = body_data.get('email')
    password = body_data.get('password')

    sendEmail(email, variCode)
    s = User(first_name = first_name, last_name = last_name, username = username, email = email, password = password, verification_code = variCode)
    s.save()
    return render(request, '../templates/1_signup_page.html')

#def add(request):
    
def getCSRF(request):
    
    token = get_token(request)
    print(token)
    response = JsonResponse({'token': token})
    response.set_cookie('csrftoken', token, 
                        path='/',
                        samesite='Strict')
    return response

def verify_email(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    decoded_email = urllib.parse.unquote(body_data.get('email'))

    user = User.objects.get(email=decoded_email)
    actualCode = user.verification_code
    enteredCode = body_data.get('veriCode')
    if enteredCode == actualCode:
        print('good code')
        return JsonResponse({'success': True})
    else:
        print('bad code')
        return JsonResponse({'success': False})


