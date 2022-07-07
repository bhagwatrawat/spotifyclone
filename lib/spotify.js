import SpotifyWebApi from "spotify-web-api-node";

const scope=[
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-follow-read",
].join(',');

const params={
    scope:scope,
};
const LOGIN_URL = `https://accounts.spotify.com/authorize?${new URLSearchParams(params).toString()}`;
const spotifyApi= new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi;
export {LOGIN_URL};