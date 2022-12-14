// import * as Vue from 'vue'
// import App from './App.vue'
// const app = Vue.createApp(App)
// app.mount('#app')
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'
const app = createApp(App)
app.mount('#app')