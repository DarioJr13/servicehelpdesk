<template>
	
	<div id="ticket-type-list">
		
		<alert componentName="dataTableModal" />

		<faveo-box :title="trans('list_of_ticket_types')">
			
			<div class="card-tools" slot="customActions">
					
				<a class="btn btn-tool" :href="basePath() + '/ticket-types/create'" v-tooltip="trans('create_ticket_type')"> 

					<i class="fas fa-plus"> </i> 
				</a>
			</div>

			<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="ticket-type-list">
					
			</data-table>
		</faveo-box>
	</div>
</template>

<script>
	
	export default {

		name : 'ticket-type-index',

		data () {

			return {

				columns : ['name', 'type_desc', 'action'],

				apiUrl : '/api/ticket-types-list',

				options : {},
			}
		},

		beforeMount () {

			const self = this;

			this.options = {
			
				headings: { type_desc : 'Description', action : 'Actions' },

				columnsClasses : {

					name: 'type-name',

					type_desc : 'type-desc',

					action: 'type-action',
				},

				texts: { filter: "", limit: "" },

				templates: {

		  			action: "data-table-actions",
				},
				
				sortable: [ 'name', 'type_desc', 'status' ],

				filterable: [ 'name', 'type_desc', 'status' ],
				
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
				 		
				 		data: data.data.ticketTypes.map(data => {
							
							data.edit_url = self.basePath() + "/ticket-types/" + data.id + '/edit';
							
							data.delete_url = self.basePath() + "/api/ticket-types-delete/" + data.id;
							
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
	
	.type-name,.type-desc,.type-status,.type-action{ max-width: 250px; word-break: break-all;}
	
	#ticket-type-list .VueTables .table-responsive {
		overflow-x: auto;
	}

	#ticket-type-list .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}
</style>