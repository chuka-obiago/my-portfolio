import { useEffect, useRef, useState } from "react";
// import AboutImage from "./assets/img/orb.png"
import Orb from "./components/Orb"

// const aboutImgPlaceholder = AboutImage;

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center p-8 md:p-20 text-gray-900 transition-all duration-1000 ease-out
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left - Image */}
        <div className="flex justify-center transition-all duration-1500 ease-out" >
          {/* <img
            src={aboutImgPlaceholder}
            alt="About Me"
            className={`rounded-3xl  object-cover w-full h-auto max-w-sm md:max-w-md lg:max-w-lg transition-all duration-1000 ease-out
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            style={{ aspectRatio: "1/1" }}
          /> */}
          <Orb />
        </div>

        {/* Right - Text */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2
            className={`text-5xl md:text-6xl text-center font-extrabold mb-6 transition-all duration-1500 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            About Me
          </h2>
          <div
            className={`bg-[#e1e0d7] backdrop-blur-sm p-8 rounded-2xl shadow-l transition-all duration-1500 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-lg md:text-2xl leading-relaxed mb-4">
              I help businesses leverage machine learning models, uncover data-driven insights, and create responsive websites using modern web technologies. By combining advanced analytics, predictive modeling, AI and intuitive design, I deliver solutions that drive real impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
