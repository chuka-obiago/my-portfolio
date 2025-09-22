import React from 'react';

interface CtaProps {
  children?: React.ReactNode; // Button text or elements
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional click handler
  className?: string; // Optional additional CSS classes
  targetId?: string; // Optional ID of the section to scroll to
}


export default function Cta({ children = 'SCHEDULE A CALL', onClick, className = '', targetId }: CtaProps) {

  // Internal handler to either scroll or execute the provided onClick
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        // Prevent default behavior to avoid, for example, a page reload if the button is inside a form
        event.preventDefault();
        // Adjust scroll position to account for sticky navbar height (if applicable)
        // Assuming a navbar height of 80px for a better user experience.
        const yOffset = -0;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        console.warn(`Section with ID '${targetId}' not found for scrolling.`);
      }
    } else if (onClick) {
      onClick(event); // Execute the passed-in onClick prop if no targetId
    }
  };

  return (
    <button
      onClick={handleClick} // Use the new handleClick function
      className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden
                  rounded-full bg-[#d9d7cb] text-black font-semibold text-md md:text-xl
                  group transition-all duration-300 ease-in-out cursor-pointer border-none
                  ${className}`} // Allows for additional custom classes
    >
      {/* Background slide-up effect */}
      <span className="absolute inset-0 bg-white transition-all duration-300 ease-in-out group-hover:translate-y-0 translate-y-full z-0"></span>

      {/* Text content - conditionally changes color on hover */}
      <span className="relative z-10 transition-colors duration-330 ease-in-out group-hover:text-black">
        {children}
      </span>
    </button>
  );
}
