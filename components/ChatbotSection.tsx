import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    time: string;
}

const ChatbotSection: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const endpoint = "https://n8n-n8n.owt5wb.easypanel.host/webhook/83ba4578-e981-4468-8bab-174c7e8f12c4";

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

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatParsedResponse = (parsed: any): string => {
        const parts: string[] = [];

        if (typeof parsed === 'object' && parsed !== null) {
            // OpenAI-like responses
            if (parsed.choices && Array.isArray(parsed.choices)) {
                for (const choice of parsed.choices) {
                    if (choice.message?.content) {
                        parts.push(choice.message.content);
                    } else if (choice.delta?.content) {
                        parts.push(choice.delta.content);
                    } else if (choice.text) {
                        parts.push(choice.text);
                    }
                }
            }

            if (parsed.reply) {
                parts.push(parsed.reply);
            }
            if (parsed.text) {
                parts.push(parsed.text);
            }
            if (parsed.output) {
                parts.push(parsed.output);
            }

            // Handle blocks
            if (parsed.blocks && Array.isArray(parsed.blocks)) {
                for (const block of parsed.blocks) {
                    const blockType = block.type;
                    const content = block.content;

                    if (blockType === 'paragraph') {
                        parts.push(content);
                    } else if (blockType === 'code') {
                        parts.push(`\`\`\`\n${content}\n\`\`\``);
                    } else if (blockType === 'list' && Array.isArray(content)) {
                        parts.push(content.map((item: any) => `• ${item}`).join('\n'));
                    }
                }
            }

            // Add remaining fields (excluding common/processed ones)
            for (const [key, value] of Object.entries(parsed)) {
                if (!['reply', 'text', 'blocks', 'choices', 'output', 'message'].includes(key)) {
                    try {
                        parts.push(`**${key}**: ${JSON.stringify(value, null, 2)}`);
                    } catch {
                        parts.push(`**${key}**: ${String(value)}`);
                    }
                }
            }
        } else if (Array.isArray(parsed)) {
            for (const item of parsed) {
                parts.push(JSON.stringify(item, null, 2));
            }
        } else {
            parts.push(String(parsed));
        }

        // Return only the first part if it exists (most natural response)
        return parts.length > 0 ? parts[0] : 'Sin respuesta';
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        const now = new Date().toLocaleString('es-ES');

        // Add user message
        setChatHistory((prev) => [
            ...prev,
            { role: 'user', content: input, time: now },
        ]);

        setInput('');
        setLoading(true);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: input }),
            });

            let assistantMessage = '';

            if (response.ok) {
                try {
                    const parsed = await response.json();
                    assistantMessage = formatParsedResponse(parsed);
                } catch {
                    const text = await response.text();
                    assistantMessage = text;
                }
            } else {
                assistantMessage = `Error ${response.status}: ${response.statusText}`;
            }

            setChatHistory((prev) => [
                ...prev,
                { role: 'assistant', content: assistantMessage, time: now },
            ]);
        } catch (error) {
            setChatHistory((prev) => [
                ...prev,
                { role: 'assistant', content: `Error de conexión: ${error}`, time: now },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section ref={sectionRef} id="chatbot-section" className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 w-full max-w-7xl mx-auto">
                <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Chatbot Inteligente
                </h2>
                <p className={`text-slate-600 text-center max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Un asistente para analizar mis datos.
                </p>

                {/* Introduction Section */}
                <div className={`mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Image Placeholder */}
                    <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 flex items-center justify-center bg-slate-100 min-h-64">
                        <img
                            src={`${import.meta.env.BASE_URL}images/chatbot.png`}
                            alt="Chatbot inteligente"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.style.display = 'none';
                                img.parentElement!.innerHTML = '<span className="text-slate-400 text-center">Añade tu imagen aquí</span>';
                            }}
                        />
                    </div>

                    {/* Text Box */}
                    <div className="bg-white/60 border border-slate-200/60 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Analiza tus datos en conversación</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            La aplicación también posee un agente inteligente que está conectado a mi base de datos a través de N8N. Es ideal para obtener información cómo:
                        </p>
                        <ul className="space-y-2 text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Patrones en mi gestión del tiempo</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Correlaciones entre alimentos y bienestar</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Eventos que más me aportan valor</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Análisis personalizados de mi rutina</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="flex flex-col gap-4">
                    {/* Chat Messages */}
                    <div className="flex-grow overflow-y-auto mb-4 bg-slate-50/50 rounded-xl p-4 border border-slate-200/50 min-h-96 max-h-96">
                        {chatHistory.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-slate-400">
                                <p>Inicia una conversación preguntando sobre tus datos...</p>
                            </div>
                        ) : (
                            chatHistory.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${msg.role === 'user'
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-slate-200 text-slate-800 rounded-bl-none'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                                        <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-slate-200 text-slate-800 px-4 py-3 rounded-lg rounded-bl-none">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu pregunta..."
                            className="flex-grow px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ChatbotSection;
