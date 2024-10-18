from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from comments_and_ratings.models import Comment
# Create your views here.
def get_comments(request):
    all_comments = Comment.objects.all()
    comments_data = []
    for comment in all_comments:
        comments_data.append({
            'comment_id': comment.comment_id,
            'comment_title': comment.comment_title,
            'comment_body': comment.comment_body,
        })
    return JsonResponse(comments_data, safe=False)