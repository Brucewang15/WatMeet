import json
from django.core.management.base import BaseCommand
from organizations.models import Organization
from users.models import User




def get_value (dict, index):
    try:
        return dict[index]
    except:
        return None


class Command(BaseCommand):
    help = 'Load data from a JSON file'

    def handle(self, *args, **kwargs):
        # Load data from the JSON file

        #Tag.objects.all().delete() 

        with open('./organizations/info/design_team_data.json', 'r') as file:
            data = json.load(file)

        #random_user = User.objects.get(user_id=19)


        for item in data:
            # Create model instances
            name = item["name"]
            print(name)
            org = Organization.objects.get(org_name=name)
            try:
                links = item["links"]
                org.instagram = get_value(links, "instagram")
                org.facebook = get_value(links, "facebook")
                org.linkedin = get_value(links, "linkedin")
                org.email = get_value(links, "email")
                org.website = get_value(links, "website")
                org.youtube = get_value(links, "youtube")
                org.discord = get_value(links, "discord")
                org.linktr = get_value(links, "linktr")
                org.save()
            except:
                org.save()
                continue

        # Clubs
        with open('./organizations/info/club_info_finalized.json', 'r') as file:
            club_data = json.load(file)
    
        for item in club_data:
            name=item["names"]
            print(name)
            org = Organization.objects.get(org_name=name)
            try:
                links = item["links"]
                org.instagram = get_value(links, "instagram")
                org.facebook = get_value(links, "facebook")
                org.linkedin = get_value(links, "linkedin")
                org.email = get_value(links, "email")
                org.website = get_value(links, "website")
                org.youtube = get_value(links, "youtube")
                org.discord = get_value(links, "discord")
                org.linktr = get_value(links, "linktr")
                org.save()
            except:
                org.save()
                continue
                
            
            
        self.stdout.write(self.style.SUCCESS('Data reloaded successfully'))