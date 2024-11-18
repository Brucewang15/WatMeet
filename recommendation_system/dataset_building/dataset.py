import numpy as np
import random
from collections import deque
import pickle
import os 

tags = {
    "Academic": 1,
    "Advocacy": 2,
    "Arts": 3,
    "Automotive": 4,
    "Business": 5,
    "Charity": 6,
    "Community Service": 7,
    "Competitions": 8,
    "Construction": 9,
    "Culture": 10,
    "Dance": 11,
    "Debate": 12,
    "Engineering": 13,
    "Entrepreneurship": 14,
    "Environmental": 15,
    "Finance": 16,
    "Food": 17,
    "Gaming": 18,
    "Health": 19,
    "Innovation": 20,
    "International": 21,
    "Language": 22,
    "Leadership": 23,
    "LGBTQ+": 24,
    "Literature": 25,
    "Media": 26,
    "Mental Health": 27,
    "Music": 28,
    "Networking": 29,
    "Politics": 30,
    "Professional Development": 31,
    "Recreation": 32,
    "Religious": 33,
    "Robotics": 34,
    "Science": 35,
    "Social": 36,
    "Sports": 37,
    "Sustainability": 38,
    "Technology": 39,
    "Volunteering": 40,
    "Wellness": 41,
    "Women's Empowerment": 42,
    "Performing Arts": 43,
    "Film": 44,
    "Photography": 45,
    "Law": 46,
    "Mentorship": 47,
    "Fundraising": 48,
    "Comedy": 49,
    "Artificial Intelligence": 50
}

# Initialize replay buffer
replay_buffer = deque(maxlen=50)

def store_experience(state, action, reward, next_state, done):
    replay_buffer.append((state, action, reward, next_state, done))

# Create a mock environment to generate experiences
def generate_experience():
    state = np.random.randint(0, 10, size=50)  # Initial state: random saves for each tag
    action = np.random.randint(0, 2, size=50)  # Random action: recommend or not for each tag
    next_state = state.copy()
    
    # Modify next state based on action
    next_state[action == 1] += 1  # Increase saves for recommended tags
    
    tags_list = np.array(list(tags.keys()))
    print(state)
    print(next_state)
    # Reward: sum of saves for recommended tags
    # print("Initial State: " + str(tags_list[state >= 1]))
    # print("Action: " + str(tags_list[action == 1]))
    # print("Next State: " + str(tags_list[next_state >= 1]))
    reward = input("Enter the reward: ") # Would be calculated based on user interaction (clicks, saves, etc.)
    
    done = True
    
    return state, action, reward, next_state, done

# Generate a batch of experiences
for _ in range(50):  # For 50 episodes
    state, action, reward, next_state, done = generate_experience()
    store_experience(state, action, reward, next_state, done)

# Example of how to access a stored experience
sample_experience = replay_buffer[0]  # Get the first experience
print(sample_experience)

os.chdir('../datasets')

with open('replay_buffer.pkl', 'wb') as f:  # open a text file
    pickle.dump(replay_buffer, f) # serialize the list
