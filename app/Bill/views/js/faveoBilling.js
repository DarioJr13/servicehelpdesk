let bootstrap = require('bootstrap');

import 'es6-promise/auto';

import {store} from 'store'

import router from 'router/agentRouter';

import AgentLayout from 'components/Agent/AgentPanelLayout.vue';

//PACKAGE INVOICE
import PackageInvoice from 'faveoBilling/components/Package/Agent/PackageInvoice';

//BILLING INVOICES
import BillingInvoice from 'faveoBilling/components/Billing/Invoices';

router.addRoutes([
    {
        
        path: '/bill',
        
        component: AgentLayout,
        
        name: 'Packages',
        
        redirect : '/bill/package/:id/user-invoice',
        
        children : [
            
            {
            		
                path: 'package/:id/user-invoice',
	            	
                component: PackageInvoice,
	            	
                name: 'Package Invoice',

                meta : { title : 'user_invoice', crumb : { active : 'user_invoice'}}
            }
        ]
    },

    {
        
        path: '/billing',
        
        component: AgentLayout,
        
        name: 'Invoices',
        
        redirect : '/billing/invoices',
        
        children : [
            
            {
                    
                path: 'invoices',
                    
                component: BillingInvoice,
                    
                name: 'Billing Invoice',

                meta : { title : 'invoices', crumb : { active : 'invoices'}}
            }
        ]
    }
]);

bootstrap.injectComponentIntoView('billing-packages', require('faveoBilling/components/Package/Agent/BillingPackages'),'user-page-mounted','user-page-table');

bootstrap.injectComponentIntoView('pending-invoices', require('faveoBilling/components/Billing/PendingInvoices'),'navbar-mounted','nav-id');

Vue.component('package-index', require('faveoBilling/components/Package/PackageIndex'));

Vue.component('package', require('faveoBilling/components/Package/Package'));

Vue.component('payment', require('faveoBilling/components/Payment/Payment'));

Vue.component('payment-index', require('faveoBilling/components/Payment/PaymentIndex'));

Vue.component('billing-packages', require('faveoBilling/components/Package/Agent/BillingPackages'));

Vue.component('order-details', require('faveoBilling/components/Package/Agent/OrderDetails'));

Vue.component('bill-options', require('faveoBilling/components/Billing/BillOptions'));

store.dispatch('deleteUser');
store.dispatch('updateUser');

const app = new Vue({
    el: '#app-billing',
    store: store,
});
