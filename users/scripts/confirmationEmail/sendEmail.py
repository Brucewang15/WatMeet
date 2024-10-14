import smtplib
import ssl

from email.message import EmailMessage
from passwords import qanyi_password


# app name: Python

eSender = "qanyi27@gmail.com"
ePassword = qanyi_password

eReceiver = "pdsalex2018@gmail.com"

subject = "test"
body = "test"

em = EmailMessage()

em['From'] = eSender
em['To'] = eReceiver
em['Subject'] = subject
em.set_content(body)

context = ssl.create_default_context()

with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
    smtp.login(eSender, ePassword)
    smtp.sendmail(eSender, eReceiver, em.as_string())


