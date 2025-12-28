
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

const cardData = [
  {
    number: "1",
    title: "Aprender",
    description: "El objetivo con todo esto fue aprender a usar las herramientas involucradas, hacer un flujo complejo en N8N que fuera una especie de ETL, a la vez que nos muestra información."
  },
  {
    number: "2",
    title: "Controlar mi tiempo",
    description: "Tener un control del tiempo dedicado a cada cosa y hacer mi vida más organizada para alcanzar esa libertad de la que Aristóteles tanto hablaba."
  },
  {
    number: "3",
    title: "Avanzar en mi objetivo",
    description: "Tener una herramienta que me permita hacer un seguimiento de mis objetivos, ponerme metas semanales y motivarme día a día para conseguirlos."
  },
  {
    number: "4",
    title: "Evaluar rendimiento",
    description: "Crear métricas para evaluar mi rendimiento de manera objetiva y definir con inteligencia si mis acciones van encaminadas hacia mis objetivos o no."
  },
  {
    number: "5",
    title: "Patrones ocultos",
    description: "Hacer un estudio profundo y continuo para ver patrones ocultos, como qué comidas me sientan mal o qué hábitos me sientan bien, basándome en datos."
  },
  {
    number: "6",
    title: "Vibe Coding",
    description: "Empezar a hacer proyectos de código apoyados con la IA, juntando mi parte creativa con la técnica para poder crear cosas interesantes para mí y para los demás."
  }
];

const WhySection: React.FC = () => {
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
    <section ref={sectionRef} id="why-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Motivos técnicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {cardData.map((card, index) => (
            <Card
              key={card.number}
              number={card.number}
              title={card.title}
              description={card.description}
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
