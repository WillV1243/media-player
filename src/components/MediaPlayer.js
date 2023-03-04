// react
import { useEffect, useRef } from 'react';

// utils
import { waitDurationOfMedia } from '../utils/waitDurationOfMedia';

function MediaPlayer({ playlist }) {
  const videoRef = useRef();
  const imgRef = useRef();

  const showMedia = (media) => {
    switch (media.type) {
      case 'img':
        videoRef.current.style.display = 'none';
        imgRef.current.style.display = 'block';
        imgRef.current.src = media.path;
        break;

      case 'video':
        imgRef.current.style.display = 'none';
        videoRef.current.style.display = 'block';
        videoRef.current.src = media.path;
        break;

      default:
        videoRef.current.style.display = 'none';
        imgRef.current.style.display = 'none';
    }
  }

  useEffect(() => {
    waitDurationOfMedia(playlist, showMedia);
  }, [playlist]);

  return (
    <>
      <video ref={videoRef} className='media-player' autoPlay loop></video>
      <img ref={imgRef} className='media-player'></img>
    </>
  );
}

export default MediaPlayer;
