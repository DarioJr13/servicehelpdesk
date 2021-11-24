<template>
    <div>

		<alert componentName="dataTableModal"/>

		<div class="card card-light assets-type-table">

			<div class="card-header">

				<h3 id="cmdb-list" class="card-title">{{lang('social-login-page-title')}}</h3>
				
			</div>

			<div class="card-body" id="cmdb-table">

				<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="cmdb-relationship-list">

				</data-table>
			</div>
		</div>
        
    </div>
</template>

<script>
import axios from 'axios';


export default {

    data(){
        return{

            columns: ['provider', 'status',	'action'],
			options: {},
			apiUrl:'/api/admin/social/media-list',

        }
    },

	beforeMount() {
		const self = this;

		this.options = {
			sortIcon: {
					
				base : 'glyphicon',
					
				up: 'glyphicon-chevron-up',
					
				down: 'glyphicon-chevron-down'
			},
			texts: { filter: '', limit: '' },
			columnsClasses : {
				provider: 'provider',
				status : 'status'
			},
			templates: {
				provider(h,row){
					return row.provider ? row.provider : '--';
				},
				status(h,row){
					if( row.value == 1 ){

						return h('p', { style: { color: 'green' } }, 'Active');

					} else {
						
						return h('p', { style: { color: 'red' } }, 'Inactive');
					}
				},
				action: 'table-actions'
			},
			sortable:  '',
			
			filterable:  '',
			
			pagination:{chunk:5,nav: 'fixed',edge:true},
			
			requestAdapter(data) {
				
				return {
	
					'sort-order' : data.ascending ? 'desc' : 'asc',
					
					'search-query' : data.query.trim(),
					
					page : data.current_page,
					
					limit : data.per_page,
				}
			},
			responseAdapter({data}) {

				return {
					data: data.data.map(data => {

						if( data.provider === 'External Login')
							data.settings_url = self.basePath() + '/social/external-login';
						else 
							data.settings_url = self.basePath() + '/' +data.url_setting;

						return data;
					}),
					count: data.data.length
				}
			},
		}
	},

	components : {
		"data-table" : require('components/Extra/DataTable'),
		
		"alert": require("components/MiniComponent/Alert"),
	}		
}
</script>

<style scoped>

</style>