import json
from .title_match_score import get_match_score


# this gives every organization a number corresponding what the user wishes to search



def sort_data(data, search_propt):
    data = list(data)
    
    # enter 3 or more things in the search engine for it to work
    if (len(search_propt) >= 3):
        data_with_num = list(map(lambda org: (get_match_score(org["org_name"], search_propt), org), data))
    else:
        data_with_num = list(map(lambda org: (org["star_rating"], org), data))

   
    data_with_num.sort(reverse=True, key=lambda s: s[0])

    if (search_propt == ""):
        return list(map(lambda element: element[1], data_with_num))
    
    sorted_data = list(filter(lambda elem: elem[0] > 0.2, data_with_num))
    result = list(map(lambda elem: elem[1], sorted_data))

    return result