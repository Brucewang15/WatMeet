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
    user_id = body_data.get('user_id')
    
    if org_id is None:
        all_comments = Comment.objects.all()
    else:
        all_comments = Comment.objects.filter(org_id=org_id).exclude(comment_body="")

    comments_data = []
    comments_likes = [0, 0, 0, 0, 0]
    comments_individual_likes = []
    
    for comment in all_comments:
        user = User.objects.get(user_id = comment.user_id)
        user_name = user.first_name + " " + user.last_name
        org = Organization.objects.get(org_id = comment.org_id)
        comments_likes[int(comment.star_rating)-1] += 1
        
        comment_individual_like = UserCommentRating.objects.filter(org_id=org_id, comment_id=comment.comment_id, user_id=user_id).values()
        print(comment_individual_like, user_id, org_id, comment.comment_id, 'comment_individual_like')
        
        if comment_individual_like.exists():
            print(comment_individual_like, 'comment_individual_like')
            result = "upvoted" if comment_individual_like[0]['upvote'] else "downvoted" if comment_individual_like[0]['downvote'] else ""
            print(result, 'result')
            comments_individual_likes.append(result)

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
            'comment_org_id': comment.org_id,
            'comment_org_name': org.org_name
        })
    return JsonResponse({'comments_data': comments_data, 'comments_likes': comments_likes, 'comments_individual_likes': comments_individual_likes}, safe=False)

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
    comment = Comment(comment_body=comment, star_rating=stars, org_id=org_id, user_id=user_id)
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
    org_id = body_data.get('org_id')

    # Fetch the comment object
    comment = Comment.objects.get(comment_id=comment_id)
    # Fetch the existing user rating for the comment, if it exists
    user_rating = UserCommentRating.objects.filter(user_id=user_id, comment_id=comment_id).first()

    if user_rating:
        # User has already rated the comment - check if they are changing their vote
        if upvote and not user_rating.upvote:
            # User changes from downvote to upvote
            comment.upvote_num += 1
            comment.downvote_num -= 1
            user_rating.upvote = True
            user_rating.downvote = False
        elif downvote and not user_rating.downvote:
            # User changes from upvote to downvote
            comment.downvote_num += 1
            comment.upvote_num -= 1
            user_rating.upvote = False
            user_rating.downvote = True
        else:
            # If the user is trying to vote the same way again, return an error
            return JsonResponse({'success': False, 'message': 'You have already rated this comment.'})
        
        # Save changes to comment and user rating
        comment.save()
        user_rating.save()
    else:
        # If no previous rating exists, create a new one
        if upvote:
            comment.upvote_num += 1
        elif downvote:
            comment.downvote_num += 1
        
        comment.save()
        
        UserCommentRating.objects.create(
            user_id=user_id,
            comment_id=comment_id,
            upvote=upvote,
            downvote=downvote,
            created_at=timezone.now(),  # Set the time when the user rated the comment
            org_id=org_id,
        )
    
    return JsonResponse({'success': True})

# Get a user's ratings for comments
def get_user_ratings(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    user_id = body_data.get('user_id')
    org_id = body_data.get('org_id')
    
    # Fetch all ratings by this user
    user_ratings = UserCommentRating.objects.filter(user_id=user_id, org_id=org_id).values()
    ratings_data = []

    for rating in user_ratings:
        ratings_data.append({
            'comment_id': rating['comment_id'],  # Assuming comment_id is a foreign key
            'upvote': rating['upvote'],
            'downvote': rating['downvote'],
            'rated_at': rating['created_at']
        })
    
    return JsonResponse({'user_ratings': ratings_data}, safe=False)
