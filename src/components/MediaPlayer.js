// react
import { useRef } from 'react';

function MediaPlayer(params) {
  const videoRef = useRef();
  const sourceRef = useRef();

  return (
    <video ref={videoRef} className='video'>
      <source ref={sourceRef}></source>
    </video>
  )
}

export default MediaPlayer;