import React, { useRef, useEffect, useState } from 'react';
import { 
  SiPython,  
  SiMysql, 
  SiTableau,  
  SiReact, SiHtml5, SiCss3, SiJavascript, SiGit, SiFirebase, SiVercel, SiFigma, 
} from 'react-icons/si';
import { BsBarChartFill } from "react-icons/bs";
import { FaFileExcel } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { FaAws } from "react-icons/fa";

// Skills Component: A continuously animating and draggable horizontal skills bar.
// It features a list of skill logos that automatically scrolls from left to right,
// but can also be manually scrolled by the user via mouse or touch drag.
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null); // Use a separate ref for the section to observe its visibility
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasScrolledIn, setHasScrolledIn] = useState(false); // State to trigger fade-in animation for section content

  // Skills data with icons
  const skills = [
    { name: "Python", icon: <SiPython className="w-12 h-12 text-gray-900" /> },
    { name: "SQL", icon: <SiMysql className="w-12 h-12 text-gray-900" /> },
    { name: "Power BI", icon: <BsBarChartFill className="w-12 h-12 text-gray-900" /> },
    { name: "Tableau", icon: <SiTableau className="w-12 h-12 text-gray-900" /> },
    { name: "Machine Learning", icon: <FaBrain className="w-12 h-12 text-gray-900" /> },
    { name: "React", icon: <SiReact className="w-12 h-12 text-gray-900" /> },
    { name: "HTML5", icon: <SiHtml5 className="w-12 h-12 text-gray-900" /> },
    { name: "CSS3", icon: <SiCss3 className="w-12 h-12 text-gray-900" /> },
    { name: "JavaScript", icon: <SiJavascript className="w-12 h-12 text-gray-900" /> },
    { name: "Git", icon: <SiGit className="w-12 h-12 text-gray-900" /> },
    { name: "AWS", icon: <FaAws className="w-12 h-12 text-gray-900" /> },
    { name: "Firebase", icon: <SiFirebase className="w-12 h-12 text-gray-900" /> },
    { name: "Vercel", icon: <SiVercel className="w-12 h-12 text-gray-900" /> },
    { name: "Figma", icon: <SiFigma className="w-12 h-12 text-gray-900" /> },
    { name: "Excel", icon: <FaFileExcel className="w-12 h-12 text-gray-900" /> },
  ];

  // Mouse drag event handlers
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsScrolling(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onMouseLeave = () => setIsScrolling(false);
  const onMouseUp = () => setIsScrolling(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isScrolling) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Touch event handlers for mobile
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsScrolling(true);
    if (scrollRef.current) {
      setStartX(touch.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isScrolling) return;
    const touch = e.touches[0];
    if (scrollRef.current) {
      const x = touch.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const onTouchEnd = () => setIsScrolling(false);

  const duplicatedSkills = [...skills, ...skills];

  // Autoscroll effect and fade-in animation logic
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const scrollSpeed = 0.5;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIn(true);
          observer.disconnect(); // Stop observing once it's in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (sectionRef.current) { // Observe the entire section for its visibility
      observer.observe(sectionRef.current);
    }

    const animateScroll = (timestamp: number) => {
      if (!isScrolling && scrollRef.current) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        const newScrollLeft = scrollRef.current.scrollLeft + (scrollSpeed * (deltaTime / 16.67));
        scrollRef.current.scrollLeft = newScrollLeft;

        if (newScrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      lastTime = timestamp;
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isScrolling]);

  return (
    <section ref={sectionRef} className="w-full py-5  overflow-hidden">
      <h2
        className={`text-center text-4xl font-extrabold mb-8 text-gray-900 transition-all duration-1500 ease-out transform
                    ${hasScrolledIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        Skills
      </h2>
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="flex space-x-8 md:space-x-12 px-8 overflow-x-hidden cursor-grab active:cursor-grabbing will-change-scroll mb-15"
      >
        {duplicatedSkills.map((skill, index) => (
          <div
            key={index}
            // Apply staggered fade-in and slide-up animation to each skill item
            className={`flex-shrink-0 flex flex-col items-center justify-center p-4
                        transition-all duration-1000 ease-out transform
                        ${hasScrolledIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 75}ms` }} // Staggered delay for each item
          >
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
              {skill.icon}
            </div>
            <p className="mt-2 text-xs sm:text-sm font-medium text-gray-700">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}