import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

type processEnvType = { [key: string]: string };

const cherryPickedKeys = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "RESEND_KEY",
];

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv: processEnvType = {};
  cherryPickedKeys.forEach((key: string) => (processEnv[key] = env[key]));

  return defineConfig({
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [vue()],
    define: {
      "process.env": processEnv,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: process.env.PORT as unknown as number,
    },
  });
};
