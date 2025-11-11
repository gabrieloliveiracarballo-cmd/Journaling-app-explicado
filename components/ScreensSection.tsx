import React, { useState, useEffect, useRef } from 'react';

interface ScreenCardProps {
    title: string;
    description: string;
    isVisible: boolean;
    delay: number;
}

const ScreenCard: React.FC<ScreenCardProps> = ({ title, description, isVisible, delay }) => {
    const transitionStyle = { transitionDelay: `${delay}ms` };

    return (
        <div
            style={transitionStyle}
            className={`bg-white/80 border border-slate-200/80 rounded-2xl p-6 flex flex-col gap-4 transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <h4 className="text-lg font-bold text-slate-800">{title}</h4>
            <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
        </div>
    );
};

const ScreensSection: React.FC = () => {
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

    const screenDetails = [
        {
            "image": "/images/indicadores-num-ja.png",
            "subtitle": "Medias numéricas y objetivos semanales",
            "details": [
                {
                    "title": "Medias de notas objetivas y salud",
                    "description": "Esta media me sirve para evaluar verdaderamente mi progreso y mi estado de salud. Al centrarse en notas objetivas, puedo obtener una visión clara y sin sesgos de mi desempeño a lo largo del tiempo."
                },
                {
                    "title": "Saldo real",
                    "description": "El hecho de hacer ciertas actividades hace que el sistema me dé un dinero ficticio. Ese dinero tiene un correspondiente en euros y es la cantidad de dinero que me puedo gastar en mi ocio. Como veis, estoy gastando más de lo que realmente genero. Es un indicador clave para darme cuenta de que tengo que trabajar más y gastar menos."
                },
                {
                    "title": "Objetivos semanales",
                    "description": "Me gusta ver la barra a tope de los objetivos completados. Pero como eso solo mide el porcentaje de avance semanal medio, el elemento gráfico justo al lado me hace esclarecer que, aunque he hecho de más en algunos objetivos, NO he llegado a los objetivos que me marqué en otras áreas."
                }
            ]
        },
        {
            "image": "/images/graficos-ja.png",
            "subtitle": "Gráficos de cumplimiento diario y productividad",
            "details": [
                {
                    "title": "Evolución notas objetivas y subjetivas",
                    "description": "Este gráfico busca demostrar la correlación entre la nota subjetiva (cómo me siento) y la nota objetiva (basada en datos). Permite visualizar cómo el avance en los objetivos personales impacta directamente en el estado de ánimo y la percepción de productividad a lo largo del tiempo."
                },
                {
                    "title": "Cumplimiento diario (Sí/No)",
                    "description": "Ofrece una vista rápida y binaria (cumplido/no cumplido) sobre si se han alcanzado los objetivos mínimos diarios en áreas clave como el deporte, los proyectos personales y la vida social. Es una herramienta para medir la constancia diaria de forma sencilla."
                },
                {
                    "title": "Ratio de productividad",
                    "description": "Mide el porcentaje del día que se dedica a actividades consideradas productivas (trabajar, estudiar, proyectos, etc.). Este indicador es fundamental para analizar la evolución de la dedicación y la constancia en las tareas que impulsan los objetivos a largo plazo."
                },
                {
                    "title": "Porcentaje cumplimiento diario (Minutos)",
                    "description": "Representa el tiempo total en minutos invertido en las diferentes actividades planificadas cada día. A diferencia del gráfico de 'Sí/No', este permite cuantificar el esfuerzo y analizar picos o valles de dedicación a lo largo de la semana."
                }
            ]
        },
        {
            "image": "/images/estados-animo.png",
            "subtitle": "Gráficos de seguimiento semanal",
            "details": [
                {
                    "title": "Distribución del tiempo",
                    "description": "Este gráfico es una herramienta fundamental para visualizar y organizar la distribución del tiempo a nivel semanal. Permite ajustar los porcentajes dedicados a cada actividad para alinear la vida diaria con los objetivos y prioridades personales, ofreciendo una visión clara de cómo se está viviendo."
                },
                {
                    "title": "Resumen estado de ánimo semanal",
                    "description": "Ofrece un panorama visual del estado emocional de la semana. Mediante colores agrupados por sensaciones similares, se puede interpretar rápidamente el bienestar general y evaluar si el progreso personal se está desarrollando de una manera sana y satisfactoria."
                },
                {
                    "title": "Top menciones semanales",
                    "description": "Basado en un registro de agradecimientos, este apartado cuantifica y destaca a las personas que más han aportado valor durante la semana. Es una herramienta diseñada para analizar, valorar y agradecer el impacto positivo del entorno social."
                },
                {
                    "title": "Valoración de comidas",
                    "description": "Permite analizar de un solo vistazo cómo sientan las diferentes comidas del día (desayuno, comida, cena). Es útil para identificar patrones, relacionar el bienestar con la dieta que se está siguiendo y tomar decisiones informadas sobre la alimentación."
                }
            ]
        }
    ];

    return (
        <section ref={sectionRef} id="screens-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
                <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Dashboard de seguimiento semanal y mensual
                </h2>
                <p className={`text-slate-600 text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Para poder ver cómo realmente va mi vida, tengo este dashboard (tanto a nivel semanal como a nivel mensual) para analizar mi desempeño. En este caso, se trata de un pequeño frontend en streamlit con llamadas SQL a mi base de datos PostgresSQL. Espero que os guste el desglose de cada gráfico.
                </p>

                {/* Repeat 3 Times: Screenshot + 4 Details */}
                {screenDetails.map((screen, screenIndex) => (
                    <div key={screenIndex} className="mb-16">
                        {/* Screenshot */}
                        <div className={`mb-8 rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                            style={{ transitionDelay: `${screenIndex * 300 + 300}ms` }}>
                            <div className="w-full bg-slate-100 flex items-center justify-center min-h-96">
                                <img
                                    src={screen.image}
                                    alt={screen.subtitle}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.style.display = 'none';
                                        img.parentElement!.innerHTML = '<span className="text-slate-400">Imagen no encontrada</span>';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Subtitle and Details */}
                        <h3 className={`text-2xl font-bold text-slate-800 mb-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${screenIndex * 300 + 400}ms` }}>
                            {screen.subtitle}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
                            {screen.details.map((detail, detailIndex) => (
                                <ScreenCard
                                    key={detailIndex}
                                    {...detail}
                                    isVisible={isVisible}
                                    delay={screenIndex * 300 + detailIndex * 150 + 500}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ScreensSection;
