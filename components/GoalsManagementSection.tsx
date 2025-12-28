import React, { useState, useEffect, useRef } from 'react';

const GoalsManagementSection: React.FC = () => {
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

    const goalsData = [
        {
            image: `${import.meta.env.BASE_URL}images/objetivos-grafico.png`,
            title: "Gráfico de seguimiento"
        },
        {
            image: `${import.meta.env.BASE_URL}images/avances-detalle.png`,
            title: "Desglose de los objetivos"
        },
        {
            image: `${import.meta.env.BASE_URL}images/intro-info.png`,
            title: "Formulario introducción objetivos"
        }
    ];

    return (
        <section ref={sectionRef} id="goals-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
                <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Gestión de Objetivos
                </h2>
                <p className={`text-slate-600 text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    En esta pantalla podrás definir y gestionar tus objetivos personales y profesionales, hacer un seguimiento detallado de tu progreso. Es una pantalla fundamental a principio de semana para establecer tus metas y revisar tu avance regularmente.
                </p>

                {/* Goals Cards - Repeat 2 Times */}
                {goalsData.map((goal, index) => (
                    <div key={index} className="mb-16">
                        {/* Large Image */}
                        <div
                            className={`mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                            style={{ transitionDelay: `${index * 300 + 300}ms` }}
                        >
                            <div className="w-full bg-slate-100 flex items-center justify-center">
                                <img
                                    src={goal.image}
                                    alt={goal.title}
                                    className="w-full h-auto object-contain"
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.style.display = 'none';
                                        img.parentElement!.innerHTML = '<span className="text-slate-400 p-8">Imagen no encontrada</span>';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Text Description */}
                        <div
                            className={`transition-all duration-1000 mb-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 300 + 400}ms` }}
                        >
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">{goal.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{goal.description}</p>
                        </div>

                        {/* Separator */}
                        {index < goalsData.length - 1 && (
                            <div className="my-6 border-t border-slate-200/50"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GoalsManagementSection;
