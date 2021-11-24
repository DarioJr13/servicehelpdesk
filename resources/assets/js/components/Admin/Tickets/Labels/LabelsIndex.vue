<template>
	
	<div id="labels-list">
		
		<alert componentName="dataTableModal" />

		<faveo-box :title="trans('list_of_labels')">
			
			<div class="card-tools" slot="customActions">
					
				<a class="btn btn-tool" :href="basePath() + '/labels/create'" v-tooltip="trans('create_label')"> 

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

			<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="labels-list">
					
			</data-table>
		</faveo-box>
	</div>
</template>

<script>

	import { lang } from 'helpers/extraLogics'
	
	export default {

		name : 'labels-index',

		data () {

			return {

				columns : ['title', 'order', 'visible_to', 'status', 'action'],

				apiUrl : '/api/label-list',

				action : 'all',

				actions : ['all','active','inactive'],

				options : {}
			}
		},

		beforeMount () {

			const self = this;

			this.options = {
			
				headings : { action : 'Actions' },

				texts: { filter: "", limit: "" },

				templates: {
		  
		  			action: "data-table-actions",

		  			visible_to(h,row) {

						if(row.visible_to) {

							let arr = [];

							 row.visible_to.split(',').forEach((value)=>{ arr.push(lang(value)) })

							return arr.toString();
						} else {

							return '--'
						}
					},

		  			title: function(createElement, row) {
				
			 			let span = createElement('span', {
				
							style: { color: '#FFF', backgroundColor: row.color, fontSize: '12px' },

							class : 'badge'

			 			}, row.title);
						
			 			return createElement('a', {
							
							attrs : {
								
								href : self.basePath()+'/panel/tickets?show%5B%5D=inbox&departments%5B%5D=All&filter-by-url=1&category=all&label-ids[]=' + row.id

							}
			 			}, [span]);
		  			},

		  			status: function(createElement, row) {
            
			         let span = createElement('span', {
			            
			            attrs:{
			              'style' : 'cursor:auto',
			              'class' : row.status ? 'btn btn-success btn-xs' : 'btn btn-danger btn-xs'
			            }
			         }, row.status ? 'Active' : 'Inactive');
			                  
			         return createElement('a', {

			         }, [span]);
			      },
				},
				
				sortable: [ "title", "status", "order" ],

				filterable: ["title", "status", "order"],
				
				pagination:{chunk:5,nav: 'fixed',edge:true},
				
				requestAdapter(data) {
			  	
			  		return {
				 		
				 		'sort-field': data.orderBy ? data.orderBy : "order",
				 		
				 		'sort-order': data.ascending ? "asc" : "desc",
				 		
				 		'search-query': data.query.trim(),
				 		
				 		page: data.page,
				 		
				 		limit: data.limit
			  		};
				},

				responseAdapter({ data }) {  

			  		return {
				 		
				 		data: data.data.data.map(data => {
							
							data.edit_url = self.basePath() + "/labels/" + data.id + '/edit';
							
							data.delete_url = self.basePath() + "/api/label-delete/" + data.id;

							data['is_linked'] = true;

							data['dependency'] = 'label'
							
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
						
						this.apiUrl = '/api/label-list';
						break;
					
					case 'active':
						
						this.apiUrl = '/api/label-list?status=1';
						break;

					case 'inactive':
						
						this.apiUrl = '/api/label-list?status=0';
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