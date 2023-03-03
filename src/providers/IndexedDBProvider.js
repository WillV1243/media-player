// react
import { useEffect, useState, createContext, useCallback } from 'react';

// dexie
import Dexie from 'dexie';

// services
import { getPlaylistFromAssets } from '../services/dataService';

export const IndexedDBContext = createContext();

export const IndexedDBProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [notSupported, setNotSupported] = useState(true);

  const isInitialised = useCallback(async () => {
    return await db.config
      .get(0)
      .then((response) => response?.isInitialised)
      .catch((error) => setError(error));
  }, [db, setError]);

  const getPlaylist = useCallback(async () => {
    return await db.playlist.toArray().catch((error) => setError(error));
  }, [db, setError]);

  const getPlaylistFromJSON = useCallback(async () => {
    return await getPlaylistFromAssets()
      .then(async (playlist) => {
        await db.playlist.bulkPut(playlist);
        await db.config.put({ id: 0, isInitialised: true });
        return playlist;
      })
      .catch((error) => setError(error));
  }, [db, setError]);

  useEffect(() => {
    const database = new Dexie('MediaPlayerDatabase');

    database.version(1).stores({ config: 'id, isInitialised' });
    database.version(1).stores({ playlist: 'id, name, path, duration' });

    database.open().then(() => {
      setDb(database);
      setNotSupported(false);
      setLoaded(true);
    })
    .catch((error) => {
      console.error('Your browser does not support indexedDB!', error);
      setNotSupported(true);
    });
  }, []);

  return (
    <IndexedDBContext.Provider value={{ error, loaded, notSupported, isInitialised, getPlaylist, getPlaylistFromJSON }}>
      {children}
    </IndexedDBContext.Provider>
  );
};
