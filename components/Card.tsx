
import React from 'react';

interface CardProps {
  number: string;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}

const Card: React.FC<CardProps> = ({ number, title, description, isVisible, delay }) => {
  const transitionStyle = {
    transitionDelay: `${delay}ms`
  };

  return (
    <div 
        style={transitionStyle}
        className={`bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col gap-4 transform hover:scale-[1.03] hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-sky-100 text-sky-600 font-bold text-2xl rounded-lg">
          {number}
        </div>
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Card;