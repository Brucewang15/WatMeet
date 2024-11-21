from django.db import models
from datetime import datetime
from django.utils import timezone

class Organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='organizations')
    overview = models.TextField()
    star_rating = models.FloatField()
    number_of_star_rating = models.IntegerField(default=0)
    ranking_num = models.IntegerField()
    ORG_TYPE_CHOICES = [
        ('club', 'Club'),
        ('intramural', 'Intramural'),
        ('design', 'Design'),
        ('society', 'Society'),
        ('sportclub', 'SportClub')
    ]
    org_type = models.CharField(max_length=20, choices=ORG_TYPE_CHOICES)
    constitution = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    instagram = models.TextField(blank=True, null=True)
    facebook = models.TextField(blank=True, null=True)
    linkedin = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    website = models.TextField(blank=True, null=True)
    youtube = models.TextField(blank=True, null=True)
    discord = models.TextField(blank=True, null=True)
    linktr = models.TextField(blank=True, null=True)



    def __str__(self):
        return self.org_name

class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    org = models.ForeignKey('organizations.Organization', on_delete=models.CASCADE, related_name='tags')
    tag_name = models.CharField(max_length=100)

    def __str__(self):
        return self.tag_name
