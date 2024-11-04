def get_match_score(club_name, query):
    club_name = club_name.lower()
    query = query.lower()
    matches = 0

    cn_trigram = {}
    length = 0

    # inserting trigrams to the dictionary
    for i in range(len(club_name)):
        if (len (club_name) - i <= 2):
            break
        trigram = club_name[i: i+3]
        if (trigram in cn_trigram):
            cn_trigram[trigram] += 1
        else:
            cn_trigram[trigram] = 1
    
    #loop through query and see the matches
    for i in range(len(query)):
        if (len(query) - i <= 2):
            break
        trigram = query[i: i+3]
        length += 1
        if (trigram in cn_trigram):
            matches += cn_trigram[trigram]
    if (length == 0):
        return 0
    return matches/length # how many in the quiery matches the title of the club name


