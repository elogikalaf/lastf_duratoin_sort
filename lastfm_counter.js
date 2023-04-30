const fs = require("fs");
const axios = require("axios");
const csvWriter = require("csv-write-stream");
const util = require("util");

const apiKey = "416d0fa6cddd704a81918ce4fd6e95b8";
const username = "illogicalaf";
const limit = 200;
const extended = 1;
async function fetchPageCount(username, api_key, limit, extended) {
    try {
        const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${api_key}&limit=${limit}&format=json&extended=${extended}`;
        const response = await axios.get(url, { timeout: 100000});
        const data = response.data;
        const totalPages = parseInt(data['recenttracks']['@attr']['totalPages']);
        return totalPages;
    } catch (error) {
        console.error(error);
    }
}
async function fetchRecentTracks(username, api_key, limit, extended, page) {
    try {
        const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${api_key}&limit=${limit}&page=${page}&format=json&extended=${extended}`;
        const response = await axios.get(url, { timeout: 100000});
        const data = response.data;
        const listetningHabit = data;
        return listetningHabit
    } catch (error) {
        console.error(error);
    }
}
let tracks = {}
async function getScrobbleNum() {
    const totalPages = await fetchPageCount(username, apiKey, limit, extended)
    console.log(totalPages)
    for (var i = 1; i < totalPages; i++) {
        const listetningHabit = await fetchRecentTracks(username, apiKey, limit, extended, i);
        for (var track of listetningHabit["recenttracks"]["track"]) {
            const artist = track['artist']['name'];
            const title = track['name'];
            const track_key = `${artist} - ${title}`;
            if (tracks[track_key]) {
                tracks[track_key] = tracks[track_key] + 1;
            }
            else {
                tracks[track_key] = 1;
            }
        }
    }
    // convert object to array of key-value pairs
    const arr = Object.entries(tracks);

    // sort the array by the value in ascending order
    arr.sort((a, b) => b[1] - a[1]);

    // convert the array back to an object
    const sortedTracks = Object.fromEntries(arr);

    fs.appendFile('output4.txt', util.inspect(sortedTracks), (err) => {
        if (err) throw err;
        console.log('data appened to file');
    });
    return tracks;
}
async function xd() {
    const tracks = await getScrobbleNum();
    console.log(tracks);
}
xd()