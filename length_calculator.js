const axios = require('axios');

const api_key = "71facb03a41a05e1510413983b38d6b1"
async function getSongDuration(title, artist) {
  try {
    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(title)}&format=json`);
    
    // Extract duration from response
    const duration = response.data.track.duration;
    
    // Convert duration from milliseconds to minutes and seconds
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } catch (error) {
    console.error(error);
  }
}

getSongDuration('Bohemian Rhapsody', 'Queen')
  .then(duration => console.log(duration))
  .catch(error => console.error(error));
