from flask import Flask
from flask_restful import Resource, Api
from database import testDB

app = Flask(__name__)
api = Api(app)

# look I'm a comment


class HelloWorld(Resource):
    def get(self):
        listOfNums = []
        for i in range(0, 10):
            listOfNums.append(i)

        testDB.getTest()
        return {'users': testDB.getTest()}

class MakeUsers(Resource):
    def get(self):
        testDB.makeUsers()
        return {'success': True}

class Demo(Resource):
    def get(self):
        return {
            'hello': 'world',
            'imalist': [1,2,3,4]
        }

api.add_resource(HelloWorld, '/')
api.add_resource(Demo, '/demo')
api.add_resource(MakeUsers, '/insert')


if __name__ == '__main__':
    app.run(debug=True)

