const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getPlaylistFromJSON = async () => {
  return await fetch('config/playlist.json', { headers })
    .then((response) => response.json())
    .then((data) => data.playlist);
};
