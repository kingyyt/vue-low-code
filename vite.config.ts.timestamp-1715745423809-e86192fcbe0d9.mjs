// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/dev/vue/vue-low-code/node_modules/.pnpm/vite@5.2.7_@types+node@20.11.30_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/dev/vue/vue-low-code/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.7_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/dev/vue/vue-low-code/node_modules/.pnpm/unplugin-auto-import@0.17.5/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/dev/vue/vue-low-code/node_modules/.pnpm/unplugin-vue-components@0.27.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///D:/dev/vue/vue-low-code/node_modules/.pnpm/@vant+auto-import-resolver@1.1.0/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/dev/vue/vue-low-code/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/design/index.less";'
      }
    }
  },
  server: {
    // 配置前端服务地址和端口
    //服务器主机名
    host: "0.0.0.0",
    //端口号
    port: 8080,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open: false,
    //自定义代理规则
    proxy: {
      // 选项写法
      "^/api": {
        target: "https://127.0.0.1:8000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXZcXFxcdnVlXFxcXHZ1ZS1sb3ctY29kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZGV2XFxcXHZ1ZVxcXFx2dWUtbG93LWNvZGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Rldi92dWUvdnVlLWxvdy1jb2RlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSAnQHZhbnQvYXV0by1pbXBvcnQtcmVzb2x2ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXVxuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvZGVzaWduL2luZGV4Lmxlc3NcIjsnXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICAvLyBcdTkxNERcdTdGNkVcdTUyNERcdTdBRUZcdTY3MERcdTUyQTFcdTU3MzBcdTU3NDBcdTU0OENcdTdBRUZcdTUzRTNcbiAgICAvL1x1NjcwRFx1NTJBMVx1NTY2OFx1NEUzQlx1NjczQVx1NTQwRFxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAvL1x1N0FFRlx1NTNFM1x1NTNGN1xuICAgIHBvcnQ6IDgwODAsXG4gICAgLy9cdThCQkVcdTRFM0EgdHJ1ZSBcdTY1RjZcdTgyRTVcdTdBRUZcdTUzRTNcdTVERjJcdTg4QUJcdTUzNjBcdTc1MjhcdTUyMTlcdTRGMUFcdTc2RjRcdTYzQTVcdTkwMDBcdTUxRkFcdUZGMENcdTgwMENcdTRFMERcdTY2MkZcdTVDMURcdThCRDVcdTRFMEJcdTRFMDBcdTRFMkFcdTUzRUZcdTc1MjhcdTdBRUZcdTUzRTNcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcbiAgICAvL1x1NjcwRFx1NTJBMVx1NTY2OFx1NTQyRlx1NTJBOFx1NjVGNlx1ODFFQVx1NTJBOFx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUyRFx1NjI1M1x1NUYwMFx1NUU5NFx1NzUyOFx1N0EwQlx1NUU4RixcdTVGNTNcdTZCNjRcdTUwM0NcdTRFM0FcdTVCNTdcdTdCMjZcdTRFMzJcdTY1RjZcdUZGMENcdTRGMUFcdTg4QUJcdTc1MjhcdTRGNUMgVVJMIFx1NzY4NFx1OERFRlx1NUY4NFx1NTQwRFxuICAgIG9wZW46IGZhbHNlLFxuICAgIC8vXHU4MUVBXHU1QjlBXHU0RTQ5XHU0RUUzXHU3NDA2XHU4OUM0XHU1MjE5XG4gICAgcHJveHk6IHtcbiAgICAgIC8vIFx1OTAwOVx1OTg3OVx1NTE5OVx1NkNENVxuICAgICAgJ14vYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwczovLzEyNy4wLjAuMTo4MDAwLycsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1AsU0FBUyxlQUFlLFdBQVc7QUFFbFMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBTmdJLElBQU0sMkNBQTJDO0FBUzlNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxJQUM1QixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsSUFDNUIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQTtBQUFBLElBR04sTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLFlBQVk7QUFBQTtBQUFBLElBRVosTUFBTTtBQUFBO0FBQUEsSUFFTixPQUFPO0FBQUE7QUFBQSxNQUVMLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
