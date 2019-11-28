import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import ContentCreateKnights from './components/ContentCreateKnights';
import ContentListKnights   from './components/ContentListKnights';
import ContentHallOfHeroes  from './components/ContentHallOfHeroes';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
    { path: '/create-knights'    , component: ContentCreateKnights },
    { path: '/get-knights'       , component: ContentListKnights },
    { path: '/get-hall-of-heroes', component: ContentHallOfHeroes }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
