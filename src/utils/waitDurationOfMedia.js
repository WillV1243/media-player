export const waitDurationOfMedia = (playlist, callback) => {;
  let position = 0;

  const wait = () => {
    if (callback) callback(playlist[position]);

    const duration = playlist[position].duration * 1000;

    position++;

    if (position >= playlist.length) {
      position = 0;
    }

    setTimeout(() => wait(), duration);
  };

  wait();
};