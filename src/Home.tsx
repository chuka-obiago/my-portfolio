import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import bgImage from './assets/img/_GN_6680.jpg'; 
import Navbar from '../src/components/Navbar';
import Cta from './components/Cta';
import About from './About';
import Skills from './components/Skills';
import Project from './Project';
import Services from './Services';
import Parallax from './Parallax';
// import ParallaxImages from './ParallaxImages';
import Testimonials from './Testimonials';
import Products from './Products';


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0.65); // default opacity

  useEffect( () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 500; // how far to scroll before max darkness
      const newOpacity = Math.min(0.65, 0.65 + scrollY / maxScroll); 
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <LoadingScreen />;


  return (
    
    // Main Container
    <div className="relative w-screen min-h-screen font-sans overflow-x-hidden">

      <Navbar />

      {/* Hero Section: Contains bg-image, name, and title */}
      <div
        className="relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          // Default background position for smaller screens
          backgroundPosition: 'center top 25%',
          backgroundAttachment: 'fixed',
        }}
      >
  
        <div className="absolute inset-0 bg-image-layer bg-center lg:bg-top"></div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black  z-0 rounded-lg" style={{ opacity }}></div>

        {/* Content for the main screen (Name, Title) */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 rounded-lg">
          {/* Name */}
          <h1 className="text-6xl md:text-8xl lg:text-8xl font-extrabold mb-4 animate-fade-in drop-shadow-lg leading-tight">
            CHUKWUKA OBIAGO
          </h1>
          {/* Title */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium animate-slide-up drop-shadow-md pb-3">
            Providing Web, Data and AI Solutions
          </p>
          <div className="animate-slide-up mt-5">
            <Cta targetId="contact"/>
          </div>
          
          
        </div>

        {/* Blinking arrow down icon */}
        <div  
        onClick={() =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 z-10 animate-blink-arrow hover:cursor-pointer"
        >
          <svg
            className="w-10 h-10 md:w-12 md:h-12 text-white "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>


      {/* Sections for navigation */} 
      <section className="bg-[#d9d7cb]">
        <About /> 
        <Skills />
      </section>  

      <section id="projects" className="bg-[#d9d7cb]">
        <Project />

        {/* CTA */}
        <div className="justify-center text-center text-gray-900 text-2xl md:text-3xl lg:text-4xl font-medium drop-shadow-md pb-25 flex flex-col md:flex-row md:gap-4 items-center gap-3">
          <span>Have a project in mind?</span>
          <Cta className="text-gray-900 bg-gray-100" targetId="contact">GET IN TOUCH</Cta>
        </div>

      </section>

      <section id="services" className="bg-[#211e1f]">
        <Services />
      </section>

      <Testimonials />

      <section id="products" className="bg-[#211e1f]">
        <Products />
      </section>

      <section id="" className="">
        <Parallax />
      </section>

      <section id="contact" className="w-full h-screen bg-[#A9A9A9] bg-opacity-90 flex items-center justify-center text-white text-4xl p-8 z-10 rounded-lg">
        <p>Get in CONTACT with me!</p>
      </section>



      {/* CSS for animations and custom styles */}
      <style>{`

        /* Global reset for html and body to remove default margins/padding */
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden; /* Ensure no horizontal scrollbar on the entire page */
        }


        @media (min-width: 1024px) { /* Tailwind's 'lg' breakpoint */
          /* Apply bg-top for large screens to the background image. */
          /* If you remove the inline style, you can use bg-top directly as a Tailwind class. */
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blinkArrow {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(10px); }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 1.5s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0; /* Start hidden */
        }
        .animate-blink-arrow {
          animation: blinkArrow 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
