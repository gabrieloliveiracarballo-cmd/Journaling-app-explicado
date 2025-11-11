Carpeta de imágenes

Esta carpeta (`public/images`) contiene imágenes estáticas que se sirven directamente desde la raíz del servidor de desarrollo/producción.

Cómo usar estas imágenes en el frontend

1) Usar imágenes desde `public` (recomendado para imágenes estáticas que no necesitan procesamiento):

- Coloca tu archivo, por ejemplo `public/images/mi-foto.png`.
- En HTML o JSX usa la ruta raíz:

  - HTML: <img src="/images/mi-foto.png" alt="Mi foto" />
  - React JSX: <img src="/images/mi-foto.png" alt="Mi foto" />
  - CSS: background-image: url('/images/mi-foto.png');

Ventajas: sencillo, la ruta es fija (/images/...), Vite no procesa el archivo y se sirve tal cual.

2) Alternativa: importar imágenes desde el código fuente (`src`) (útil si quieres que Vite gestione optimizaciones y hashes):

- Crea una carpeta `src/assets/images` y añade la imagen allí.
- Importa la imagen desde un componente React:

  import foto from '../assets/images/mi-foto.png';
  // y en JSX
  <img src={foto} alt="Mi foto procesada por Vite" />

- O usa `new URL`:

  const fotoUrl = new URL('../assets/images/mi-foto.png', import.meta.url).href;
  <img src={fotoUrl} alt="..." />

Ventajas: Vite puede optimizar, añadir hashes en build y permitir importaciones tipo módulos.

Comandos rápidos para arrancar la aplicación (desde la raíz del proyecto):

1) Instalar dependencias (si no lo hiciste aun):

  npm install

2) Arrancar servidor de desarrollo:

  npm run dev

3) Construir para producción:

  npm run build

4) Probar build localmente:

  npm run preview

Notas:
- Usando `public/images` la URL pública será `/images/<nombre>`.
- Si usas `src/assets/images`, importala con una ruta relativa desde el componente o usando `new URL(...)`.
- Tu proyecto ya tiene Vite configurado; el script de desarrollo es `npm run dev` (usa Vite en `package.json`).
