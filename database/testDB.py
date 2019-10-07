from flask import Flask
from flask_pymongo import PyMongo
import os

app = Flask(__name__)
MONGO_URL = os.environ.get('MONGODB_URI')
app.config["MONGO_URI"] = MONGO_URL
mongo = PyMongo(app)


def getTest():
    contents = list(mongo.db.users.find())
    returnList = []
    for content in contents:
        ele = {'name': content['name'], 'email': content['email']}
        returnList.append(ele)
    return returnList

def makeUsers():
    users = mongo.db.users
    for i in range (0, 10):
        post = {}
        post['name'] = 'User ' + str(i)
        post['email'] = 'User' + str(i) + '@tufts.edu'
        users.insert_one(post)

    return