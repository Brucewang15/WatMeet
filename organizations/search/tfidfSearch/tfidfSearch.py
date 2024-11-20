import math


def generate(query, data):
    qLength = len(query)
    dLength = len(data)
    tf = [[0 for i in range(qLength)] for j in range(dLength)]
    idf = [0 for i in range(qLength)]

    for i in range(dLength): # loops through the every club
        overview = data[i]["org_name"] + " " + data[i]["overview"]
        overview = overview.split(" ")
        appear = [False for i in range(qLength)]
        for word in range(len(overview)): # loops through everyword in the club
            for j in range(qLength): #loops through the query
                if query[j].lower() == overview[word].lower():
                    tf[i][j] += 1
                    appear[j] = True

        for j in range(qLength):
            if appear[j]:
                idf[j] += 1
    
    return tf, idf





def tfidfSearch(query, data):
    query = query.split(" ")

    tf, idf = generate(query, data)
    numDocs = len(data)

    tfidfScore = [0 for i in range(len(data))]

    for i in range(numDocs):
        for j in range(len(query)):
            tfidfScore[i] += tf[i][j] * math.log(numDocs/idf[j], 2) 
    
    #result = list(map(lambda i, x: (tfidfScore[i], x), enumerate(data)))
    result = [(tfidfScore[i], x) for i,x in enumerate(data)]

    #print(result)
    result = list(filter(lambda x: x[0] != 0, result))
    result.sort(key=lambda x: x[0], reverse=True)

    if len(result) > 10:
        result = result[:10]

    for r in result:
        print(r[1]["org_name"])


    return list(map(lambda x: x[1], result))