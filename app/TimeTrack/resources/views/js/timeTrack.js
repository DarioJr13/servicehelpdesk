let bootstrap = require('bootstrap');

import 'es6-promise/auto';

import {store} from 'store'

Vue.component('timetrack-settings', require('timeTrack/components/TimeTrackSettings'));
Vue.component('worktime-type-index', require('timeTrack/components/WorktimeTypeIndex'));
Vue.component('worktime-type-create-edit', require('timeTrack/components/WorktimeTypeCreateEdit'));

store.dispatch('deleteUser');

store.dispatch('updateUser');

const app = new Vue({
    el: '#app-timetrack',
    store: store,
});
