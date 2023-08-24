import './assets/main.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })


import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
  

import {initializeApp} from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyA_40gZMh6Y2_mZMPq4S9jCy0ICIwVtEY4",
    authDomain: "mess-sheet-df9b4.firebaseapp.com",
    projectId: "mess-sheet-df9b4",
    storageBucket: "mess-sheet-df9b4.appspot.com",
    messagingSenderId: "545458539151",
    appId: "1:545458539151:web:7cd5c2e704a30d3ff3fefa",
    measurementId: "G-JBHK05LKRP"
  };

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(ToastPlugin);
app.mount('#app')
