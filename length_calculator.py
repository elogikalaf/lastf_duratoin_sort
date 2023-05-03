import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from math import trunc
import time
import csv
# set up Spotipy credentials
client_id = ''
client_secret = ''
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# function to get song length
def get_song_length(song_name, artist):
    results = sp.search(q=f'{song_name} {artist}', type='track')
    if len(results['tracks']['items']) > 0:
        track = results['tracks']['items'][0]
        duration_ms = track['duration_ms']
        duration_min = duration_ms / 1000 / 60
        duration_sec = duration_ms / 1000 % 60
        return duration_ms
    else:
        return None

lengths = {}
with open("tops.txt", 'r') as f:

    for line in f:
        scrobbles = line.split(":")[1].strip()
        artist = line.split(":")[0].split("-")[0].strip(" \"")
        track = line.split(":")[0].split("-")[1].strip(" \"")
        duration = get_song_length(track, artist)
        try:
            lengths[f"{artist} - {track}"] = int(duration)*int(scrobbles)//1000
        except:
            lengths[f"{artist} - {track}"] = 0
sorted_lengths = dict(sorted(lengths.items(), key=lambda x: x[1], reverse=True))


with open("last.txt", 'w') as lmao:
    lmao.write(str(sorted_lengths))