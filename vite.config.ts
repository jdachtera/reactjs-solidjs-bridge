import path from 'path'
import typescript from '@rollup/plugin-typescript'
import reactPlugin from '@vitejs/plugin-react'
import devtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

const resolvePath = (str: string) => path.resolve(__dirname, str)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactSolid',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'solid-js',
        'solid-js/web',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'solid-js': 'Solid',
          'solid-js/web': 'SolidWeb',
        },
      },
      plugins: [
        typescript({
          allowSyntheticDefaultImports: true,
          declaration: true,
          declarationDir: resolvePath('./dist'),
          exclude: resolvePath('./node_modules/**'),
          rootDir: resolvePath('./src'),
          target: 'es2020',
        }),
      ],
    },
    target: 'ESNext',
  },
  define: {
    global: {},
  },

  plugins: [
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }),
    solidPlugin({ include: /\/src\/solid/, ssr: true }),
    reactPlugin({ include: /\/src\/react/ }),
  ],
})
