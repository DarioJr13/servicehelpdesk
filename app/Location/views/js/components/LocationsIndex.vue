<template>
	
	<div id="locations-list">
		
		<alert componentName="dataTableModal" />

		<faveo-box :title="trans('list_of_locations')">
			
			<div class="card-tools" slot="customActions">
					
				<a class="btn btn-tool" :href="basePath() + '/helpdesk/location/create'" v-tooltip="trans('create_location')"> 

					<i class="fas fa-plus"> </i> 
				</a>
			</div>

			<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="locations-list">
					
			</data-table>
		</faveo-box>
	</div>
</template>

<script>
	
	export default {

		name : 'locations-index',

		data () {

			return {

				columns : ['title', 'phone', 'address', 'action'],

				apiUrl : '/api/location-list',

				options : {}
			}
		},

		beforeMount () {

			const self = this;

			this.options = {
				
				headings : { action : 'Actions' },
				
				texts: { filter: "", limit: "" },

				templates: {
		  			

		  			phone(h, row) {

						return row.phone ? row.phone : '--'
					},

					address(h, row) {

						return row.address ? row.address : '--'
					},

		  			action: "data-table-actions",
				},
				
				sortable: [ 'title', 'phone', 'address' ],

				filterable: [ 'title', 'phone', 'address' ],
				
				pagination:{chunk:5,nav: 'fixed',edge:true},
				
				requestAdapter(data) {
			  	
			  		return {
				 		
				 		'sort-field': data.orderBy ? data.orderBy : "id",
				 		
				 		'sort-order': data.ascending ? "asc" : "desc",
				 		
				 		'search-query': data.query.trim(),
				 		
				 		page: data.page,
				 		
				 		limit: data.limit
			  		};
				},

				responseAdapter({ data }) {  

			  		return {
				 		
				 		data: data.data.locations.map(data => {
							
							data.edit_url = self.basePath() + "/helpdesk/location/" + data.id + '/edit';
							
							data.delete_url = self.basePath() + "/api/location/delete/" + data.id;
							
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