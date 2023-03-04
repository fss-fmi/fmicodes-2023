'use client';

import { useState } from 'react';
import CircularLoadingIndicator from '../circular-loading-indicator/circular-loading-indicator';
import Spline from '@splinetool/react-spline';

export function HeroLogo() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute flex top-0 left-0 w-full h-full items-center justify-center">
      {!isLoaded ? (
        <div className="absolute z-10">
          <CircularLoadingIndicator />
        </div>
      ) : null}

      <Spline
        className="h-screen"
        onLoad={() => setIsLoaded(true)}
        scene="https://prod.spline.design/1FVskVRR596-pj8H/scene.splinecode"
      />
    </div>
  );
}

export default HeroLogo;
