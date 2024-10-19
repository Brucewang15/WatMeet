from surprise import Dataset, Reader, SVD
import pandas as pd

from organizations.models import Organization
from comments_and_ratings.models import Comment


def get_user_org_ratings() -> pd.DataFrame:
    comments = Comment.objects.all()
    data = {
        "user_id": [comment.user_id for comment in comments],
        "org_id": [comment.org_id for comment in comments],
        "rating": [comment.star_rating for comment in comments],
    }
    return pd.DataFrame(data)


def get_all_org_ids() -> list[int]:
    return map(lambda org: org.org_id, Organization.objects.all())


def collaborative_filtering(user_id):
    ratings_df = get_user_org_ratings()

    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(ratings_df, reader)

    algo = SVD()
    algo.fit(data.build_full_trainset)

    org_ids = get_all_org_ids()

    predictions = {}
    for org_id in org_ids:
        predictions[org_id] = algo.predict(user_id, org_id).est

    return sorted(predictions.items(), key=lambda x: x[1], reverse=True)
