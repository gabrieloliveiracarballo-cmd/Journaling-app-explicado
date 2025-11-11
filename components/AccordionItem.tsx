import React, { useState } from 'react';

interface AccordionItemProps {
  imageUrl: string;
  title: string;
  content: string[];
  isVisible: boolean;
  delay: number;
}

const ChevronDown: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);


const AccordionItem: React.FC<AccordionItemProps> = ({ imageUrl, title, content, isVisible, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  const transitionStyle = {
    transitionDelay: `${delay}ms`
  };

  return (
    <div
      style={transitionStyle}
      className={`bg-white/80 border border-slate-200/80 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mr-4">
            <img src={imageUrl} alt={`${title} logo`} className="w-8 h-8 object-contain" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h3>
        </div>
        <ChevronDown className={`w-6 h-6 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
            <div className="p-5 pt-0 pl-20">
                 <ul className="space-y-2 list-disc list-inside text-slate-600 leading-relaxed">
                    {content.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;