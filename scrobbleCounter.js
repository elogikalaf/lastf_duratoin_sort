const axios = require('axios');
const fs = require('fs');
const util = require("util");

const LASTFM_API_KEY = '1cdddb3eb441e2d3618ba705a4a36556';
const LASTFM_USERNAME = 'illogicalaf';

async function getTopTracks() {
  const params = {
    method: 'user.getTopTracks',
    api_key: LASTFM_API_KEY,
    user: LASTFM_USERNAME,
    period: 'overall',
    limit: 1000,
    format: 'json',
  };
  try {
    const response = await axios.get('https://ws.audioscrobbler.com/2.0/', { params });
 
    const topTracks = response.data.toptracks.track;
    for (const track of topTracks) {
        if (fs.existsSync("tops.txt")) {
            await fs.promises.appendFile('tops.txt', `${track.artist.name} - ${track.name} (${track.playcount} scrobbles)\n`);
        } else {
            await fs.promises.writeFile('tops.txt', `${track.artist.name} - ${track.name} (${track.playcount} scrobbles)\n`);
        }
    }
} catch (error) { console.error(error);}
}

getTopTracks();
