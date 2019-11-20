import os
import ffmpy
import sys
import argparse
from pydub import AudioSegment

""" for (dirpath, dirnames, filenames) in os.walk("./m4aRecordings/"):
    for filename in filenames:

        # convert .m4a file provided by frontend to .wav
        filepath = dirpath+ '/' + filename
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
"""

directory = os.fsencode("./wavFiles/")
print("BEGIN: Creating spectrograms from .wav files...")

for audioFile in os.listdir(directory):
    filename = os.fsdecode(audioFile)
    if filename.endswith(".wav"):
        ff = ffmpy.FFmpeg(inputs={'./wavFiles/' + filename: None}, outputs={'./spectrograms/' + filename + '.jpg': ['-lavfi', 'showspectrumpic=s=1024x512:legend=disabled']})
        ff.run()
    else:
        print("File {} is not in .wav format".format(filename))

print("END: Finished creating spectrograms...")
