from django.shortcuts import render
import json
from django.http import HttpResponse
from django.http import JsonResponse
from users.models import User
from users.models import Bookmark
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

# Custom JWT token
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# return the varification page after the "create account" button is pressed
def verify(request):
    variCode = CreateNumber()

    body_unicode = request.body
    body_data = json.loads(body_unicode)

    
    first_name = body_data.get('firstName')
    last_name = body_data.get('lastName')
    email = body_data.get('email')
    password = body_data.get('password')
    username=email
    
    user = User.objects.filter(email=email)
    if not user.exists():
        s = User(first_name = first_name, last_name = last_name, username=username, email = email, password = password, verification_code = variCode)
        s.save()
    elif User.objects.get(email=email).is_active:
        print('Email already exists')
        return JsonResponse({'success': False, 'reason': 'email_taken'})
    elif not User.objects.get(email=email).is_active:
        print('Verify your email')
        user.verification_code = variCode
        user.save()
    
    sendEmail(email, variCode)
    request.session['email'] = email
    print(request.session['email'], 'email')

    return JsonResponse({'success': True})
    #return render(request, '../templates/1_signup_page.html')

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
    body_unicode = request.body # users code
    body_data = json.loads(body_unicode)

    user = User.objects.get(email=body_data.get('email'))
    
    actualCode = user.verification_code
    enteredCode = body_data.get('veriCode')
    if enteredCode == actualCode:
        print('good code')
        user.is_active = True
        user.save()
        return JsonResponse({'success': True})
    else:
        print('bad code')
        return JsonResponse({'success': False})

def login(request):
    body_unicode = request.body # users code
    body_data = json.loads(body_unicode)

    email = body_data.get('email')
    password = body_data.get('password')
    find_user = User.objects.filter(email=email)
    if not find_user.exists():
        return JsonResponse({'success': False, 'reason': 'Email or password Incorrect'})
    user = User.objects.get(email=email)
    if not user.is_active:
        variCode = CreateNumber()
        user.verification_code = variCode
        user.save()
        sendEmail(email, variCode)
        return JsonResponse({'success': False, 'reason': 'Verify email'})
    if user.password != password:
        return JsonResponse({'success': False, 'reason': 'Email or password Incorrect'})
    return JsonResponse({'success': True})

# resends verification code in forgot password
def forgotPassword(request):
    body_unicode = request.body # users code
    body_data = json.loads(body_unicode)
    email = body_data.get('email')
    user = User.objects.filter(email=email)
    if not user.exists():
        return JsonResponse({'success': False})
    return JsonResponse({'success': True})

def get_user(request):
    try:
        body_unicode = request.body.decode('utf-8') # users code
        body_data = json.loads(body_unicode)
        user_id = body_data.get('user_id')
        user = User.objects.get(user_id=user_id)
        
        return JsonResponse({'first_name': user.first_name, 
                            'last_name': user.last_name,
                            'email': user.email}, safe=False)  
    except User.DoesNotExist:
        return JsonResponse({'success': False})

# Get bookmark information for a given club
def get_bookmark_state(request):
    try:
        body_unicode = request.body.decode('utf-8') # users code
        body_data = json.loads(body_unicode)
        print('yea2')

        userId = body_data.get('user_id')
        orgId = body_data.get('org_id')
        print(userId, orgId, 'k')
        user = Bookmark.objects.filter(user_id = userId, org_id = orgId)
        print(user)
        if user.exists():
            return JsonResponse({'success': True, 'bookmarked': True})
        else:
            return JsonResponse({'success': True, 'bookmarked': False})
    except User.DoesNotExist:
        return JsonResponse({'success': False})
    
# change bookmark state
def change_bookmark(request):
    body_data = json.loads(request.body.decode('utf-8'))

    bookmarkState = body_data.get('bookmarkState')
    orgId = body_data.get('org_id')
    userId = body_data.get('user_id')

    if (bookmarkState):
        bookmark = Bookmark.objects.create(org_id = orgId, user_id = userId)
        bookmark.save()
    else:
        bookmark = Bookmark.objects.get(org_id = orgId, user_id = userId)
        bookmark.delete()
    return JsonResponse({'success': True})