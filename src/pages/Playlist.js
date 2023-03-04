// react
import { useEffect, useState, useContext } from 'react';

// components
import MediaPlayer from '../components/MediaPlayer';

// context
import { IndexedDBContext } from '../providers/IndexedDBProvider';

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);

  const { error, loaded, notSupported, isInitialised, getPlaylistFromDB, getPlaylistFromJSON } =
    useContext(IndexedDBContext);

  useEffect(() => {
    if (loaded) {
      isInitialised()
        .then((initialised) => {
          if (initialised) {
            return getPlaylistFromDB();
          } else {
            return getPlaylistFromJSON();
          }
        })
        .then((playlist) => {
          if (playlist) setPlaylist(playlist);
        });
    }
  }, [loaded, isInitialised, getPlaylistFromDB, getPlaylistFromJSON]);

  if (notSupported) return <>IndexedDB not supported</>;

  if (error) return <>There has been an error with your thingy</>;

  if (!playlist) return <>Loading...</>;

  return (
    <>
      <MediaPlayer playlist={playlist} />
    </>
  );
};

export default Playlist;
