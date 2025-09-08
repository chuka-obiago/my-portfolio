import React, { useState, useEffect, useRef } from 'react';
import { FaCode } from "react-icons/fa"; // Web Dev
import { BsClipboardData } from "react-icons/bs"; // Data Analytics
import { PiGraphDuotone } from "react-icons/pi"; // ML Solutions

// ServiceCard component
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceItem = ({ title, description, icon }: ServiceCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative group overflow-hidden">
      <div
        className="flex items-center justify-between py-6 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center space-x-4">
          {/* Icon + Title wrapper for scaling */}
          <div className="flex items-center px-3 space-x-4 transform transition-transform duration-300 group-hover:scale-110">
            <div className="text-white">{icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gray-200">
              {title}
            </h3>
          </div>
        </div>
        <div
          className="p-2 transition-transform duration-300 ease-in-out transform"
          style={{ rotate: isOpen ? '45deg' : '0deg' }}
        >
          <svg
            className="h-6 w-6 text-white group-hover:text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>

      {/* Expanding line animation */}
      <div className="h-0.5 w-full bg-gray-600">
        <div
          className={`h-full bg-white transition-all duration-300 ease-in-out ${
            isOpen ? 'w-full' : 'w-0'
          } group-hover:w-full`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-lg text-gray-400">{description}</p>
      </div>
    </div>
  );
};

// --- Services Component ---
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const servicesData = [
    {
      title: 'ML Solutions',
      description:
        'Build, deploy, and optimize custom machine learning models to solve complex business problems, from predictive analytics to natural language processing. I specialize in turning raw data into actionable intelligence that drives results.',
      icon: <PiGraphDuotone className="h-8 w-8 text-white" />,
    },
    {
      title: 'Web Development',
      description:
        'Craft modern, responsive, and high-performance web applications tailored to your specific needs, using the latest front-end and back-end technologies. I focus on creating intuitive user experiences that are both beautiful and functional.',
      icon: <FaCode className="h-8 w-8 text-white" />,
    },
    {
      title: 'Data Analysis',
      description:
        'Extract actionable insights from raw data, create interactive dashboards, and drive data-informed decisions with comprehensive statistical analysis and visualization. My goal is to transform complex datasets into clear, compelling narratives.',
      icon: <BsClipboardData className="h-8 w-8 text-white" />,
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full min-h-screen py-16 px-8 text-white"
    >
      {/* Animation styles */}
      <style >{`
        @keyframes letter-pop {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-title-reveal span {
          display: inline-block;
          animation: letter-pop 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)
            forwards;
        }
        .hidden-title span {
          opacity: 0;
        }
      `}</style>

      <div className="container mx-auto max-w-4xl">
        <h2 className="text-center text-5xl md:text-6xl font-extrabold mb-4 uppercase tracking-widest text-white">
          <span className="sr-only">SERVICES</span>
          <div
            key={isTitleVisible ? 'visible' : 'hidden'}
            className={isTitleVisible ? 'animate-title-reveal' : 'hidden-title'}
          >
            <span style={{ animationDelay: '0ms' }}>S</span>
            <span style={{ animationDelay: '100ms' }}>E</span>
            <span style={{ animationDelay: '200ms' }}>R</span>
            <span style={{ animationDelay: '300ms' }}>V</span>
            <span style={{ animationDelay: '400ms' }}>I</span>
            <span style={{ animationDelay: '500ms' }}>C</span>
            <span style={{ animationDelay: '600ms' }}>E</span>
            <span style={{ animationDelay: '700ms' }}>S</span>
          </div>
        </h2>
        <div className="h-0.5 w-24 mx-auto mb-12 bg-gray-600 transition-all duration-500 ease-in-out" />

        <div className="space-y-6 md:space-y-8">
          {servicesData.map((service, index) => (
            <ServiceItem
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
