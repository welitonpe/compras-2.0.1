import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { UserConfigExport } from "vitest/config";

export default defineConfig({
	build: { assetsDir: "static", outDir: "build" }, generate: {
		dir: 'public'
	  },
	plugins: [react()],
	server: {
		port: 3000,
	},
	test: {
		coverage: {
			all: true,
			include: [path.resolve(__dirname), "src"],
		},
		environment: "jsdom",
		exclude: ["node_modules", "build"],
		globals: true,
		include: ["**/(*.)?{test,spec}.{ts,tsx}"],
		setupFiles: ["./src/setupTests.ts"],
	},
} as UserConfigExport);
