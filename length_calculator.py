import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from math import trunc
import time
import csv
# set up Spotipy credentials
client_id = 'ba949d1c63684f22b7a734b75dfce034'
client_secret = 'fd7fab55f754441694fab4ada6343d35'
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
        # return [trunc(round(duration_min, 2)), trunc(duration_sec)]
        return duration_ms
    else:
        return None

# example usage
# song_name = 'Bohemian Rhapsody'
# artist = 'Queen'
# length = get_song_length(song_name, artist)
# if length:
#     print(f'The length of {song_name} by {artist} is {length[0]} minutes and {length[1]} seconds.')
# else:
#     print('Song not found.')

with open('output.csv', 'r') as f:
    csv_reader = csv.reader(f)
    for row in csv_reader:
        try:
            int(row[2])
        except:
            continue
        xd = row
        title, artist_name, playcount = xd[0], xd[1], int(xd[2].strip())
        print(f'duration of {title} = {int(get_song_length(title, artist_name))/6000 * playcount} minutes')