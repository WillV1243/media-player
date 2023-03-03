// context
import { IndexedDBProvider } from './providers/IndexedDBProvider';

// components
import Playlist from './pages/Playlist';

// styles
import './global.css';

const App = () => {
  return (
    <div className='app'>
      <IndexedDBProvider>
        <Playlist />
      </IndexedDBProvider>
    </div>
  );
};

export default App;
