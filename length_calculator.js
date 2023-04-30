const fs = require('fs');
const mm = require('music-metadata');

const songPath = '/path/to/song.mp3';

fs.readFile(songPath, async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const metadata = await mm.parseBuffer(data);

  console.log(`Duration: ${metadata.format.duration} seconds`);
});
