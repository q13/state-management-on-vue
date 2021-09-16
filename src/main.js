/**
 * entry
 */
import { createApp } from 'vue';
import useState from './boost/use-state-plugin';
import App from './App.vue';

const app = createApp(App);
app.use(useState);
app.mount('#app');
