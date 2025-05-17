import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    title: 'Rich Text Editing with Yjs and Quill',
  },
  output: {
    assetPrefix: '/2025-05-17-richtext-editing-with-yjs-and-quill/',
  },
  plugins: [pluginReact()],
})
