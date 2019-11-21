from flask import Flask, flash, request, redirect, send_file, url_for
from flask_restful import Resource, Api
from flask_cors import CORS
import os
import io
from flask_pymongo import PyMongo
#from database import testDB
import gridfs
import werkzeug
import codecs
import json
import sys
import argparse
from spectroClass import convertAudio
from google.cloud import automl_v1beta1
from google.cloud.automl_v1beta1.proto import service_pb2
from google.oauth2 import service_account
from pydub import AudioSegment
from MLPredict import get_prediction

UPLOAD_FOLDER = './'
app = Flask(__name__)
api = Api(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

""" app.config["MONGO_URI"] = os.environ.get('MONGODB_URI')
mongo = PyMongo(app)
db = mongo.db
fs = gridfs.GridFS(db)

@app.route('/sendForm', methods=['POST'])
def sendForm():
    userID = request.args.get('uid')
    formContents = request.json

    if len(list(db.forms.find({"uid": userID}))) == 0:
        data = {
            'special': 'true',
            'forms': [formContents],
            'images': [],
            'uid': userID
        }
        db.forms.insert_one(data)
    else:
        userProfile = list(db.forms.find({"uid": userID}))[0]
        db.forms.delete_one({"uid": userID})
        userProfile['forms'].append(formContents)
        db.forms.insert_one(userProfile)



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


@app.route('/getNumImages', methods=['GET', 'POST'])
def getImageIds():
    userID = request.args.get('uid')
    if len(list(db.forms.find({"uid": userID}))) == 0:
        return json.dumps({"number": 0})
    else:
        userProfile = list(db.forms.find({"uid": userID}))[0]
        toReturn = []
        for photoID in userProfile['images']:
            toReturn.append(str(photoID))
        return json.dumps({"number": len(toReturn)})



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
            'forms': [],
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
    return "Image Uploaded Successfully" """

@app.route('/uploadAudio', methods=['POST'])
def uploadAudio():
    userID = request.args.get('uid')

    if request.method == 'POST':
        print("IN POST")

        # check for post having audio file
        if 'audio' not in request.files:
            return str("You didn't send a file!")

        #retrieve file from request params
        file = request.files['audio']

        # retrieve filename from file
        filename = werkzeug.utils.secure_filename(file.filename)

        if filename == '':
            print("No selected file")
            return str("You didn't select a file!")

        # temporary save file
        file.save(file.filename)

        print("FILENAME IS: " + filename)

        # convert .m4a file provided by frontend to .wav
        filepath = './' + filename
        (path, file_extension) = os.path.splitext(filepath)
        file_extension_final = file_extension.replace('.', '')
        
        try:
            track = AudioSegment.from_file(filepath,
                    file_extension_final)
            wav_filename = filename.replace(file_extension_final, 'wav')
            wav_path = './' + wav_filename
            file_handle = track.export(wav_path, format='wav')
            os.remove(filepath)
        except:
            print("Error converting from .m4a to .wav" + str(filepath))

        # Convert .wav file to spectrogram, also checks for .wav file
        # being the input form, raises exception if not
        
        convertAudio(wav_filename)
        spectroFile = wav_filename + '.jpg'

        # sending spectrogram to AutoML
        MLresponse = get_prediction(spectroFile, '809306467634', 'ICN1707554752075661312')
        
        # print("spectroFile is: " + spectroFile)
        #os.system('export GOOGLE_APPLICATION_CREDENTIALS="$(< cdrproject-41ed7890a5e2.json)"')
        #os.system('echo $GOOGLE_APPLICATION_CREDENTIALS')
        #print('Credendtials from environ: {}'.format(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')))
        #os.system('python3 predict.py ' + wav_filename + '.jpg 809306467634 ICN1707554752075661312')

        #os.system('export GOOGLE_APPLICATION_CREDENTIALS="cdrproject-41ed7890a5e2.json"')
        """ credentials = service_account.Credentials.from_service_account_file('cdrproject-41ed7890a5e2.json')

        file_path = wav_filename + '.jpg'
        project_id = '809306467634'
        model_id = 'ICN1707554752075661312'

        ff = open(file_path, 'rb')
        content = ff.read()
            
        prediction_client = automl_v1beta1.PredictionServiceClient(credentials=credentials)

        name = 'projects/{}/locations/us-central1/models/{}'.format(project_id, model_id)
        payload = {'image': {'image_bytes': content }}
        params = {}
        mlRequest = prediction_client.predict(name, payload, params)
        #print(mlRequest.payload) """

        return str("Audio File Uploaded Successfully, it is = " + filename)

    # if request.method == 'GET':
    #    # save audio file (temp)
    #   #audiofile.save(filename)#
    #    #print(filename)
    #    return str("Audio File GET request received")

if __name__ == '__main__':
    app.run(debug=True)

