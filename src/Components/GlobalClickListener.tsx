import { useEffect } from 'react';
import useClickStore from '../stores/clickStore'; // Adjust the path as needed

function GlobalClickListener() {
  const setClicked = useClickStore((state) => state.setClicked);

  useEffect(() => {
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 100); // Reset after a short delay
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setClicked]);

  return null;
}

export default GlobalClickListener;