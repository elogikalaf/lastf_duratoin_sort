const axios = require('axios');
const fs = require('fs');
const util = require("util");

const LASTFM_API_KEY = '';
const LASTFM_USERNAME = '';

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
    fs.writeFile("tops.txt", "", (err) => {
      if (err) throw err;
    })
    for (const track of topTracks) {
      await fs.promises.appendFile('tops.txt', `"${track.artist.name} - ${track.name}" : ${track.playcount}\n`);
    }

} catch (error) { console.error(error);}
}

getTopTracks();
