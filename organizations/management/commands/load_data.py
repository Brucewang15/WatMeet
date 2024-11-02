import json
from django.core.management.base import BaseCommand
from organizations.models import Organization
from users.models import User


# python manage.py load_data


#load the data for clubs
"""
class Command(BaseCommand):
    help = 'Load data from a JSON file'

    def handle(self, *args, **kwargs):
        # Load data from the JSON file
        with open('./organizations/info/club_info.json', 'r') as file:
            data = json.load(file)

        random_user = User.objects.create(
            first_name = "king",
            last_name = "bruh",
            username= "korok",
            password = "12345678",
            email = "qanyi27@gmail.com",
            verification_code = "abcdefg"
        )

        for item in data:
            # Create model instances
            print(item["names"])
            Organization.objects.create(
                org_name = item["names"],
                overview = item['overviews'],
                user = random_user,
                star_rating = 3.5,
                ranking_num = 3,
                org_type = 'club',
                constitution = "bruh",
                user_id=19
            )
        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))
"""

# design teams 

class Command(BaseCommand):
    help = 'Load data from a JSON file'

    def handle(self, *args, **kwargs):
        # Load data from the JSON file
        with open('./organizations/info/design_team_data.json', 'r') as file:
            data = json.load(file)

        random_user = User.objects.get(user_id=19)

        for item in data:
            # Create model instances
            print(item["name"])
            Organization.objects.create(
                org_name = item["name"],
                overview = item['description'],
                user = random_user,
                star_rating = 0,
                ranking_num = 3,
                org_type = 'design',
                constitution = "bruh",
                user_id=19
            )
        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))