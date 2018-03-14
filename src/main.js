import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/element-#bdd576/index.css';
import axios from 'axios';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios;
axios.defaults.withCredentials=true;
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
