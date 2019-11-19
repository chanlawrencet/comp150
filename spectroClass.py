import os
import ffmpy

def convertAudio(self):
    print("I am being called!")
    myFile = os.fsdecode(self)
    if myFile.endswith(".wav"):
        ff = ffmpy.FFmpeg(inputs={myFile: None}, outputs={myFile + '.jpg': ['-lavfi', 'showspectrumpic=s=1024x512:legend=disabled']})
        ff.run()
    else:
        raise Exception("File was not in .wav format")
    return 

class audioProcessing:
    def __init__(self, audioFile):
        self.audioFile = audioFile
