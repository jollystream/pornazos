import { useEffect } from 'react';

const Popcash = () => {
  useEffect(() => {
    window.uid = '451440';
    window.wid = '677618';
    const pop_tag = document.createElement('script');
    pop_tag.src = '//cdn.popcash.net/show.js';
    document.body.appendChild(pop_tag);
    pop_tag.onerror = function () {
      pop_tag = document.createElement('script');
      pop_tag.src = '//cdn2.popcash.net/show.js';
      document.body.appendChild(pop_tag);
    };
  }, []);

  return null;
};

export default Popcash;