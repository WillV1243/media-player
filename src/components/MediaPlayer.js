// react
import { useEffect, useRef } from 'react';

function MediaPlayer({ playlist }) {
  const videoRef = useRef();
  const sourceRef = useRef();

  useEffect(() => {
    console.log(playlist);
  }, [])

  return (
    <video ref={videoRef} className='video'>
      <source ref={sourceRef}></source>
    </video>
  )
}

export default MediaPlayer;