// react
import { useEffect, useState, useRef } from 'react';

// dexie
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

// components
import MediaPlayer from './components/MediaPlayer';

// services
import { getPlaylistFromJSON } from './services/dataService';

// styles
import './global.css';

const initializeIndexedDB = () => {
  if (typeof Dexie === undefined) {
    console.error('Your browser does not support indexedDB!');
    return null;
  }

  const db = new Dexie('MediaPlayerDatabase');

  console.log('im being called!');

  db.version(1).stores({ database: 'initialised' });
  db.version(1).stores({ playlist: 'id, name, path, duration' });

  return db;
};

function App() {
  const [playlist, setPlaylist] = useState(null);
  const [indexedDBSupported, setIndexedDBSupported] = useState(true);

  const db = useRef(initializeIndexedDB());

  const initialised = useLiveQuery(() => db.database.toArray(), []);
  const playlistFromDB = useLiveQuery(() => db.playlist.toArray(), []);

  const setInitialPlaylist = (playlist) => {
    if (playlist.length !== 0) {
      setPlaylist(playlist);
    } else {
      getPlaylistFromJSON().then((playlistFromJSON) => {
        setPlaylist(playlistFromJSON);
        addPlaylistToDB(playlistFromJSON);
      });
    }
  };

  const addPlaylistToDB = async (playlist) => {
    await db.database.put('initialised', true);
    await db.playlist.bulkPut(playlist);
  };

  useEffect(() => {
    if (playlistFromDB) {
      setInitialPlaylist(playlistFromDB);
    }
  }, [playlistFromDB]);

  return (
    <div className='app'>
      {!indexedDBSupported ? <></> : <>IndexedDB not supported</>}
      {playlist ? <MediaPlayer playlist={playlist} /> : <>Loading...</>}
    </div>
  );
}

export default App;
