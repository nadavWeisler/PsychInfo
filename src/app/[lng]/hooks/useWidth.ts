import { useEffect, useState } from 'react';

export function getWindowWidth(): number {
  // If window is not defined (i.e., during SSR), return a default value
  if (typeof window === 'undefined') {
    return 0; // or another appropriate default value
  }

  // If running on the client side, access the window object
  return window.innerWidth;
}

// You can also use a custom hook for window width:
export function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
}