
export default function Orb() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full flex items-center justify-center
                      bg-gradient-to-br from-gray-600 to-indigo-700
                      shadow-2xl overflow-hidden 
                      transition-all duration-500 ease-in-out
                      group animate-orb-pulse">

        {/* Inner Glow Effect */}
        <div className="absolute inset-0 rounded-full
                        bg-[#d9d7cb] bg-opacity-10 backdrop-blur-sm
                        transition-all duration-500 ease-in-out
                        group-hover:scale-110 group-hover:bg-opacity-20
                        animate-orb-glow"></div>

        {/* Central visual element (optional, can be an icon or just a highlight) */}
        <div className="relative z-10 w-1/3 h-1/3 rounded-full bg-[#d9d7cb] bg-opacity-20
                        flex items-center justify-center text-center text-white text-3xl font-bold
                        transition-all duration-500 ease-in-out
                        group-hover:scale-110 group-hover:bg-opacity-30">
          C.O.
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(199, 182, 226, 0.7); } /* purple-600 */
          50% { transform: scale(1.03); box-shadow: 0 0 50px rgba(52, 52, 56, 0.9); } /* indigo-700 */
        }

        @keyframes orbGlow {
          0%, 100% { filter: blur(5px); }
          50% { filter: blur(10px); }
        }

        .animate-orb-pulse {
          animation: orbPulse 4s infinite ease-in-out;
        }

        .animate-orb-glow {
          animation: orbGlow 3s infinite alternate ease-in-out;
        }

        /* Hover state modifications */
        .group:hover .animate-orb-pulse {
          animation-play-state: paused; /* Pause base pulse */
          transform: scale(1.05); /* Slightly larger on hover */
          box-shadow: 0 0 60px rgba(167, 139, 250, 1), 0 0 20px rgba(255, 255, 255, 0.5); /* Stronger glow */
        }
      `}</style>
    </div>
  );
}
