
from django.contrib.auth.hashers import make_password
from users.models import User
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **kawrgs):
        users = User.objects.all()
        for user in users:
            print(user.password)
            password = user.password
            user.password = make_password(password)
            user.save()