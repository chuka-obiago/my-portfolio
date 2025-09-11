import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const parallaxTestimonials: {
  column1: Testimonial[];
  column2: Testimonial[];
  column3: Testimonial[];
} = {
  column1: [
    {
      quote:
        "The AI-powered analytics transformed our business operations completely. We saw a 300% increase in efficiency within the first quarter.",
      name: "Sarah Chen",
      title: "CTO, TechFlow Solutions",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "Outstanding data pipeline automation that saved us countless hours. The implementation was seamless and the results were immediate.",
      name: "Marcus Rodriguez",
      title: "Data Director, InnovateCorp",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "Revolutionary approach to machine learning deployment. Their expertise in scaling AI solutions is unmatched in the industry.",
      name: "Emily Watson",
      title: "VP of Engineering, DataDriven",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    },
  ],
  column2: [
    {
      quote:
        "2025 has been our best year yet thanks to their predictive analytics platform. ROI exceeded all expectations.",
      name: "David Kim",
      title: "CEO, FutureScale",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "The automated pipeline reduced our processing time from days to hours. Game-changing technology for our workflow.",
      name: "Lisa Thompson",
      title: "Operations Manager, StreamlineAI",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "Incredible automation capabilities that freed up our team to focus on strategic initiatives rather than manual processes.",
      name: "Alex Foster",
      title: "Head of Analytics, NextGen",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    },
  ],
  column3: [
    {
      quote:
        "Cutting-edge technology stack that delivered results beyond our wildest expectations. Highly recommend their services.",
      name: "Robert Chang",
      title: "Founder, InnovateHub",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "The level of customization and attention to detail in their AI solutions is remarkable. Truly next-generation technology.",
      name: "Amanda Peterson",
      title: "CTO, TechVanguard",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "Seamless integration and outstanding support throughout the entire implementation process. Exceeded all expectations.",
      name: "Michael Torres",
      title: "Director of Innovation, SmartSystems",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    },
  ],
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 h-80 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between">
    <div>
      <svg
        className="w-8 h-8 text-white/60 mb-3"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
      </svg>
      <p className="text-white/90 text-sm md:text-base leading-relaxed italic">
        "{testimonial.quote}"
      </p>
    </div>
    <div className="flex items-center gap-3 mt-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
      />
      <div>
        <h4 className="text-white font-semibold text-sm md:text-base">
          {testimonial.name}
        </h4>
        <p className="text-white/70 text-xs md:text-sm">{testimonial.title}</p>
      </div>
    </div>
  </div>
);

const ParallaxTestimonials: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const componentTop = parallaxRef.current.offsetTop;
        const scrollPosition = window.scrollY;
        const relativeScrollY = scrollPosition - componentTop;
        setScrollY(relativeScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Different parallax speeds
  const leftFactor = 0.15;
  const middleFactor = -0.2;
  const rightFactor = 0.25;

  return (
    <section
      ref={parallaxRef}
      className="relative h-[70vh] md:h-[100vh] bg-gradient-to-br from-[#7F797D] via-[#6B6568] to-[#5A4F54] overflow-hidden"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* This is the key change for responsive layout */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 px-2 sm:px-4 lg:px-8">
        {/* Left Column */}
        <div
          className="flex flex-col gap-6"
          style={{
            transform: `translateY(calc(+02% + ${scrollY * leftFactor}px))`,
          }}
        >
          {parallaxTestimonials.column1.map((testimonial, idx) => (
            <TestimonialCard key={`c1-${idx}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Middle Column */}
        <div
          className="flex flex-col gap-6"
          style={{
            transform: `translateY(calc(-10% + ${scrollY * middleFactor}px))`,
          }}
        >
          {parallaxTestimonials.column2.map((testimonial, idx) => (
            <TestimonialCard key={`c2-${idx}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Right Column */}
        <div
          className="flex flex-col gap-6"
          style={{
            transform: `translateY(calc(+05% + ${scrollY * rightFactor}px))`,
          }}
        >
          {parallaxTestimonials.column3.map((testimonial, idx) => (
            <TestimonialCard key={`c3-${idx}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxTestimonials;
