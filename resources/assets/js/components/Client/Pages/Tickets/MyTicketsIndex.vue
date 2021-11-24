<template>
	
	<div id="client-tickets-table" :class="{align1: lang_locale == 'ar'}">


		<meta-component :dynamic_title="trans('mytickets-title')"  :dynamic_description="trans('mytickets-description')" 
			:layout="layout" >
		  
		</meta-component>
		
		<alert componentName="dataTableModal"></alert>

		<div class="card">
			
			<div class="card-header">

				<h3 class="card-title"> {{trans('tickets')}} </h3>

				<div class="card-tools">

					<a class="btn btn-tool " href="javascript:;" @click = "toggleFilterView" v-tooltip="trans('filter')">
						
						<span class="fas fa-filter"></span>
					</a>
				</div>
			</div>
			
			<div class="card-body">
				
				<template v-if="hasDataPopulated">
					
					<div class="mb-3">
					
						<client-ticket-filter id="filter-box" v-if="isShowFilter" :metaData="filterOptions" :appliedFilters="appliedFilters"
							@selectedFilters="selectedFilters">
				  
						</client-ticket-filter>
					</div>

					<div class="nav-tabs-custom">
						
						<ul class="nav nav-tabs" :class="{tabs_align: lang_locale == 'ar'}">
					
							<li v-for="tab in filterList" class="nav-item">
								
								<a id="tickets_tab"  class="nav-link" :class="{ active: currentTabId === tab.id, float1: lang_locale === 'ar' }" 	
									href="javascript:;" data-toggle="tab" @click="tickets(tab)">
								
									<b>{{lang(tab.name)}}</b>
								</a>
							</li>

							<li :class="[(lang_locale === 'ar') ? 'mr-auto' : 'ml-auto']">
										
								<ticket-status v-if="tic_status == 1 && ticketId.length" :layout="layout" :updateStatus="updateStatus" :ticketIds="ticketId">
											
								</ticket-status>
							</li>
						</ul>

						<div class="tab-content">

							<div class="active tab-pane" id="activity">
									
								<div id="my_tic">
										
									<my-tickets-table :tickets="ticketsData" :apiUrl="apiUrl" :loggedInId="auth.user_data.id" 
										alert-component-name="dataTableModal" :layout="layout" :key="currentTabId">
								
									</my-tickets-table>
								</div>
							</div>			
						</div>
					</div>	
				</template>

				<div v-if="!hasDataPopulated || loading" class="row">

					<loader :color="layout.portal.client_header_color" :animation-duration="4000" :size="60"/>
				</div>
			</div>
		</div>

		<transition  name="modal">
				
			<change-status-modal v-if="showModal" :onClose="onClose" :showModal="showModal" :ticketIds="ticketId" 
				:status="change_status" :layout="layout">
							
			</change-status-modal>
		</transition>
	</div>
</template>

<script>
	
	import axios from 'axios'

	import  { getApiParamsFromArray } from 'helpers/extraLogics';

	export default {

		name : 'client-tickets-table',

		props : {

			layout : { type : Object, default : ()=>{}},

			auth : { type : Object, default : ()=>{}},

			from : { type : String, default : '' },

			orgId : { type : String | Number, default : '' },
		},

		data () {

			return {

				hasDataPopulated : false,

				loading : false,

				lang_locale : this.layout.language,

				tic_status : this.layout.user_set_ticket_status.status,

				change_status : '',

				showModal : false,

				isShowFilter : false,

				appliedFilters : {},

				filterOptions: [
				{
					section : [
						{ 
							name: 'ticket-ids',
					 		url: '/api/dependency/client-tickets',
					 		label: 'ticket_id-subject',
				  		},

				  		{ 
							name: 'owner-ids',
					 		url: '/api/dependency/client-requesters',
					 		label: 'requester',
				  		},

						{ 
							name: 'status-ids',
					 		url: this.from ? 'api/dependency/ticket-status-tabs?limit=all&supplements[]='+this.orgId : '/api/dependency/ticket-status-tabs',
					 		label: 'status',
				  		}
					]
				},
				{
					section : [
						{ 
							name: 'created-at',
							type: 'date',
							label: ['created_at', 'created_within_last'],
							timeOptions:{  start: '00:00', step: '00:30',  end: '23:30' },
							pickers : false,
							range : true
						},
					]
				}],

				filterList : [],

				currentTabId : '',

				ticketId:[],

				apiUrl : ''
			}
		},

		beforeMount () {

			this.getFilterTabs();

			this.filterData();
		},

		created() {

			window.eventHub.$on('updateFilter',this.updateFilter);
		},

		methods : {

			updateFilter(data) {

				this.filterOptions.map(function (obj) { 
				  
				  obj.section.map(function(row){

				  		if(data.name == row.name) {
				  			
				  			 row.value = data.value;
				  		}
				  })
				});
			},
			
			filterData(){

				let class_name =  this.from ? 'col-sm-6' : 'col-sm-4';

				this.filterOptions.map(function (obj) { 
			  
				  obj.section.map(function(row){

						row.elements = [];
				  		row.isMultiple = true;
				  		row.isPrepopulate = false;
				  		row.value = '';
				  		row.className = class_name;
				  	})
				});
			},

			selectedFilters(value){ 

				if(value === 'closeEvent') {

					this.resetFilter();

					return this.isShowFilter = false;
				}
				if(value === 'resetEvent') {
					
					return this.resetFilter();
				}
				
				return this.applyFilter(value) 
			},

			resetFilter(){

				this.apiUrl = '/api/client/ticket-list?filter_id='+this.currentTabId;
				
				let class_name =  this.from ? 'col-sm-6' : 'col-sm-4';

		  		this.filterOptions = this.filterOptions.map(function (obj) { 
				  
				  	obj.section.map(function(row){

						row.elements = [];
				  		row.isMultiple = true;
				  		row.isPrepopulate = false;
				  		row.value = '';
				  		row.className = class_name;
				  	})

				  return obj;
				});
			},

			applyFilter(value){

				console.log(value,'value')
				
				this.appliedFilters = value;
      		
      		let baseUrlForFilter = '/api/client/ticket-list?';
        
        		let params = getApiParamsFromArray(this.filterOptions,value);

        		if(params[params.length-1] === '&') {
         
          		params = params.slice(0, -1);
        		}

        		console.log(params,'params')
        
        		this.apiUrl = baseUrlForFilter + params;
        
        		this.isShowFilter = false;
      	},

			onClose(){
				
				this.showModal = false;
				
				this.$store.dispatch('unsetValidationError');
			},

			updateStatus(status){

				this.showModal = true
				
				this.change_status = status;
			},

			ticketsData(data){
		
				this.ticketId = data
			},

			tickets(category){
				
				this.currentTabId = category.id;
				
				this.ticketId = [];

				this.apiUrl = '/api/client/ticket-list?filter_id='+category.id;
			},

			toggleFilterView() {

				this.isShowFilter = !this.isShowFilter;
			},

			getFilterTabs () {

				this.loading = true;

				axios.get('/api/client/ticket-filter').then(res=>{

					this.filterList = res.data.data.filters.data;

					this.currentTabId = this.filterList[0].id;

					this.apiUrl = '/api/client/ticket-list?filter_id='+this.filterList[0].id;

					this.loading = false;

					this.hasDataPopulated = true;

				}).catch(err=>{

					this.loading = false;

					this.hasDataPopulated = true;
				})
			},
		},

		components : {
			
			'my-tickets-table' : require('./MiniComponents/ClientTicketsTable'),
			
			'loader':require('components/Client/Pages/ReusableComponents/Loader'),
			
			"alert": require("components/MiniComponent/Alert"),

			'ticket-status': require('./MiniComponents/ChangeStatus'),

			'change-status-modal' : require('./MiniComponents/ChangeStatusModal'),

			'client-ticket-filter': require("components/Extra/DataTableFilter")
		}
	};
</script>

<style>
	
	.card-title { float: left; font-size: 1.1rem; font-weight: 400; margin: 0; }

	.card-header>.card-tools { float: right; margin-right: -.625rem;}

	.btn-tool { background-color: transparent; color: rgba(31,45,61,.8);; font-size: .875rem; margin: -.75rem 0; padding: .25rem .5rem;}

	.range_btn { font-size: 13px; }

	.btn-primary { background-color: #337ab7 !important;border-color: #337ab7 !important; }
</style>

<style scoped>
	
	.tickets_tab .active { color: blue !important; }

	#tickets_tab { cursor: pointer; }

	.tab-content { margin-top: 15px !important; }
</style>