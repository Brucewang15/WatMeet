import numpy as np
import random
from collections import deque
import pickle
import os 
import json

os.chdir(r'C:\Users\jonat\Documents\Code\WatMeet\organizations\info')

with open('club_info_tags.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

print(data)