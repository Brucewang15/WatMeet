from bs4 import BeautifulSoup
import requests
page_to_scrape = request.get("https://athletics.uwaterloo.ca/sports/2010/7/21/Instructional_Classes.aspx")
soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    