let bootstrap = require('bootstrap');

import 'es6-promise/auto';

import {store} from 'store'

Vue.component('locations-index', require('faveoLocation/components/LocationsIndex'));

Vue.component('location-create-edit', require('faveoLocation/components/LocationCreateEdit'));

store.dispatch('deleteUser');

store.dispatch('updateUser');

const app = new Vue({
    el: '#app-location',
    store: store,
});
