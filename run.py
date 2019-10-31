from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import os
from flask_pymongo import PyMongo
from database import testDB
import gridfs
import werkzeug




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

@app.route('/test', methods = ['GET', 'POST'])
def test():
    a = fs.put(b"hello world")
    print(fs.get(a).read())
    return


@app.route('/uploadImage', methods = ['GET', 'POST'])
def uploadImage():
    imagefile = request.files['image']
    filename = werkzeug.utils.secure_filename(imagefile.filename)
    print("\nReceived image File name : " + imagefile.filename)
    imagefile.save(filename)
    print(filename)
    return "Image Uploaded Successfully"


if __name__ == '__main__':
    app.run(debug=True)

