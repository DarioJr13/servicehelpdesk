<template>
	
	<div id="login-logs">
		
		<logs-switch v-if="showBtn" :userId="userId" :alertName="alertName"></logs-switch> <br v-if="alertName != 'edit_agent_profile'">

		<alert componentName="dataTableModal" />

		<faveo-box :title="trans('login-logs')">
			
			<div  class="card-tools" slot="customActions">
					
				<button v-if="showBtn" class="btn btn-sm btn-danger" @click="showModal = true"> 

					<i class="fas fa-power-off"> </i> {{trans('logout-from-all-devices')}}
				</button>
				&nbsp;&nbsp;
				<span><i class="fas fa-sync-alt" aria-hidden="true" v-tooltip="trans('refresh')" @click="refreshTable()"></i></span>
			</div>
			
			<div id="login_logs_index">

				<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="login-logs" :componentTitle="componentTitle">
						
				</data-table>
			</div>
		</faveo-box>

		<transition name="modal">
				
			<logout-modal v-if="showModal" :onClose="onClose" :showModal="showModal" :userId="userId" :alertName="alertName">
				
			</logout-modal>
		</transition>
	</div>
</template>

<script>

	import { mapGetters } from 'vuex'
	
	export default {

		name : 'login-logs',

		props : {

			userId : { type : String | Number, default : '' },

			showBtn : { type : Boolean, default : false },

			alertName : { type : String, default : 'edit_agent_profile'}
		},

		data () {

			return {

				columns : ['device', 'platform', 'browser', 'ip_address', 'login_at'],

				apiUrl : '/api/login/info/'+this.userId,

				options : {},

				showModal : false,

				showSwitch : false,

				componentTitle: 'loginLogs'
			}
		},

		computed : {

			...mapGetters(['formattedTime'])
		},

		beforeMount () {

			const self = this;

			this.options = {
			
				headings : { platform : 'Platform/OS', ip_address : 'IP' },

				texts: { filter: "", limit: "" },

				columnsClasses : {

					device: 'login-device',

					platform: 'login-plat',
					
					browser: 'login-browser',

					ip_address: 'login-ip',
					
					login_at: 'login-at',
					
				},

				templates: {

					login_at(h, row) {

						return self.formattedTime(row.login_at)
					},

				},
				
				sortable: ['login_at'],

				filterable: ['device', 'platform', 'browser', 'ip_address', 'login_at'],
				
				pagination:{chunk:5,nav: 'fixed',edge:true},
				
				requestAdapter(data) {
			  	
			  		return {
				 		
				 		'sort-field': data.orderBy ? data.orderBy : "id",
				 		
				 		'sort-order': data.ascending ? "desc" : "asc",
				 		
				 		'search-query': data.query.trim(),
				 		
				 		page: data.page,
				 		
				 		limit: data.limit
			  		};
				},

				responseAdapter({ data }) {  
			  		
			  		return {
				 		
				 		data: data.data.data,
				 		
				 		count: data.data.total
			  		};
				}
		 	};
		},

		methods : {

			onClose(){
				
				this.showModal = false;
			},

			refreshTable()
			{
				window.eventHub.$emit('loginLogsrefreshData');
			}
		},

		components : {

			'alert' : require('components/MiniComponent/Alert'),

			'data-table' : require("components/Extra/DataTable"),

			'faveo-box' : require('components/MiniComponent/FaveoBox'),

			'logout-modal' : require('./LogoutModal'),

			'logs-switch' : require('./LogsSwitch'),
		}
	};
</script>

<style>
	.login-device,.login-ip,.login-at,.login-out,.login-plat, .login-browser { max-width: 300px; word-break: break-all;}

	#login_logs_index .VueTables .table-responsive {
		overflow-x: auto;
	}

	#login_logs_index .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}
</style>