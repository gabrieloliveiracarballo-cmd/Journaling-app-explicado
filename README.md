<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Journaling App - Explicado

Una aplicación moderna de journaling con análisis de datos personales, gestión de objetivos y un chatbot inteligente.

## 🚀 Despliegue en EasyPanel

### Requisitos previos
- Cuenta en [EasyPanel](https://easypanel.io)
- Repositorio GitHub con este código

### Pasos para desplegar

1. **Conectar repositorio GitHub a EasyPanel**
   - Ve a EasyPanel Dashboard
   - Crea un nuevo proyecto
   - Selecciona "GitHub" como origen
   - Autoriza acceso a tu repositorio

2. **Configurar la aplicación**
   - Nombre: `journaling-app`
   - Rama: `main` (o la que uses)
   - Dockerfile: Automáticamente detectado
   - Puerto: `80`

3. **Variables de entorno (si es necesario)**
   ```
   NODE_ENV=production
   ```

4. **Desplegar**
   - EasyPanel construirá la imagen Docker automáticamente
   - Se desplegará en tu dominio personalizado
   - Los cambios en `main` se desplegarán automáticamente

### Despliegue local con Docker

```bash
# Build
docker build -t journaling-app .

# Run
docker run -p 80:80 journaling-app

# O con docker-compose
docker-compose up
```

Accede a `http://localhost`

## 🛠️ Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`

## 📦 Build para producción

```bash
npm run build
npm run preview
```

## 📋 Stack Tecnológico

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: N8N (flujo automatizado)
- **Base de datos**: PostgreSQL
- **Hosting**: EasyPanel (Docker)

## 📝 Estructura del proyecto

```
src/
├── components/       # Componentes React
├── App.tsx          # Componente principal
└── index.css        # Estilos globales
public/
├── images/          # Imágenes estáticas
```

## 🔗 Recursos útiles

- [EasyPanel Docs](https://docs.easypanel.io)
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
