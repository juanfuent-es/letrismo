import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import RubyPlugin from 'vite-plugin-ruby'
import FullReload from "vite-plugin-full-reload"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    glsl(),
    RubyPlugin(),
    FullReload(["config/routes.rb", "app/views/**/**", "app/helpers/*.rb"], {
      delay: 200
    }),
    vue()
  ],
  build: {
    target: 'esnext',
    outDir: 'public',
  },
})