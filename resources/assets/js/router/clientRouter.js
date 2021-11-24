import Vue from 'vue';

import VueRouter from 'vue-router';

import routes from './clientRoutes';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({

  routes,
   // short for routes: routes

  linkActiveClass: '',
      
  linkExactActiveClass :'active',

  mode:'history',

  scrollBehavior: (to, from ,savedPosition) => {

    if (savedPosition) {

      return savedPosition;
    }

    if (to.hash) {

      return { selector: to.hash };
    }

    return { x: 0, y: 0 };
  }
});

export default router;
