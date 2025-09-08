import { useState, useEffect, useRef } from 'react';

// Sample data for images
const parallaxImages = {
  column1: [
    'https://placehold.co/400x600/1e293b/d1d5db?text=Image+1',
    'https://placehold.co/400x450/1e293b/d1d5db?text=Image+2',
    'https://placehold.co/400x450/1e293b/d1d5db?text=Image+2',
  ],
  column2: [
    'https://placehold.co/400x450/374151/d1d5db?text=Image+4',
    'https://placehold.co/400x600/374151/d1d5db?text=Image+5',
    'https://placehold.co/400x500/374151/d1d5db?text=Image+6',
    'https://placehold.co/400x500/374151/d1d5db?text=Image+6',
  ],
  column3: [
    'https://placehold.co/400x550/1f2937/d1d5db?text=Image+7',
    'https://placehold.co/400x600/1f2937/d1d5db?text=Image+8',
    'https://placehold.co/400x450/1e293b/d1d5db?text=Image+9',
  ],
};

const ParallaxImages = () => {
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const componentTop = parallaxRef.current.offsetTop;
        const scrollPosition = window.scrollY;
        const relativeScrollY = scrollPosition - componentTop;
        setScrollY(relativeScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxFactorUp = 0.3;
  const parallaxFactorDown = -0.2;

  return (
    <section
      ref={parallaxRef}
      className="relative h-[50vh] md:h-[200vh] bg-[#7F797D] overflow-hidden"
    >
      <div className="absolute inset-0 grid grid-cols-3 gap-2 sm:gap-4 px-2 sm:px-4 lg:px-8">
        {/* Left Column */}
<div
  className="flex flex-col gap-4 md:gap-6"
  style={{
    // Start scrolled up so Image 2 is visible, Image 1 is slightly above
    transform: `translateY(calc(-0% + ${scrollY * parallaxFactorUp}px))`,
  }}
>
  {parallaxImages.column1.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`Parallax image ${index + 1}`}
      className="w-full h-auto rounded-lg shadow-xl"
    />
  ))}
</div>

{/* Middle Column */}
<div
  className="flex flex-col gap-4 md:gap-6"
  style={{
    transform: `translateY(calc(-20% + ${scrollY * parallaxFactorDown}px))`,
  }}
>
  {parallaxImages.column2.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`Parallax image ${index + 4}`}
      className="w-full h-auto rounded-lg shadow-xl"
    />
  ))}
</div>

{/* Right Column */}
<div
  className="flex flex-col gap-4 md:gap-6"
  style={{
    transform: `translateY(calc(-0% + ${scrollY * parallaxFactorUp}px))`,
  }}
>
  {parallaxImages.column3.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`Parallax image ${index + 7}`}
      className="w-full h-auto rounded-lg shadow-xl"
    />
  ))}
</div>
      </div>
    </section>
  );
};

export default ParallaxImages;
