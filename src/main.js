import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/reset.css'
import './assets/font/iconfont.css'




import TreeTable from "vue-table-with-tree-grid"


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component("tree-table", TreeTable)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
