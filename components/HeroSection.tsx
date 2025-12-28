
import React, { useState, useEffect } from 'react';

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="m11.645 20.91-1.106-1.007C5.373 15.247 2.25 12.317 2.25 8.75 2.25 6.13 4.38 4 7 4c1.776 0 3.248.835 4.155 2.068A6.996 6.996 0 0 1 17 4c2.62 0 4.75 2.13 4.75 4.75 0 3.566-3.123 6.497-8.289 11.153L12 21.354l-.355-.317Z" />
  </svg>
);


const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const transitionClass = (delay: string) => `transition-all duration-1000 ${delay} ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-90'}`;


  return (
    <section id="hero-section" className="h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="text-center">
        <h1 className={`text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 ${transitionClass('delay-0')}`}>
          Journaling App
        </h1>
        <p className={`mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto ${transitionClass('delay-200')}`}>
          La aplicación que Aristóteles tendría descargada en su teléfono.
        </p>
      </div>

      <div className={`mt-12 flex items-center justify-center gap-4 md:gap-8 relative ${transitionClass('delay-500')}`}>
        {/* Your Photo */}
        <div className="flex flex-col items-center gap-2">
          <span className={`font-bold text-slate-700 ${transitionClass('delay-1000')}`}>Yo</span>
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg shadow-blue-500/20 transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQFvO9yV8W7B6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732278953751?e=2147483647&v=beta&t=XkWrBv9gr817hWf2a89ZGCcduc5EHrDts6y-IQV1W2s"
                alt="Tu foto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Heart Icon */}
        <HeartIcon className={`w-12 h-12 md:w-16 md:h-16 text-red-500 animate-pulse ${transitionClass('delay-700')}`} />

        {/* Aristotle's Photo */}
        <div className="flex flex-col items-center gap-2">
          <span className={`font-bold text-slate-700 ${transitionClass('delay-1000')}`}>Aristóteles</span>
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg shadow-sky-500/20 transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg"
                alt="Estatua de Aristóteles"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce ${transitionClass('delay-1000')}`}
        onClick={() => {
          const nextSection = document.getElementById('objectives-section');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 text-slate-400 hover:text-blue-500 transition-colors duration-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
