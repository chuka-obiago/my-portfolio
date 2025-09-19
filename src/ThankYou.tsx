import { useState, useEffect } from 'react';
import ThankYouBg from './assets/img/thankyou-bg.png';

export default function ThankYou() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen font-sans flex items-center justify-center p-4">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{ backgroundImage: `url(${ThankYouBg})` }}
      />

      {/* Optional semi-transparent overlay for slight dimming */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Foreground content */}
      <div
        className={`relative bg-[#d9d7cb]/90 rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-lg w-full transition-all duration-1000 ease-out transform
          ${isMounted ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-8'}`}
      >
        <div className="flex justify-center mb-6">
          <svg
            className="text-emerald-500 h-16 w-16 md:h-20 md:w-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>

        <h1
          className={`text-2xl md:text-4xl font-extrabold text-gray-900 transition-all duration-1000 ease-out transform
            ${isMounted ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'}`}
        >
          Thank you for subscribing!
        </h1>

        <p
          className={`mt-4 text-gray-600 text-sm md:text-base transition-all duration-1000 ease-out transform
            ${isMounted ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4'}`}
        >
          You'll be first to receive updates and early access as soon as we launch.
        </p>

        <div
          className={`mt-8 transition-all duration-1000 ease-out transform
            ${isMounted ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-4'}`}
        >
          <a
            href="/"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 cursor-pointer transition-colors duration-300"
          >
            Back to Site
          </a>
        </div>
      </div>
    </div>
  );
}
