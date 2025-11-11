
import React, { useState, useEffect, useRef } from 'react';

// === Icons ===
const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>
);
const PlateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
);
const FocusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
);
const BuildingOfficeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18h16.5M5.25 3v18m13.5-18v18M9 6.75h6.75M9 11.25h6.75M9 15.75h6.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
);
const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>
);

const explanationCardData = [
    { icon: <ClipboardIcon className="w-8 h-8" />, title: "Datos Fundamentales", description: "Fecha, horas de sueño, sensación general y clima. La base para entender el contexto de cada día." },
    { icon: <PlateIcon className="w-8 h-8" />, title: "Nutrición y Bienestar", description: "Registro de comidas y cómo sientan. Clave para detectar patrones entre alimentación y estado de ánimo." },
    { icon: <FocusIcon className="w-8 h-8" />, title: "Enfoque y Finanzas", description: "Control del tiempo en pantalla y gastos. Permite vigilar distracciones y mantener una salud financiera." },
    { icon: <BuildingOfficeIcon className="w-8 h-8" />, title: "Rendimiento Laboral", description: "Seguimiento de la jornada laboral y la productividad para optimizar el rendimiento profesional." },
    { icon: <BrainIcon className="w-8 h-8" />, title: "Crecimiento Personal", description: "Reflexiones sobre gratitud, aprendizajes y planificación. El motor para el desarrollo continuo." },
];

interface ExplanationCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    isVisible: boolean;
    delay: number;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ icon, title, description, isVisible, delay }) => {
    const transitionStyle = { transitionDelay: `${delay}ms` };
    return (
        <div style={transitionStyle} className={`bg-white/60 border border-slate-200/60 rounded-xl p-6 flex flex-col gap-4 transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 text-blue-600 rounded-lg">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
        </div>
    );
};


const MethodSection: React.FC = () => {
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

    return (
        <section ref={sectionRef} id="method-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
                <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Método de Introducción
                </h2>
                <p className={`text-slate-600 text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    La recopilación de datos se realiza a través de un formulario exhaustivo que alimenta un proceso de normalización y análisis para generar las métricas del dashboard.
                </p>

                <div className="flex flex-col items-center gap-8 mb-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {explanationCardData.slice(0, 3).map((card, index) => (
                            <ExplanationCard key={index} {...card} isVisible={isVisible} delay={index * 150 + 300} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full lg:max-w-4xl">
                        {explanationCardData.slice(3, 5).map((card, index) => (
                            <ExplanationCard key={index} {...card} isVisible={isVisible} delay={(index + 3) * 150 + 300} />
                        ))}
                    </div>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 w-full transition-all duration-1000 delay-[900ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Formulario de Entrada</h3>
                        <p className="text-slate-600 mb-4">Un formulario dinámico y fácil de usar para registrar los datos diarios de forma estructurada.</p>
                        <div className="flex-grow rounded-2xl overflow-hidden shadow-lg border-4 border-white/50">
                            <iframe src="/form.html" className="w-full h-[600px] border-0" title="Formulario de Journaling"></iframe>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Dashboard de Visualización</h3>
                        <p className="text-slate-600 mb-4">Los datos procesados se presentan en un panel de control interactivo para un análisis claro y rápido.</p>
                        <div className="flex-grow rounded-2xl overflow-hidden shadow-lg border-4 border-white/50">
                            <iframe src="/dashboard.html" className="w-full h-[600px] border-0" title="Dashboard de Progreso"></iframe>
                        </div>
                    </div>
                </div>

                <div className={`mt-20 transition-all duration-1000 delay-[1100ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h3 className="text-3xl font-bold text-slate-800 mb-4 text-center">Recordatorios y Mensajes</h3>
                    <p className="text-slate-600 text-center max-w-3xl mx-auto mb-12">
                        Espacios dedicados para visualizar mensajes motivadores o recordatorios importantes generados por la aplicación.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mx-auto">
                        <div className="rounded-2xl overflow-hidden border-2 border-slate-300/80 transform hover:scale-105 hover:border-blue-300 transition-all duration-300 shadow-md flex items-center justify-center bg-slate-900">
                            <img src="/images/buenosdias.png" alt="Recordatorio diario" className="w-full h-auto object-contain" />
                        </div>
                        <div className="rounded-2xl overflow-hidden border-2 border-slate-300/80 transform hover:scale-105 hover:border-blue-300 transition-all duration-300 shadow-md flex items-center justify-center bg-slate-900">
                            <img src="/images/journaling-recordatorio.png" alt="Mensaje motivador" className="w-full h-auto object-contain" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MethodSection;
