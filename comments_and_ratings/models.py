from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime
from django.utils import timezone

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    comment_title = models.CharField(max_length=100, blank=True, null=False, default="No Title")
    comment_body = models.TextField(null=False, default="No Comment")
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='comments')
    org = models.ForeignKey('organizations.Organization', on_delete=models.CASCADE, related_name='comments')
    star_rating = models.IntegerField()
    upvote_num = models.IntegerField(default=0)
    downvote_num = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment_title if self.comment_title else "No Title"

class UserCommentRating(models.Model):
    usercomment_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='user_comments_rating')
    comment = models.ForeignKey('Comment', on_delete=models.CASCADE, related_name='user_comments_rating')
    upvote = models.BooleanField(default=False)
    downvote = models.BooleanField(default=False)
    created_at = models.DateTimeField(
        default=timezone.make_aware(datetime(2001, 9, 11, 8, 46))
    )

    def __str__(self):
        return f"{self.user} - {self.comment}"