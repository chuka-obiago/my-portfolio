import React, { useState, useRef, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiPython, SiReact, SiTensorflow, SiTableau, SiJavascript, SiMongodb } from 'react-icons/si';
import { FaBraille } from "react-icons/fa";
import SentimentImage from './assets/img/sentiment_analysis_thumbnail.png';
import PortfolioThumbnail from './assets/img/portfolio_thumbnail.png';
import ElearnMockup from './assets/img/elearn-mockup.png';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  live?: string;
  date: string;
  featured?: boolean;
}

const Project: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "ML/AI", "Web Development"];

  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "AI-Powered Customer Sentiment Analysis",
      description: "Machine Learning model utilizing BERT capable of aspect-based sentiment analysis with 93% accuracy, able to process thousands of customer feedback to uncover key trends and pain points, enabling better decision making.",
      image: SentimentImage,
      category: "ML/AI",
      technologies: [""],
      githubUrl: "#",
      liveUrl: "#",
      date: "ML/ AI",
      featured: true
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Modern portfolio built using React with a clean, modern UI and smooth navigation to showcase projects and skills while delivering a fast and engaging user experience. \n. \n.",
      image: PortfolioThumbnail,
      category: "Web Development",
      technologies: [""],
      // liveUrl: "#",
      live: "#",
      date: "Web Development"
    },
    {
      id: 3,
      title: "E-learning Platform",
      description: "React application offering streamlined interface with interactive course delivery to keep users engaged. Along with intuitive navigation  to reduce friction and improve overall learning experience \n. \n.",
      image: ElearnMockup,
      category: "Web Development",
      technologies: [""],
      githubUrl: "https://github.com/chuka-obiago/E-learning",
      liveUrl: "https://e-learning-sage-eight.vercel.app/",
      date: "Web Development"
    },
    
    // {
    //   id: 2,
    //   title: "E-commerce Dashboard",
    //   description: "Responsive web dashboard for e-commerce analytics with real-time data visualization and inventory management.",
    //   image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
    //   category: "Web Development",
    //   technologies: ["React", "JavaScript", "MongoDB", "Node.js"],
    //   githubUrl: "#",
    //   liveUrl: "#",
    //   date: "Web Development",
    //   featured: true
    // },
    // {
    //   id: 5,
    //   title: "Dashboard for Company",
    //   description: "Machine learning model to predict equipment failures before they occur, reducing downtime by 40%.",
    //   image: Dashboard1,
    //   category: "Data Analysis",
    //   technologies: ["Python", "Scikit-learn", "TensorFlow", "AWS"],
    //   githubUrl: "#",
    //   date: "Data Analysis",
    // },
    // {
    //   id: 6,
    //   title: "Financial Data Visualization",
    //   description: "Interactive dashboard analyzing stock market trends and financial metrics with advanced charting capabilities.",
    //   image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
    //   category: "Data Analysis",
    //   technologies: ["Python", "Plotly", "Pandas", "Yahoo Finance API"],
    //   githubUrl: "#",
    //   liveUrl: "#",
    //   date: "Data Analysis"
    // }
  ];

  // Technology icon
  const getTechIcon = (tech: string) => {
    const iconClass = "w-4 h-4";
    switch (tech.toLowerCase()) {
      case 'python': return <SiPython className={`${iconClass} text-blue-500`} />;
      case 'react': return <SiReact className={`${iconClass} text-blue-400`} />;
      case 'tensorflow': return <SiTensorflow className={`${iconClass} text-orange-600`} />;
      case 'tableau': return <SiTableau className={`${iconClass} text-blue-400`} />;
      case 'javascript': return <SiJavascript className={`${iconClass} text-yellow-500`} />;
      case 'mongodb': return <SiMongodb className={`${iconClass} text-green-600`} />;
      default: return null;
    }
  };

  // Filter projects based on active category
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${hasScrolledIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
            MY PROJECTS
          </h2>   
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my works in machine learning, AI, and web development.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ease-out transform ${hasScrolledIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md hover:cursor-pointer'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`break-inside-avoid bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${hasScrolledIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                  <FaBraille className="w-3 h-3" />
                  {project.date}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto ">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No projects found for "{activeFilter}" category.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;