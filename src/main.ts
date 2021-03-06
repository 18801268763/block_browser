declare var require: any;
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios"
const  crypto = require("irisnet-crypto");
Vue.use(BootstrapVue);
//
Vue.prototype.$http_u = 'http://47.90.203.219:8080';
// Vue.prototype.$http_u = '/api'
// Vue.prototype.$http_u = 'https://testnet.irisplorer.cn'
//
Vue.prototype.$Crypto = crypto;
Vue.config.productionTip = false;
let faucet_url;
let fuxi;
axios.defaults.withCredentials = false;
axios.defaults.timeout = 300000000;
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

if(localStorage.getItem('Faucet_url') && localStorage.getItem('Faucet_url') !== "null"){
  faucet_url = localStorage.getItem('Faucet_url')
}else{
  faucet_url = ''
}

if(localStorage.getItem('Chain_id') && localStorage.getItem('Chain_id') !== "null"){
  fuxi = localStorage.getItem('Chain_id')
}else{
  fuxi = ''
}
Vue.prototype.faucet_url = faucet_url
Vue.prototype.fuxi = fuxi;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
