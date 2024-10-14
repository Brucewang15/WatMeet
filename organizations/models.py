from django.db import models

class Organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='organizations')
    overview = models.TextField()
    star_rating = models.FloatField()
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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.org_name

class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    org = models.ForeignKey('organizations.Organization', on_delete=models.CASCADE, related_name='tags')
    tag_name = models.CharField(max_length=100)

    def __str__(self):
        return self.tag_name
