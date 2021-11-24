<template>
	
	<div id="departments-table">
	
		<alert componentName="dataTableModal"/>

		<div class="card card-light">

			<div class="card-header">
	
				<h3 class="card-title">{{trans('list_of_departments')}}</h3>
					
				<div class="card-tools">
	
					<a class="btn btn-tool" :href="basePath()+'/department/create'" v-tooltip="trans('create_department')">

						<i class="fas fa-plus"> </i>
					</a>
				</div>
			</div>
			
			<div class="card-body" id="my_depts">
				
				<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="departments-table"></data-table>
			</div>
		</div>
	</div>
</template>

<script>

	import axios from 'axios';

	import Vue from 'vue';

	Vue.component('department-managers', require('components/Admin/Staff/Department/DepartmentManagers.vue'));

	export default {
		
		name : 'departments-index',

		description : 'Departments table component',

		data(){

			return {

			columns: ['name', 'type', 'managers', 'actions'],
				
			options: {},
		
			apiUrl:'/api/admin/departments-list',
			}
		},

		beforeMount(){

			const self = this;

			this.options = {

				sortIcon: {

          		base : 'glyphicon',

          		up: 'glyphicon-chevron-down',

          		down: 'glyphicon-chevron-up'
        		},
        
				texts : { 'filter' : '', 'limit' : ''},
				
				columnsClasses : { 

					name : 'dept-name', 

					managers : 'dept-manager',

					type : 'dept-type',

					actions : 'dept-actions'
				},
				
				templates: {
					
					actions: 'data-table-actions',

					managers : 'department-managers',
					
					type(h,row){
						
						return row.type.name
					}
				},
				
				sortable:  ['name', 'type'],
				
				filterable:  ['name', 'type', 'managers'],
				
				pagination:{chunk:5,nav: 'scroll'},
				
				requestAdapter(data) {
					
					return {
						
						'sort-field': data.orderBy ? data.orderBy : 'id',
						
						'sort-order': data.ascending ? 'desc' : 'asc',
						
						'search-query':data.query,
						
						page:data.page,
						
						limit:data.limit,
					}
				},
				
				responseAdapter({data}) {
					
					return {
					
						data: data.data.data.map(data => {
						
							data.edit_url = self.basePath() + '/department/' + data.id + '/edit';

							data.view_url = self.basePath() + '/department/' + data.id ;

							data.delete_url = self.basePath() + '/api/admin/delete-department/' + data.id;

							return data;
						}),
						count: data.data.total
					}
				}
			}
		},

		components:{

			'data-table' : require('components/Extra/DataTable'),
			
			'alert': require("components/MiniComponent/Alert")
		} 	
	};
</script>

<style>
	
	.dept-name,.dept-manager,.dept-type,.dept-actions{ max-width: 250px; word-break: break-all;}
	
	#my_depts .VueTables .table-responsive {
		overflow-x: auto;
	}

	#my_depts .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}
</style>