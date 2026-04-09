import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            MAIN_VITE_DEVICE_VIDEOS_PATH: JSON.stringify(env.MAIN_VITE_DEVICE_VIDEOS_PATH),
            MAIN_VITE_BACKUP_PATH: JSON.stringify(env.MAIN_VITE_BACKUP_PATH),
            MAIN_VITE_NV_PATH: JSON.stringify(env.MAIN_VITE_NV_PATH),
            NV_USER: JSON.stringify(env.NV_USER),
            NV_PASSWORD: JSON.stringify(env.NV_PASSWORD),
        },
    };
});
