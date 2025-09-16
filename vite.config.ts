import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/pages/mikesister.github.io/WorldMapper-SH-GlobalWorld/' : '/', // 仅生产环境添加 base
  // ...其他配置
}));