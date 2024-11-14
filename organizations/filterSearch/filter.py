from organizations.models import Tag
from organizations.models import Organization


def check_in_db(element, tagList): #element is the id of the org
    orgs_with_tag = Tag.objects.filter(org=element) # gets all elements with the tag

    orgTags = set()
    for org in orgs_with_tag:
        orgTags.add(org.tag_name)

    for tag in tagList:
        if (not (tag in orgTags)):
            return False
    return True


def filterData(data, tagStates): #data is list of dictionaries, tagStates is an array of bools
    tags = [
        "Culture", "Recreation", "International", "Technology", "Academic", "Arts", "Community Service", "Gaming",
        "Health", "Religious", "Performing Arts", "Music", "Science", "Charity", "Volunteering", "Fundraising",
        "Support Group", "Language", "Wellness", "Literature", "Public Speaking", "Law", "Mentorship", "Innovation",
        "Leadership", "Finance", "Sports", "Debate", "Engineering", "Investment", "LGBTQ+", "Film", "Diversity",
        "Education", "Photography", "Comedy", "Entrepreneurship", "Social", "Professional Development", "Networking",
        "Advocacy"
    ]
    tagList = []
    modified = False
    
    for i in range(len(tagStates)):
        if (tagStates[i]):
            modified = True
            tagList.append(tags[i])


    if (not modified):
        return data
    return list(filter(lambda element: check_in_db(element["org_id"], tagList), data))