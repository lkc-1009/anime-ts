import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/dist/vite'
import Components from 'unplugin-vue-components/dist/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/dist/resolvers'
import { NaiveUiResolver } from 'unplugin-vue-components/dist/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver(), NaiveUiResolver()],
        })
    ],
})
