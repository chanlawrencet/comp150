#! /usr/local/bin/python3

import os
import ffmpy

directory = os.fsencode("./audio_files/")
print("BEGIN: Creating spectrograms from .wav files...")

for audioFile in os.listdir(directory):
    filename = os.fsdecode(audioFile)
    if filename.endswith(".wav"):
        print("File {} is a .wav file, congratulations!".format(filename))
    else:
        print("File {} is not in .wav format".format(filename))

print("END: Finished creating spectrograms...")
