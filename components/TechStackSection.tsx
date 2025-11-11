import React, { useState, useEffect, useRef } from 'react';
import AccordionItem from './AccordionItem';

const techData = [
  {
    // Cambia esta URL por la del logo de N8N que prefieras
    imageUrl: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/n8n-color.png",
    title: "N8N",
    content: [
      "Crear un flujo que actúe como un proceso ETL, transformando datos de un formulario para subirlos a la base de datos.",
      "Normalizar con IA datos de contactos, gastos, actividades y notas para un cálculo objetivo posterior.",
      "Demostrar la capacidad de construir flujos complejos y a gran escala.",
      "Generar un informe HTML diario al final del flujo como elemento motivador."
    ]
  },
  {
    // Cambia esta URL por la del logo de PostgreSQL que prefieras
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png",
    title: "PostgreSQL",
    content: [
      "Dominar las consultas SQL y las operaciones complejas de la base de datos.",
      "Diseñar y crear una estructura de base de datos robusta, útil y escalable.",
      "Trabajar en la arquitectura del backend directamente dentro de la base de datos.",
      "Aprender y familiarizarse a fondo con la herramienta para proyectos futuros."
    ]
  },
  {
    // Cambia esta URL por la del logo de Streamlit que prefieras
    imageUrl: "https://images.seeklogo.com/logo-png/44/1/streamlit-logo-png_seeklogo-441815.png",
    title: "Streamlit",
    content: [
      "Entender sus funcionalidades y el potencial de la herramienta.",
      "Comprobar lo que se puede lograr con pocas líneas de código para visualizaciones rápidas.",
      "Observar sus limitaciones para desarrollos complejos, entendiendo que otras herramientas pueden ser más adecuadas.",
    ]
  },
  {
    // Cambia esta URL por la del logo de EasyPanel o tu servidor que prefieras
    imageUrl: "https://www.letscloud.io/blog/wp-content/uploads/2025/09/easypanel-300x300.webp",
    title: "Easy Panel",
    content: [
      "Aprender a realizar despliegues de aplicaciones dentro de Easy Panel.",
      "Trabajar extensamente con el servidor y las conexiones entre este y la base de datos.",
      "Alojar PostgreSQL, pgAdmin, el formulario y la aplicación principal.",
      "Ganar experiencia práctica con Docker y los flujos de despliegue continuo."
    ]
  }
];

const TechStackSection: React.FC = () => {
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
    <section ref={sectionRef} id="tech-stack-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          El Stack Tecnológico
        </h2>
        <div className="flex flex-col gap-4">
          {techData.map((item, index) => (
            <AccordionItem
              key={item.title}
              imageUrl={item.imageUrl}
              title={item.title}
              content={item.content}
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;