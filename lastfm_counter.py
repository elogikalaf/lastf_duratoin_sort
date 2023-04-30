import requests
import csv

api_key = 'fc8639344a5aff3ac7c22d8dbcf6657f'
username = 'illogicalaf'
limit = 200
extended = 1
url = f'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user={username}&api_key={api_key}&limit={limit}&format=json&extended={extended}'
response = requests.get(url)

data = response.json()
total_pages = int(data['recenttracks']['@attr']['totalPages'])
tracks = {}
for page in range(1, total_pages+1):
    url = f'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user={username}&api_key={api_key}&limit={limit}&page={page}&format=json&extended={extended}'
    response = requests.get(url)
    data = response.json()
    for track in data['recenttracks']['track']:
        artist = track['artist']['name']
        title = track['name']
        track_key = f'{artist} - {title}'
        tracks[track_key] = tracks.get(track_key, 0) + 1

# Print the track data sorted by playcount
# for track, playcount in sorted(tracks.items(), key=lambda x: x[1], reverse=True):
#     print(f'{track} ({playcount} plays)')
#     with open('output.txt', 'a') as f:
#         f.write(f'{track} ({playcount} plays)\n')

with open('output.csv', 'w') as file:
    writer = csv.writer(file)
    writer.writerow(['Song', 'Artist', 'Playcount'])
    for track, playcount in sorted(tracks.items(), key=lambda x: x[1], reverse=True):
        song_name = track.split('-')[1].strip()
        artist_name = track.split('-')[0].strip()
        playcount = tracks.get(f'{artist_name} - {song_name}')
        writer.writerow([song_name, artist_name, playcount])
