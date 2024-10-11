from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key=True) 
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    password_name = models.CharField(max_length=100) 
    email = models.EmailField(max_length=100, unique=True)  
    verification_code = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organizations') 
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


class UserOrg(models.Model):
    userorg_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_orgs')
    org = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='user_orgs') 

    def __str__(self):
        return f"{self.user} - {self.org}"


class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    comment_title = models.CharField(max_length=100, blank=True, null=True) 
    comment_body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments') 
    org = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='comments')  
    star_rating = models.IntegerField()
    upvote_num = models.IntegerField(default=0)  
    downvote_num = models.IntegerField(default=0)  
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.comment_title if self.comment_title else "No Title"


class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)  
    org = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='tags') 
    tag_name = models.CharField(max_length=100)

    def __str__(self):
        return self.tag_name
