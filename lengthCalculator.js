const axios = require('axios');
const fs = require('fs');


    
const url = 'http://ws.audioscrobbler.com/2.0/';
    
async function getTrackDuration(artist_name, track_name) {
      try {
            const requestParams = {
                method: 'track.getInfo',
                api_key: '',
                artist: artist_name,
                track: track_name,
                format: 'json'
                };
            const response = await axios(url, { params: requestParams });
            const durationInMiliSeconds = response.data.track.duration/1000;
            return durationInMiliSeconds;
          } catch (error) {
                console.error(error);
            }
}            
const readTops = async function () {
    const readStream = fs.createReadStream("tops.txt", { encoding: 'utf-8' });
    readStream.on('data', async function(chunk) {
        const lines = chunk.split('\n');
        for (let i = 0; i < lines.length; i++) {
        // Process the line here
        let scrobbles = lines[i].split(":")[1];
        let artist = lines[i].split(":")[0].split("-")[0].trim().slice(1);
        let title = lines[i].split(":")[0].split("-")[1].trim().slice(0, -1);
        const timeSpent = await getTrackDuration(artist, title);
        console.log(artist, title, timeSpent)
        }
    });
}
readTops();