<template>
	
	<div class="col-sm-12" id="filter-settings">
	
		<alert componentName="dataTableModal"/>

		<div class="card card-light ">
	
			<div class="card-header">
				
				<h3 id="client-filter-list" class="card-title">{{trans('client-filter-list')}}</h3>

				<div class="card-tools" v-if="!isEditMode && totalFilters !== 5">

					<a class="btn btn-tool" href="javascript:;" v-tooltip="trans('client-filter-create')" @click="toggleFilterView">

						<i class="fas fa-plus"> </i> 
					</a>
				</div>
			</div>

			<div class="card-body" id="my_client_filter_list">

				<ticket-filter  v-if="isShowFilter" :showFilter="isShowFilter" :closeFilterView="toggleFilterView" from="clientFilter"
					:isEditMode="isEditMode" :selectedId="selectedId" divId="my_client_filter_body" :totalFilters="totalFilters">

				</ticket-filter>

				<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="client-filter-list"></data-table>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import Vue from 'vue';

	Vue.component('table-actions', require('components/MiniComponent/DataTableComponents/DataTableActions.vue'));

	import axios from 'axios';

	import { mapGetters } from 'vuex'

	import { scrollToElement } from 'helpers/extraLogics'

	export default {

		name : 'client-filter-list',

		data: () => ({

			columns: ['name', 'created_at', 'updated_at', 'action'],

			options: {},

			apiUrl:'/api/client/ticket-filter',

			isShowFilter : false,

			isEditMode : false,

			selectedId : 0,

			totalFilters : 0
		}),

		computed:{
			...mapGetters(['formattedTime','formattedDate'])
		},

		created () {

			window.eventHub.$on('filterToggleClicked',this.editFilter);

			window.eventHub.$on('ticketFilterSaved',this.updateTable);
		},

		beforeMount() {

			const self = this;

			this.options = {

				headings: { 

					name: 'Name',

					created_at : 'Created at', 

					updated_at : 'Updated at', 

					action:'Actions'
				},
				
				columnsClasses : {

					name: 'filter-name', 

					created_at: 'filter-time',

					updated_at: 'filter-time',

					action: 'filter-action',
				},

				sortIcon: {
						
					base : 'glyphicon',
						
					up: 'glyphicon-chevron-up',
						
					down: 'glyphicon-chevron-down'
				},

				texts: { filter: '', limit: '' },

				templates: {

					created_at(h, row) {

						return self.formattedTime(row.created_at);
					},

					updated_at(h, row) {

						return self.formattedTime(row.updated_at);
					},

					action: 'table-actions'
				},

				sortable:  ['name', 'created_at', 'updated_at'],
				
				filterable:  ['name'],
				
				pagination:{chunk:5,nav: 'fixed',edge:true},
				
				requestAdapter(data) {
	      
	        return {
	          
	          'sort-field' : data.orderBy ? data.orderBy : 'id',
	          
	          'sort-order' : data.ascending ? 'desc' : 'asc',
	          
	          'search-query' : data.query.trim(),
	          
	          page : data.page,
	          
	          limit : data.limit,
	        }
	      },

			 	responseAdapter({data}) {

					self.totalFilters = data.data.filters.total;

					return {
						
						data: data.data.filters.data.map(data => {

							data.filter_toggle_url = true;

							data.delete_url = self.basePath() + '/api/agent/ticket-filter/' + data.id;

							return data;
						}),
						count: data.data.filters.total
					}
				},
			}
		},

		methods:{
			
			toggleFilterView() {

				this.isShowFilter = !this.isShowFilter;

				this.isEditMode = false;

				this.selectedId = 0;
			},

			editFilter(value) {

				this.scrollToTarget('filter-settings')

				if(this.isShowFilter) {

					this.isShowFilter = false;

					setTimeout(()=>{

						this.isShowFilter = true;
					},1000)

				} else {
					
					this.isShowFilter = true;
				}

				this.isEditMode = true;

				this.selectedId = value.id;
			},

			scrollToTarget(id){

				return scrollToElement(id)
			},

			updateTable() {

				this.isShowFilter = false;

				this.isEditMode = false;

				this.selectedId = 0;

				window.eventHub.$emit('refreshData');
			}
		},

		components : {

			"data-table" : require('components/Extra/DataTable'),
			
			"alert": require("components/MiniComponent/Alert"),

			'ticket-filter': require('components/Agent/tickets/filters/TicketFilter.vue'),
		}
	};
</script>

<style type="text/css">
	
	.filter-name,.filter-time,.filter-action{
		max-width: 250px; word-break: break-all;
	}
	
	#my_client_filter_list .VueTables .table-responsive {
		overflow-x: auto;
	}

	#my_client_filter_list .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}

	#my_client_filter_body { padding: 0.75rem !important; }
</style>
