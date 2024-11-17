import numpy as np
import random
from collections import deque
import pickle
import os 

# Initialize replay buffer
replay_buffer = deque(maxlen=50)

def store_experience(state, action, reward, next_state, done):
    replay_buffer.append((state, action, reward, next_state, done))

# Create a mock environment to generate experiences
def generate_experience():
    state = np.random.rand(50)  # Initial state: random saves for each tag
    action = np.random.randint(0, 2, size=50)  # Random action: recommend or not for each tag
    next_state = state.copy()
    
    # Modify next state based on action
    next_state[action == 1] += np.random.rand(np.sum(action == 1))  # Increase saves for recommended tags
    next_state[action == 0] -= 0.01  # Slightly decrease saves for non-recommended tags
    
    # Reward: sum of saves for recommended tags
    reward = np.sum(state[action == 1])
    
    # Randomly determine if episode ends
    done = np.random.rand() > 0.95  # Episode ends with 5% chance
    
    return state, action, reward, next_state, done

# Generate a batch of experiences
for _ in range(1000):  # For 1000 episodes
    state, action, reward, next_state, done = generate_experience()
    store_experience(state, action, reward, next_state, done)

# Example of how to access a stored experience
sample_experience = replay_buffer[0]  # Get the first experience
print(sample_experience)

os.chdir('../datasets')

with open('replay_buffer.pkl', 'wb') as f:  # open a text file
    pickle.dump(replay_buffer, f) # serialize the list
