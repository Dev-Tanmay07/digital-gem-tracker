import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function InFeedAd() {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        console.error('Ad push error:', e);
      }
    }
  }, []);

  return (
    <div className="my-6">
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-client="ca-pub-8774993022306712"
        data-ad-slot="3749621129"
      />
    </div>
  );
}
