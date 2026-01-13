# Journaling App

Una aplicación moderna de journaling con análisis de datos personales, gestión de objetivos y un chatbot inteligente.

## 📋 Stack Tecnológico

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: N8N (flujo automatizado)
- **Base de datos**: PostgreSQL
- **Hosting**: EasyPanel (Docker)

## 🛠️ Desarrollo local

Para ejecutar el proyecto localmente:

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## 📦 Build para producción

Para generar los archivos estáticos para producción:

```bash
npm run build
npm run preview
```

## 📝 Estructura del proyecto

```
./
├── components/       # Componentes React
├── App.tsx           # Componente principal
├── index.tsx         # Punto de entrada
├── index.css         # Estilos globales
└── public/           # Archivos estáticos y demos
```
