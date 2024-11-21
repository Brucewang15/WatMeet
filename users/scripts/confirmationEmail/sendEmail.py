import smtplib
import ssl

from email.message import EmailMessage
from .passwords import qanyi_password



# app name: Python


def sendEmail(reciever, code):
    eSender = "qanyi27@gmail.com"
    ePassword = qanyi_password

    eReceiver = reciever

    subject = "WatClub Verification Code"
    body = "Your verification code: " + str(code)

    em = EmailMessage()

    em['From'] = eSender
    em['To'] = eReceiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(eSender, ePassword)
        smtp.sendmail(eSender, eReceiver, em.as_string())


