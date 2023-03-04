const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getPlaylistFromAssets = async () => {
  return await fetch('assets/playlist.json', { headers })
    .then((response) => response.json())
    .then((data) => data.playlist);
};
