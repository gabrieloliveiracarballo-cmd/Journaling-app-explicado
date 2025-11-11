import React, { useState, useEffect, useRef } from 'react';

interface ObjectiveCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    isVisible: boolean;
    delay: number;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ icon, title, description, isVisible, delay }) => {
    const transitionStyle = { transitionDelay: `${delay}ms` };
    return (
        <div
            style={transitionStyle}
            className={`bg-white/60 border border-slate-200/60 rounded-xl p-6 flex flex-col gap-4 transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-100 to-sky-200 text-blue-600 rounded-lg">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
        </div>
    );
};

const ObjectivesSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
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

    const objectives = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Gestión del tiempo",
            description: "Saber a qué dedicaba mi tiempo: cuánto dedicaba a mis metas y cuánto tiempo no aprovechaba realmente."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
            ),
            title: "Nutrición y bienestar",
            description: "Ver qué alimentos me sientan bien y cuáles me sientan mal, detectando patrones que mejoren mi salud."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Rutina perfecta",
            description: "Construir mi rutina ideal identificando los eventos que más me aportan y cuáles me aportan menos valor."
        }
    ];

    return (
        <section ref={sectionRef} id="objectives-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
                <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    ¿Qué buscaba conseguir con esta app?
                </h2>
                <p className={`text-slate-600 text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Los objetivos principales detrás de esta aplicación fueron crear herramientas para entender mis hábitos, optimizar mi tiempo y construir una vida más alineada con mis metas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {objectives.map((objective, index) => (
                        <ObjectiveCard
                            key={index}
                            {...objective}
                            isVisible={isVisible}
                            delay={index * 150 + 300}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ObjectivesSection;
