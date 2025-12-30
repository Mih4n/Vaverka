import "./assets/styles/main.less"

import App from "./App.vue";
import PrimeVue from 'primevue/config'
import { createApp } from "vue";
import { createPinia } from "pinia";

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue)
app.mount("#app");
