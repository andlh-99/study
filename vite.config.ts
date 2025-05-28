import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // اجعل المسارات نسبية لجعل التطبيق يعمل من أي مكان
  build: {
    outDir: 'dist', // تأكد أن Vite يبني إلى مجلد dist
    emptyOutDir: true, // لحذف الملفات القديمة قبل البناء
  },
});
