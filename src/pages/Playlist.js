// react
import { useEffect, useState, useContext } from 'react';

// components
import MediaPlayer from '../components/MediaPlayer';

// context
import { IndexedDBContext } from '../providers/IndexedDBProvider';

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);

  const {
    error,
    loaded,
    notSupported,
    isInitialised,
    getPlaylist,
    getPlaylistFromJSON
  } = useContext(IndexedDBContext);

  useEffect(() => {
    if (loaded) {
      isInitialised()
        .then((response) => {
          if (response) {
            return getPlaylist();
          } else {
            return getPlaylistFromJSON();
          }
        })
        .then((playlist) => {
          setPlaylist(playlist);
        });
    }
  }, [loaded, isInitialised, getPlaylist, getPlaylistFromJSON]);

  if (notSupported) return <>IndexedDB not supported</>;

  if (error) return <>There has been an error with your thingy</>;

  return playlist ? <MediaPlayer playlist={playlist} /> : <>Loading...</>;
};

export default Playlist;
