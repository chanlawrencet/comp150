from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from database import testDB
import werkzeug

UPLOAD_FOLDER = './'
app = Flask(__name__)
api = Api(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# look I'm a comment

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

