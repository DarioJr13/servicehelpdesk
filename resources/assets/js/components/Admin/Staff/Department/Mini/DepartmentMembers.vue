<template>
		
	<div id="dept_members">
	
		<div class="card card-light ">
		
			<div class="card-header">
			
				<h3 class="card-title">{{trans('list_of_department_members')}}</h3>
			</div>
			
			<div class="card-body">
			
				<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to="dept_members">
					
				</data-table>
			</div>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';

	import Vue from 'vue';

	Vue.component('table-actions', require('components/MiniComponent/DataTableComponents/DataTableActions.vue'));

	export default {

		name : 'dept-members',

		description : 'Department memebers list',

		props : { 

			id : { type : String|Number , default : ''}
		},

		data() {

			return {

				columns: ['name', 'email', 'status', 'action'],

				options: {},

				apiUrl:'/api/admin/get-users-list?dept-ids[]='+this.id,
			}
		},

		beforeMount(){


			const self= this;

			this.options = {

				sortIcon: {
						
					base : 'glyphicon',
						
					up: 'glyphicon-chevron-down',
						
					down: 'glyphicon-chevron-up'
				},

				headings: { 
					
					name: 'Name', 

					email : 'Email', 
					
					status: 'Status', 

					action:'Actions'
				},

				columnsClasses : {
          
         		name: 'dept-member-name', 

					email : 'dept-member-email', 
					
					status : 'dept-member-status',

					action : 'dept-member-action'
        		},
				
				texts: { filter: '', limit: '' },

				templates: {
					
					name: function(createElement, row) {
						
						return createElement('a', {
							attrs: {
								href: self.basePath()+'/panel/agent/' + row.id,
							}
						}, row.name);
					},

					email(h, row) {

						return row.email ? row.email : '--';
					},

					status : 'data-table-statuses',

					action: 'table-actions'
				},

				sortable:  ['name', 'email'],

				filterable:  ['name', 'email'],
				
				pagination:{chunk:5,nav: 'fixed',edge:true},
				
				requestAdapter(data) {
	      
	        		return {

	          		'sort-field': data.orderBy ? data.orderBy : 'id',
	      
	          		'sort-order': data.ascending ? 'desc' : 'asc',
	      
	          		'search-query':data.query.trim(),
	      
	          		page:data.page,
	      
	          		limit:data.limit,
	        		}
	      	},

			 	responseAdapter({data}) {

					return {
					
						data: data.data.users.map(data => {
							
							data.view_url = self.basePath()+'/panel/agent/' + data.id ;

						return data;
					}),
						count: data.data.total
					}
				},
			}
		},

		components : {

			'data-table' : require('components/Extra/DataTable')
		}
	};
</script>

<style>
	.dept-member-name,.dept-member-email,.dept-member-status, .dept-member-action{ 
	 	min-width: 150px;; word-break: break-all;
	}

	#dept_members .VueTables .table-responsive {
		overflow-x: auto;
	}

	#dept_members .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
	}
</style>