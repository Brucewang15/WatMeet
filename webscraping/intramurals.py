from bs4 import BeautifulSoup
import requests

page_to_scrape = requests.get("https://athletics.uwaterloo.ca/sports/2010/7/21/Instructional_Classes.aspx")
soup = BeautifulSoup(page_to_scrape.text, "html.parser")
program_names = soup.findAll("span", attrs={"class":"flex-item-1"})
class_names = soup.find_all("h4", class_= '')

for programs, classes in zip(program_names, class_names):
    print(programs.text + " " + classes.text)
