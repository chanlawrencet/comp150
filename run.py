from flask import Flask, flash, request, redirect, send_file, url_for
from flask_restful import Resource, Api
from flask_cors import CORS
import os
import io
from flask_pymongo import PyMongo
from database import testDB
import gridfs
import werkzeug
import codecs
import json



UPLOAD_FOLDER = './'
app = Flask(__name__)
api = Api(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

app.config["MONGO_URI"] = os.environ.get('MONGODB_URI')
mongo = PyMongo(app)
db = mongo.db
fs = gridfs.GridFS(db)
# look I'm a comment

@app.route('/resetDatabase', methods=['GET', 'POST'])
def resetDatabase():
    x = db.forms.delete_many({})
    x = db.fs.chunks.delete_many({})
    x = db.fs.files.delete_many({})
    return str('Success')


@app.route('/test', methods = ['GET', 'POST'])
def test():
    a = fs.put(b"hello world")
    print(fs.get(a).read())
    return

@app.route('/getImages', methods=['GET', 'POST'])
def getImages():
    # print(request.args)
    userID = request.args.get('uid')
    imageNumber = int(request.args.get('number'))

    if len(list(db.forms.find({"uid": userID}))) == 0:
        return str({'imageIDs': []})
    else:
        userProfile = list(db.forms.find({"uid": userID}))[0]
        toReturn = []
        for photoID in userProfile['images']:
            toReturn.append(photoID)

        data = fs.get(toReturn[imageNumber])
        imageBytes = data.read()
        # print(5)
        # print(type(imageBytes))

        # print('toReturn', imageBytes)

        return send_file(io.BytesIO(imageBytes),
                         attachment_filename='logo.png',
                         mimetype='image/png')

    # print("HELLO")
    # print(1)
    # imageID = request.args.get('imageID')
    # query = {
    #     "_id": imageID
    # }
    # print(2)
    # cursor = fs.find(query).limit(1)
    # print(3, cursor)
    # while (yield cursor.fetch_next):
    #     # grid_data = cursor.next_object()
    #     print(4)
    #     # imageBytes = grid_data.read()
    #     # print(5)
    #     # print(type(imageBytes))
    # #
    # #     print('toReturn', imageBytes)
    # #
    # #     return send_file(io.BytesIO(imageBytes),
    # #                      attachment_filename='logo.png',
    # #                      mimetype='image/png')
    # return "fail"


@app.route('/getNumImages', methods=['GET', 'POST'])
def getImageIds():
    userID = request.args.get('uid')
    if len(list(db.forms.find({"uid": userID}))) == 0:
        return str({'imageIDs': []})
    else:
        userProfile = list(db.forms.find({"uid": userID}))[0]
        toReturn = []
        for photoID in userProfile['images']:
            toReturn.append(str(photoID))
        if len(toReturn) > 0:
            return json.dumps({"number": len(toReturn)})
        else:
            return json.dumps({"number": 0})



@app.route('/uploadImage', methods=['GET', 'POST'])
def uploadImage():
    userID = request.args.get('uid')

    # retrieve file from request params
    imagefile = request.files['image']
    # retrieve filename from file
    filename = werkzeug.utils.secure_filename(imagefile.filename)
    # save image file (temp)
    imagefile.save(filename)
    # print(filename)
    a = None
    with open(filename, "rb") as image:
        f = image.read()
        # save image file
        a = fs.put(f)

    if len(list(db.forms.find({"uid": userID}))) == 0:
        data = {
            'special': 'true',
            'images': [a],
            'uid': userID
        }
        db.forms.insert_one(data)
    else:
        userProfile = list(db.forms.find({"uid": userID}))[0]
        db.forms.delete_one({"uid": userID})
        userProfile['images'].append(a)
        db.forms.insert_one(userProfile)

    # print('done')
    return "Image Uploaded Successfully"

@app.route('/uploadAudio', methods=['GET', 'POST'])
def uploadAudio():
    userID = request.args.get('uid')

    if request.method == 'POST':
        print("IN POST")

        # check for post having audio file
        if 'audio' not in request.files:
            print("No file included w/ POST request")
            return str("You didn't send a file!")

        #retrieve file from request params
        file = request.files['audio']

        # retrieve filename from file
        filename = werkzeug.utils.secure_filename(file.filename)

        if filename == '':
            print("No selected file")
            return str("You didn't select a file!")

        #TODO: add check for being a .wav file, or do conversion here
        #      if we are unable to send .wav files from the front-end

        return str("Audio File Uploaded Successfully, it is = " + filename)
    elif request.method == 'GET':
        # save audio file (temp)
        #audiofile.save(filename)
        #print(filename)
        return str("Audio File GET request received")

if __name__ == '__main__':
    app.run(debug=True)

