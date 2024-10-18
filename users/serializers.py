from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User  # Import your User model

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        print(username, password)

        # Fetch the user by username
        try:
            user = User.objects.get(username=username)
            print(user.is_active)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this username does not exist")

        # Check if the user is active
        if not user.is_active:
            raise serializers.ValidationError("This account is inactive. Please contact support.")
        print('active user')
        # Authenticate the user with the password
        if user.password != password:
            raise serializers.ValidationError("Invalid username or password")
        print('password works')
        # If everything is valid, proceed with generating the token
        print(attrs)
        refresh = RefreshToken()
        refresh['user_id'] = user.user_id  # Use your custom user_id field

        access_token = refresh.access_token
        access_token['user_id'] = user.user_id

        # Return both refresh and access tokens
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
