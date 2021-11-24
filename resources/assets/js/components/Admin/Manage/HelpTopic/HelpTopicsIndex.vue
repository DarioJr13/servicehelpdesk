<template>
	
	<div id="topics-list">
		
		<alert componentName="dataTableModal" />

		<faveo-box :title="trans('list_of_help_topics')">
			
			<div class="card-tools" slot="customActions">
					
				<a class="btn btn-tool" :href="basePath() + '/helptopic/create'" v-tooltip="trans('create_new_help_topic')"> 

					<i class="fas fa-plus"> </i> 
				</a>

				<div class="btn-group">
					
					<button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						
						<i class="fas fa-filter"></i>
					</button>

					<div class="dropdown-menu dropdown-menu-right" role="menu" x-placement="bottom-end">
							
						<a v-for="action in actions" href="javascript:;" class="dropdown-item" @click="updateTable(action)">

							{{trans(action)}}
						</a>				 
					</div>
				</div>
			</div>

			<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="topics-list">
					
			</data-table>
		</faveo-box>
	</div>
</template>

<script>
	
	export default {

		name : 'labels-index',

		data () {

			return {

				columns : ['topic', 'status', 'type', 'department', 'action'],

				apiUrl : '/api/admin/helptopic-list',

				options : {},

				action : 'all',

				actions : ['all','active','inactive']
			}
		},

		beforeMount () {

			const self = this;

			this.options = {
			
				headings : { action : 'Actions'},

				texts: { filter: "", limit: "" },

				templates: {
		  
		  			action: "data-table-actions",

		  			status: function(createElement, row) {
            
			         let span = createElement('span', {
			            
			            attrs:{
			              
			              'class' : row.status ? 'btn btn-success btn-xs' : 'btn btn-danger btn-xs',

			              'style' : 'cursor:default !important'
			            }
			         }, row.status ? 'Active' : 'Inactive');
			                  
			         return createElement('a', {
			                    
			         }, [span]);
			      },

			      type: function(createElement, row) {
            
			         let span = createElement('span', {
			            
			            attrs:{
			              
			              'class' : row.type ? 'btn btn-success btn-xs' : 'btn btn-danger btn-xs',

			              'style' : 'cursor:default !important'
			            }
			         }, row.type ? 'Public' : 'Private');
			                  
			         return createElement('a', {
			                    
			         }, [span]);
			      },

			      department(h, row) {
			                  
			         return row.department ? row.department.name  : '--';
			      }
				},
				
				sortable: [ 'topic', 'status', 'type', 'department' ],

				filterable: [ 'topic', 'status', 'type', 'department' ],
				
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
				 		
				 		data: data.data.data.map(data => {
							
							data.edit_url = self.basePath() + "/helptopic/" + data.id + '/edit';
							
							data.delete_url = self.basePath() + "/api/admin/helptopic-delete/" + data.id;
							
							data['is_linked'] = true;

							data['dependency'] = 'help-topic'
							
							return data;
				 		}),
				 		
				 		count: data.data.total
			  		};
				}
		 	};
		},

		methods : {
			
			updateTable(value) {
			
				switch(value) {
					
					case 'all':
						
						this.apiUrl = '/api/admin/helptopic-list';
						break;
					
					case 'active':
						
						this.apiUrl = '/api/admin/helptopic-list?status=1';
						break;
					case 'inactive':
						
						this.apiUrl = '/api/admin/helptopic-list?status=0';
						break;
				}
			}
		},

		components : {

			'alert' : require('components/MiniComponent/Alert'),

			'data-table' : require("components/Extra/DataTable"),

			'faveo-box' : require('components/MiniComponent/FaveoBox')
		}
	};
</script>