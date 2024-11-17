INF = 100000

def check_prefix(target, value):
    for i in range(len(value)):
        if (i >= len(target)):
            return False
        if (value[i].lower() != target[i].lower()):
            return False
    return True
        


def map_func(element, query):
    name_list = element["org_name"].split()
    query_list = query.split()

    # then assign values to each element
    match_amount = 0
    for q in query_list:
        for i in range(len(name_list)):
            if (check_prefix(name_list[i], q)):
                match_amount += 1
    
    return (match_amount, element)
    


def sort_data_prefix(data, query): # data is querySet of dictionaries
    data = list(data)
    
    # set of (index of the first match with query, data)
    data = list(map(lambda element: map_func(element, query), data))
    data = list(filter(lambda x: x[0] != 0, data))
    data.sort(key=lambda x: x[0], reverse=True)

    data = list(filter(lambda x: x[0] == len(query.split()), data))

    result_data = list(map(lambda x: x[1], data))
    result_data.sort(key=lambda element: element["number_of_star_rating"])

    return result_data
    


    