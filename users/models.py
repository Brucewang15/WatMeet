from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username=models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    imageurl = models.CharField(max_length=100, null=True)
    email = models.EmailField(max_length=100, unique=True)
    verification_code = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class UserOrg(models.Model):
    userorg_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='user_orgs')
    org = models.ForeignKey('organizations.Organization', on_delete=models.CASCADE, related_name='user_orgs')

    def __str__(self):
        return f"{self.user} - {self.org}"

