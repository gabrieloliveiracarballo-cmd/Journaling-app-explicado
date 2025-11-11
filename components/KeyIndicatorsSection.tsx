
import React, { useState, useEffect, useRef } from 'react';

// === Icons ===
const HealthIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="m11.645 20.91-1.106-1.007C5.373 15.247 2.25 12.317 2.25 8.75 2.25 6.13 4.38 4 7 4c1.776 0 3.248.835 4.155 2.068A6.996 6.996 0 0 1 17 4c2.62 0 4.75 2.13 4.75 4.75 0 3.566-3.123 6.497-8.289 11.153L12 21.354l-.355-.317Z" />
    </svg>
);

const TargetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    points: { title: string; text: string }[];
    isVisible: boolean;
    delay: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, points, isVisible, delay }) => {
    const transitionStyle = {
        transitionDelay: `${delay}ms`
    };

    return (
        <div 
            style={transitionStyle}
            className={`bg-white/80 border border-slate-200/80 rounded-2xl p-6 flex flex-col gap-4 transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-sky-200 text-sky-600 rounded-lg">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {description}
          </p>
          <ul className="space-y-3 mt-2 list-none text-slate-600">
            {points.map((point, index) => (
                <li key={index} className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <div>
                        <span className="font-semibold text-slate-700">{point.title}:</span> {point.text}
                    </div>
                </li>
            ))}
          </ul>
        </div>
    );
};


const KeyIndicatorsSection: React.FC = () => {
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

    const healthPoints = [
        { title: "Sueño (2.5 pts)", text: "Se basa en el total de horas dormidas. El rango ideal es de 8 a 8.5 horas para la máxima puntuación." },
        { title: "Comidas (2.5 pts)", text: "Evalúa la calidad nutricional, premiando alimentos frescos y penalizando ultraprocesados." },
        { title: "Sentimiento (2.5 pts)", text: "Interpreta el estado anímico general descrito, desde positivo hasta negativo." },
        { title: "Deporte (2.5 pts)", text: "Puntúa según la duración y el tipo de ejercicio físico realizado durante el día." },
    ];

    const objectivePoints = [
        { title: "Salud (30%)", text: "Toma la 'Nota de Salud' final y la pondera como base del rendimiento diario." },
        { title: "Avance (40%)", text: "Mide el cumplimiento de mínimos diarios: 1h de proyectos, 1h de deporte, >15min social y <1h de móvil." },
        { title: "Productividad (30%)", text: "Combina la nota de productividad del usuario (20%) y su sentimiento laboral (10%)." },
    ];

    return (
        <section ref={sectionRef} id="key-indicators-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
                <h2 className={`text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Indicadores Clave
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                    <InfoCard 
                        icon={<HealthIcon className="w-7 h-7 text-red-500" />}
                        title="Nota de Salud"
                        description="Calculada sobre 10, esta nota evalúa el bienestar físico y mental diario sumando 4 áreas clave:"
                        points={healthPoints}
                        isVisible={isVisible}
                        delay={150}
                    />
                     <InfoCard 
                        icon={<TargetIcon className="w-7 h-7 text-blue-600" />}
                        title="Nota del Día Objetivo"
                        description="Calculada sobre 10, esta nota mide si el día estuvo alineado con los objetivos a largo plazo, ponderando 3 áreas:"
                        points={objectivePoints}
                        isVisible={isVisible}
                        delay={300}
                    />
                </div>
            </div>
        </section>
    );
};

export default KeyIndicatorsSection;
