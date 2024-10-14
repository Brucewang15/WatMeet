from django.db import models

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    comment_title = models.CharField(max_length=100, blank=True, null=True)
    comment_body = models.TextField()
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='comments')
    org = models.ForeignKey('organizations.Organization', on_delete=models.CASCADE, related_name='comments')
    star_rating = models.IntegerField()
    upvote_num = models.IntegerField(default=0)
    downvote_num = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment_title if self.comment_title else "No Title"
