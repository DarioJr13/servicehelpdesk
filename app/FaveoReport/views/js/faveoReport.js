import Vue from "vue";

let bootstrap = require('bootstrap');

require('../css/reportCommon.css');

import 'es6-promise/auto';

import {store} from 'store';


import vSelect from 'vue-select';

Vue.component('v-select', vSelect);

// Adding chart js data label plugin
import ChartDataLabels from 'chartjs-plugin-datalabels';

import router from 'router/agentRouter';

import AgentLayout from 'components/Agent/AgentPanelLayout.vue';

//REPORT HOME
import ReportHomePage from 'faveoReport/components/ReportHomePage';

//REPORT ENTRY
import ReportEntryPage from 'faveoReport/components/ReportEntryPage';

//REPORT DOWNLOAD
import ReportDownload from 'components/Agent/Report/Exports.vue';

//REPORT SETTINGS
import ReportSettings from 'faveoReport/components/ReportSettings.vue';

router.addRoutes([
      {
            path: '/reports',

            component: AgentLayout,
            
            name: 'Helpdesk Reports',
            
            redirect : '/reports/get',
            
            children : [
            	{

            		path: 'get',
	            	
                    component: ReportHomePage,
	            	
                    name: 'Reports Index',
            	   
                    meta: { title : 'helpdesk_reports', crumb : { active : 'helpdesk_reports' } }
                },

            	{

            		path: ':type/:id',
	            	
                    component: ReportEntryPage,
	            	
                    name: 'Reports Entry',
            	   
                    meta: { title : 'from_report', crumb : { link: { name : 'helpdesk_reports', to : '/reports/get' }, active : 'from_report' } }
                },

                {

                    path: 'activity-download',
                    
                    component: ReportDownload,
                    
                    name: 'Reports Download',
                    
                    meta: { title : 'activity-download', crumb : { active : 'activity-download' } }
                },

                {

                    path: 'settings',
                    
                    component: ReportSettings,
                    
                    name: 'Reports Settings',
                    
                    meta: { title : 'report-settings', crumb : { active : 'report-settings' } }
                },
            ]
      }
]);

const app = new Vue({
    el: '#faveo-report',
    store: store,
    router: router
});
