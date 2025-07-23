'use client';

import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    (async () => {
      await fetch('/api/aa', {
        credentials: 'include',
      });
    })();
  }, []);

  return (
    <div className="container">
      <div className="h-full bg-blue-500"></div>
      <div className="h-full bg-red-500"></div>
    </div>
  );
}

export default Home;
