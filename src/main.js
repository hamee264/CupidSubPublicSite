import { createApp } from "vue";

import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";

import { useAuthStore } from "./stores/authStore";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.use(router);

/*
 * Initialize Supabase authentication
 * before mounting the application.
 */

const auth = useAuthStore();

await auth.initialize();

app.mount("#app");
