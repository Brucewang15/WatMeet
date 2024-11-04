from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from comments_and_ratings.models import Comment
from users.models import User
from organizations.models import Organization
import json
from comments_and_ratings.models import UserCommentRating
from django.utils import timezone
from django.shortcuts import get_object_or_404
# Create your views here.

# Get comments for a specific org_id
def get_comments(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    org_id = body_data.get('org_id')
    all_comments = Comment.objects.filter(org_id=org_id)
    comments_data = []
    comments_likes = [0, 0, 0, 0, 0]
    
    for comment in all_comments:
        user = User.objects.get(user_id = comment.user_id)
        user_name = user.first_name + " " + user.last_name
        org = Organization.objects.get(org_id = org_id)
        comments_likes[int(comment.star_rating)-1] += 1
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
            'comment_number_of_star_rating': org.number_of_star_rating,
        })
    return JsonResponse({'comments_data': comments_data, 'comments_likes': comments_likes}, safe=False)

# Post a comment
def post_comment(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)

    comment = body_data.get('comment')
    stars = body_data.get('stars')
    user_id = body_data.get('user_id')
    org_id = body_data.get('org_id')

    print(comment, stars, user_id, 'test', org_id)
    if Comment.objects.filter(user_id = user_id, org_id = org_id).exists():
        return JsonResponse({'success': False, 'reason': 'Already posted comment'})
    comment = Comment(comment_title='test', comment_body=comment, star_rating=stars, org_id=org_id, user_id=user_id)
    comment.save()
    org = Organization.objects.get(org_id = org_id)
    org.number_of_star_rating += 1
    org.star_rating = round((org.star_rating * (org.number_of_star_rating - 1) + stars) / org.number_of_star_rating, 1)
    org.save()
    return JsonResponse({'success': True})

# rate a comment
def rate_comment(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    comment_id = body_data.get('comment_id')
    user_id = body_data.get('user_id')
    upvote = body_data.get('upvote')
    downvote = body_data.get('downvote')
    print(comment_id, user_id, upvote, downvote)
    comment = Comment.objects.get(comment_id=comment_id)
    # comment = get_object_or_404(Comment, comment_id=comment_id)
    
    if upvote:
        comment.upvote_num += 1
    elif downvote:
        comment.downvote_num += 1

    comment.save()

    UserCommentRating.objects.update_or_create(
        user_id=user_id,
        comment_id=comment_id,
        defaults={
            'upvote': upvote,
            'downvote': downvote,
            'created_at': timezone.now()  # Sets the time when the user rated the comment
        }
    )
    return JsonResponse({'success': True})
