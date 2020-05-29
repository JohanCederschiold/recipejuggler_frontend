import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1iD57DdeUDGzJmE1amFh-tqMMslji2d4",
  authDomain: "recipe-juggler.firebaseapp.com",
  databaseURL: "https://recipe-juggler.firebaseio.com",
  projectId: "recipe-juggler",
  storageBucket: "recipe-juggler.appspot.com",
  messagingSenderId: "20368407184",
  appId: "1:20368407184:web:1a03f64f217251cbfc7615"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  console.log(store === undefined)
  if (user) {
    console.log('Logged in')
    store.commit('setUser', user.uid)
  } else {
    store.commit('setUser', null)
    console.log('Not logged in')
  }
});



Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
