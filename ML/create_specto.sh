echo '>> START : Creating spectrograms from .wav files <<'

for audioFile in ./audio_files/*.wav; do
    echo $audioFile
    ffmpeg -i $audioFile -lavfi showspectrumpic=s=1024x512:legend=disabled $audioFile.jpg
done

for spectrogram in ./audio_files/*.jpg; do
    echo $spectrogram
    mv $spectrogram ./spectrograms/
done

echo '>> END : Finished creating spectrograms <<'
