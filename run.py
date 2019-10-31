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
    # retrieve file from request params
    imagefile = request.files['image']
    # retrieve filename from file
    filename = werkzeug.utils.secure_filename(imagefile.filename)
    # save image file (temp)
    imagefile.save(filename)

    a = None
    with open(filename, "rb") as image:
        f = image.read()
        # save image file
        a = fs.put(f)
    data = {
        'image': a
    }
    db.forms.insert_one(data)
    return "Image Uploaded Successfully"


if __name__ == '__main__':
    app.run(debug=True)

