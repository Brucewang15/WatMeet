from bs4 import BeautifulSoup
import requests
import csv

#def get_instructional_classes_links(url):
    #page_to_scrape=requests.get(url)
    #soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    #instructional_classes = soup.findAll("span", attrs={"class":"flex-item-1"})

    #return get_instructional_classes_links

url = "https://athletics.uwaterloo.ca/sports/2010/7/21/Instructional_Classes.aspx"
page_to_scrape = requests.get(url)
soup = BeautifulSoup(page_to_scrape.text, "html.parser")
program_names = soup.findAll("span", attrs={"class":"flex-item-1"})
class_names = soup.find_all("h4", attrs={})

file = open("intramurals.csv", "w")
writer = csv.writer(file)

writer.writerow(["PROGRAMS", "CLASSES"])

for programs, classes in zip(program_names, class_names):
    print(programs.text + " " + classes.text)
    writer.writerow([programs.text, classes.text])

file.close()
