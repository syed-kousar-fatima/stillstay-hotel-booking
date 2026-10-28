import { useEffect, useState } from 'react';

const fallbackImage = '/stay-placeholder.svg';

export default function StayImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      {...props}
      src={failed || !src ? fallbackImage : src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
