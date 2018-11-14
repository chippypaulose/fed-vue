import Vue from 'vue';
import App from './App.vue';
import json from './data.json';
Vue.config.productionTip = false;


var vm = new Vue({

  render: h => h(App),
  
  
}).$mount('#app');