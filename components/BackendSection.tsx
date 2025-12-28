
import React, { useState, useEffect, useRef } from 'react';

// Data for the explanation cards
const flowParts = [
  {
    imageSrc: `${import.meta.env.BASE_URL}images/respuestas.png`,
    title: '1. Recepción y Ramificación',
    description: 'El flujo se inicia con un Webhook que captura los datos del formulario. Inmediatamente, el flujo se ramifica: los datos principales van a un proceso de análisis con IA, mientras que las entradas específicas como los \'contactos\' se tratan y almacenan por separado para mantener la integridad de la base de datos.'
  },
  {
    imageSrc: `${import.meta.env.BASE_URL}images/ia-flujo.png`,
    title: '2. Normalización con IA',
    description: 'Se utiliza GPT 5-mini para procesar el lenguaje natural. Transforma entradas de texto libre (como \'qué has hecho\' o \'agradecimientos\') en datos estructurados y medibles. Esto incluye categorizar actividades, extraer sentimientos y generar resúmenes, que luego se insertan en la base de datos.'
  },
  {
    imageSrc: `${import.meta.env.BASE_URL}images/postgres.png`,
    title: '3. Almacenamiento de Datos',
    description: 'Toda la información, tanto la original como la enriquecida por la IA, se almacena en una base de datos PostgreSQL. Se realizan múltiples inserciones en tablas específicas (actividades, comidas, sentimientos) para construir un registro histórico robusto y facilitar consultas complejas para el dashboard.'
  },
  {
    imageSrc: `${import.meta.env.BASE_URL}images/envio-info.png`,
    title: '4. Agregación y Notificaciones',
    description: 'Una vez que todos los datos han sido procesados y almacenados, el flujo los unifica en un nodo \'Merge\'. Finalmente, se genera un informe completo del día y se distribuye a través de varios canales, como email, Telegram o una petición HTTP, notificando al usuario que su entrada ha sido procesada.'
  }
];

interface FlowCardProps {
  imageSrc: string;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}

const FlowCard: React.FC<FlowCardProps> = ({ imageSrc, title, description, isVisible, delay }) => {
  const transitionStyle = { transitionDelay: `${delay}ms` };

  return (
    <div
      style={transitionStyle}
      className={`bg-white/80 border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="flex-shrink-0 w-full md:w-2/5 rounded-lg overflow-hidden border border-slate-200/80 shadow-md">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow">
        <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};


const BackendSection: React.FC = () => {
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
    <section ref={sectionRef} id="backend-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          El Backend: Flujo de N8N
        </h2>
        <p className={`text-slate-600 text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Este es el cerebro de la aplicación. Un flujo automatizado en N8N que recibe, procesa, enriquece con IA y almacena toda la información del journaling.
        </p>

        <div className={`mb-16 rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Use the public/ directory root: files in public/ are served at /<filename> */}
          <img src={`${import.meta.env.BASE_URL}images/flujo-n8n.png`} alt="Flujo completo de N8N" className="w-full h-full object-contain" />
        </div>

        <h3 className={`text-3xl font-bold text-slate-800 mb-8 text-center transition-all duration-1000 delay-[450ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Desglose del Flujo
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {flowParts.map((part, index) => (
            <FlowCard
              key={index}
              {...part}
              isVisible={isVisible}
              delay={index * 150 + 500}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackendSection;
