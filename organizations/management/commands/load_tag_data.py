import json
from django.core.management.base import BaseCommand
from organizations.models import Organization
from users.models import User
from organizations.models import Tag

class Command(BaseCommand):
    help = 'Load data from a JSON file'

    def handle(self, *args, **kwargs):
        # Load data from the JSON file

        #Tag.objects.all().delete() 

        with open('./organizations/info/club_info_tags.json', 'r') as file:
            data = json.load(file)

        #random_user = User.objects.get(user_id=19)


        for item in data:
            # Create model instances
            print(item["name"])
            organization = Organization.objects.get(org_name=item["name"])
            for tag in item["tags"]:
                Tag.objects.create(
                    org = organization,
                    tag_name = tag
                )

            
        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))