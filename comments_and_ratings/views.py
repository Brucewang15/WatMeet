from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from comments_and_ratings.models import Comment
from users.models import User
import json
# Create your views here.
def get_comments(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    org_id = body_data.get('org_id')
    all_comments = Comment.objects.filter(org_id=org_id)
    comments_data = []
    for comment in all_comments:
        user = User.objects.get(user_id = comment.user_id)
        user_name = user.first_name + " " + user.last_name
        comments_data.append({
            'comment_id': comment.comment_id,
            'comment_title': comment.comment_title,
            'comment_body': comment.comment_body,
            'comment_user_id': comment.user_id,
            'comment_star_rating': comment.star_rating,
            'comment_created_at': comment.created_at,
            'comment_user_name': user_name,
            'comment_upvote': comment.upvote_num,
            'comment_downvote': comment.downvote_num,
        })
    return JsonResponse(comments_data, safe=False)

def post_comment(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)

    comment = body_data.get('comment')
    stars = body_data.get('stars')
    user_id = body_data.get('user_id')
    org_id = body_data.get('org_id')
    print(comment, stars, user_id, 'test', org_id)
    if Comment.objects.filter(user_id = user_id).exists():
        return JsonResponse({'success': False, 'reason': 'Already posted comment'})
    comment = Comment(comment_title='test', comment_body=comment, star_rating=stars, org_id=org_id, user_id=user_id)
    comment.save()
    return JsonResponse({'success': True})