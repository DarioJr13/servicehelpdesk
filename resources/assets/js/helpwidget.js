require('./bootstrap');

import 'es6-promise/auto';

Vue.component('help-widget', require('components/HelpSection/HelpSection.vue'));

new Vue({
    el: '#help-widget',
});
