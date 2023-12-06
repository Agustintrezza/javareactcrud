import react from '@vitejs/plugin-react';
import postcss from 'postcss';

// https://vitejs.dev/config/
export default {
  plugins: [
    react(),
    postcss({
      plugins: [import('tailwindcss'), import('autoprefixer')],
      extract: 'styles.css',
    }),
  ],
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
};