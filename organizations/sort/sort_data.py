import json


# this gives every organization a number corresponding what the user wishes to search
def get_sort_num(org):
    return org['star_rating']


def sort_data(data, search):
    data = list(data)
    
    data_with_num = list(map(lambda org: (get_sort_num(org), org), data))
    data_with_num.sort(reverse=True, key=lambda s: s[0])

    sorted_data = list(map(lambda element: element[1], data_with_num))

    return sorted_data