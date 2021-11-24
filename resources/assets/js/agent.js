require('./bootstrap');

require('../css/dashboardCommon.css');

import 'es6-promise/auto';

import {store} from './../store/store'

import Vue from 'vue';

//INFINITE SCROLL
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading);

//LOADING
import VTooltip from 'v-tooltip'

Vue.use(VTooltip, {
  defaultBoundariesElement: 'window',
});

//RATING
import StarRating from 'vue-star-rating'

Vue.component('star-rating', StarRating);

//PAGINATION
Vue.use(require("vuejs-uib-pagination"));

Vue.component('agent-panel-renderer', require('components/Agent/AgentPanelRenderer'));

Vue.component('form-renderer', require('components/Common/Form/FormRenderer'));

// Recurring tickets
Vue.component('recurring-tickets-index', require('./components/Agent/Tools/Recurring/RecurringTicketsIndex.vue'));

// router setup
import router from 'router/agentRouter';

router.beforeEach((to, from, next) => {

  	if(sessionStorage.getItem('user_role') != 'user') {

    	next();

   } else {
   	let redirectTo = window.axios.defaults.baseURL;
   	/**
   	 * If route is "panel/thread/X" for a user with role user we pass controll to backend
   	 * so backend can handle it and redirect user to check tiket page
   	 * 
   	 * @todo Temporary redirection till users receive correct link for tickets in the mail
   	 */
   	if(to.fullPath.includes('/thread/')) {
   		redirectTo += to.fullPath;
   	}
   	window.location.href = redirectTo
   }
})

store.dispatch('setRatingTypes');

setTimeout(()=>{
	new Vue({
	  	el: '#app-agent',
	  	store: store,
	  	router
	});
},1000)

router.beforeEach((to, from, next) => {
    router.app.$Progress.start();
    next()
});

router.afterEach(() => {

  setTimeout(()=>{

    router.app.$Progress.finish();
  },1000)
});