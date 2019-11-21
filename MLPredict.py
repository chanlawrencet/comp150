import sys
import os

from google.cloud import automl_v1beta1
from google.cloud.automl_v1beta1.proto import service_pb2
from google.oauth2 import service_account

#os.system('export GOOGLE_APPLICATION_CREDENTIALS="cdrproject-41ed7890a5e2.json"')
#credentials = service_account.Credentials.from_service_account_file('cdrproject-41ed7890a5e2.json')

# 'content' is base-64-encoded image data.
def get_prediction(spectroFile, projectID, modelID):
  credentials = service_account.Credentials.from_service_account_file('cdrproject-41ed7890a5e2.json')
  prediction_client = automl_v1beta1.PredictionServiceClient(
    credentials=credentials,
  )
  
  content = open(spectroFile, 'rb').read()

  name = 'projects/{}/locations/us-central1/models/{}'.format(projectID, modelID)
  payload = {'image': {'image_bytes': content }}
  params = {}
  request = prediction_client.predict(name, payload, params)
  print(request)
  return request  # waits till request is returned

class predict:
    def __init__(self):
        self.credentials = service_account.Credentials.from_service_account_file('cdrproject-41ed7890a5e2.json')

""" if __name__ == '__main__':
  file_path = sys.argv[1]
  project_id = sys.argv[2]
  model_id = sys.argv[3]


  with open(file_path, 'rb') as ff:
    content = ff.read()

  print(get_prediction(content, project_id, model_id)) """