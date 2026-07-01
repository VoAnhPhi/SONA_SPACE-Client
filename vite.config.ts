import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (
            id.includes('react-dom') ||
            id.includes('react/jsx-runtime') ||
            id.includes('/react/') ||
            id.includes('scheduler') ||
            id.includes('react-router-dom')
          ) {
            return 'react-vendor'
          }

          if (
            id.includes('@ant-design/icons') ||
            id.includes('@ant-design/icons-svg')
          ) {
            return 'antd-icons'
          }

          if (
            id.includes('rc-field-form') ||
            id.includes('async-validator') ||
            id.includes('rc-input') ||
            id.includes('rc-textarea')
          ) {
            return 'antd-forms'
          }

          if (
            id.includes('rc-dialog') ||
            id.includes('rc-drawer') ||
            id.includes('@rc-component/portal') ||
            id.includes('rc-motion') ||
            id.includes('@rc-component/trigger')
          ) {
            return 'antd-dialog'
          }

          if (
            id.includes('rc-upload') ||
            id.includes('rc-image') ||
            id.includes('@rc-component/mutate-observer')
          ) {
            return 'antd-media'
          }

          if (
            id.includes('antd') ||
            id.includes('@ant-design') ||
            id.includes('@rc-component') ||
            id.includes('/rc-') ||
            id.includes('dayjs')
          ) {
            return 'antd'
          }

          if (id.includes('swiper')) {
            return 'swiper'
          }

          if (id.includes('react-toastify')) {
            return 'feedback'
          }

          if (
            id.includes('axios') ||
            id.includes('socket.io-client') ||
            id.includes('@react-oauth/google') ||
            id.includes('google-auth-library')
          ) {
            return 'services'
          }

          if (
            id.includes('react-markdown') ||
            id.includes('remark-gfm') ||
            id.includes('dompurify') ||
            id.includes('he')
          ) {
            return 'content'
          }

          return 'vendor'
        },
      },
    },
  },
})
