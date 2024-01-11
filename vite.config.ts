import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import compression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const proxyApi = env.VITE_APP_PROXY_API
  const proxyUrl = env.VITE_APP_PROXY_URL
  const proxy = {}

  if (!!proxyApi && !!proxyUrl) {
    proxyApi?.split(';')?.forEach((api: string, index: number) => {
      proxy[api] = {
        target: proxyUrl?.includes(';')
          ? proxyUrl?.split(';')?.[index]
          : proxyUrl,
        ws: true,
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(RegExp(`/^/${api}/`), ''),
      }
    })
  }

  return {
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            const info = assetInfo.name.split('.')
            let extType = info[info.length - 1]

            if (
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
            ) {
              extType = 'media'
            }
            if (/\.(png|jpe?g|gif|svg|webp)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img'
            }
            if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts'
            }

            return `${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(resolve(), './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      host: '0.0.0.0',
      proxy,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/scss/base.scss";',
        },
      },
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    plugins: [
      svgr(),
      compression(),
      react(),
      createHtmlPlugin({
        inject: { data: { APP_TITLE: env.VITE_APP_TITLE } },
      }),
      visualizer({ filename: './analyze/analyze.html', gzipSize: true }),
    ],
  }
})
