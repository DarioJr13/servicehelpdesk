<template>
	
	<div id="priority-list">
		
		<alert componentName="dataTableModal" />

		<faveo-box :title="trans('list_of_ticket_priority')">
			
			<div class="card-tools" slot="customActions">
					
				<a class="btn btn-tool" :href="basePath() + '/ticket/priority/create'" v-tooltip="trans('create_ticket_priority')"> 

					<i class="fas fa-plus"> </i> 
				</a>

			</div>

			<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="priority-list">
					
			</data-table>
		</faveo-box>
	</div>
</template>

<script>
	
	export default {

		name : 'priority-index',

		data () {

			return {

				columns : ['priority', 'priority_desc', 'priority_color', 'action'],

				apiUrl : '/api/priority-list',

				options : {}
			}
		},

		beforeMount () {

			const self = this;

			this.options = {
			
				headings: { priority_desc : 'Priority Description', priority_color : 'Priority Color', action : 'Actions' },

				columnsClasses : {

					priority: 'priority-name',

					priority_desc : 'priority-desc',

					priority_color: 'priority-color',

					action: 'priority-action',
				},

        sortIcon: {

          base : 'glyphicon',

          up: 'glyphicon-chevron-down',

          down: 'glyphicon-chevron-up'
        },

				texts: { filter: "", limit: "" },

				templates: {

					priority_color: function(createElement, row) {
						
						return createElement('div', {
							
							style: {
								width: '25px',
								height: '15px',
								background: row.priority_color
							  },
						});
					},

					action: "data-table-actions",
				},
				
				sortable: [ 'priority', 'priority_desc' ],

				filterable: [ 'priority', 'priority_desc' ],
				
				pagination: { chunk: 5, nav: "scroll" },
				
				requestAdapter(data) {
				
					return {
						
						'sort-field': data.orderBy ? data.orderBy : "priority_id",
						
						'sort-order': data.ascending ? "desc" : "asc",
						
						'search-query': data.query.trim(),
						
						page: data.page,
						
						limit: data.limit
					};
				},

				responseAdapter({ data }) {  

					return {
						
						data: data.data.priorities.map(data => {
							
							data.edit_url = self.basePath() + "/ticket/priority/" + data.priority_id + '/edit';
							
							data.delete_url = self.basePath() + "/api/priority/delete/" + data.priority_id;
							
							return data;
						}),
						
						count: data.data.total
					};
				}
			};
		},


		components : {

			'alert' : require('components/MiniComponent/Alert'),

			'data-table' : require("components/Extra/DataTable"),

			'faveo-box' : require('components/MiniComponent/FaveoBox')
		}
	};
</script>

<style>
	
	.priority-name,.priority-desc,.priority-color,.priority-status,.priority-action{ max-width: 250px; word-break: break-all;}
	
	#priority-list .VueTables .table-responsive {
		overflow-x: auto;
	}

	#priority-list .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}
</style>