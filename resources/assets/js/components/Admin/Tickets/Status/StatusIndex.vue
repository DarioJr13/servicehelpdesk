<template>

	<div>

		<alert componentName="dataTableModal"/>

		<div class="card card-light ">

			<div class="card-header">

				<h3 class="card-title">{{trans('list_of_status')}}</h3>

				<div class="card-tools">

					<a class="btn btn-tool" :href="basePath()+'/status-create'" v-tooltip="trans('create_new_status')">

						<i class="fas fa-plus"> </i> 
					</a>
				</div>
			</div>

			<div class="card-body" id="status_index">

				<data-table url="/api/ticket-status-list" :dataColumns="columns" :option="options" scroll_to ="status_index" componentTitle="statusIndex" />
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import axios from 'axios';

	import Vue from 'vue';

	import TableActions from 'components/MiniComponent/DataTableComponents/DataTableActions.vue';

	Vue.component('table-actions', TableActions);

	import Datatable from 'components/Extra/DataTable';

	import Alert from "components/MiniComponent/Alert";

	export default {

		name : 'status-index',

		data(){

			return {

				columns: [ 'name', 'visibility_for_client', 'purpose_of_status','order','icon','actions'],

				options: {}
			}	
		},

		beforeMount() {

			const self = this;

			this.options = {

				sortIcon: {

					base : 'glyphicon',

					down: 'glyphicon-chevron-up',

					up: 'glyphicon-chevron-down'
				},

				columnsClasses : {

					name: 'status-name',

					visibility_for_client: 'status-visible',

					purpose_of_status: 'status-purpose',
					
					order: 'status-order',
					
					icon: 'status-icon',

					actions: 'status-actions',
				},

				texts: { filter: '', limit: '' },

				templates: {

					purpose_of_status(h,row) {

						return row.purpose_of_status ? row.purpose_of_status.name : '--'
					},

		         visibility_for_client: function(createElement, row) {
						
						return createElement('span', {
							attrs:{
								'class' : row.visibility_for_client ?  'btn btn-success btn-xs' : 'btn btn-warning btn-xs',
								'style' : 'cursor : auto'
							}
						}, row.visibility_for_client ? 'Yes' : 'No');
					},

					visibility_for_client: function(createElement, row) {
						
						return createElement('span', {
							attrs:{
								'class' : row.visibility_for_client ?  'btn btn-success btn-xs' : 'btn btn-warning btn-xs',
								'style' : 'cursor : auto'
							}
						}, row.visibility_for_client ? 'Yes' : 'No');
					},

					icon: function(createElement, row) {
						
						return createElement('i', {
							attrs:{
								'class' : row.icon,
								'style' : 'color : '+row.icon_color
							}
						}, '');
					},

					actions: 'table-actions'
				},

				sortable:  [ 'name', 'visibility_for_client', 'purpose_of_status','send_email','order'],

				filterable:  [ 'name', 'visibility_for_client', 'purpose_of_status','send_email','order','icon'],

				pagination: { chunk:5,nav: 'fixed',edge:true },

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

					return {

						data: data.data.statuses.map(data => {
							
							data.is_default = data.default;

							data.edit_url = self.basePath() + "/status/edit/" + data.id;
							
							data.delete_url = self.basePath() + "/api/status-delete/" + data.id;
							
							return data;
				 		}),

						count: data.data.total
					}
				},
			}
		},

		components : {

			"data-table" : Datatable,

			"alert": Alert,
		}
	};
</script>

<style type="text/css">

	.status-name,.status-visible,.status-purpose,.status-mail,.status-order,.status-icon,.status-actions { max-width: 250px; word-break: break-all;}

	#status_index .VueTables .table-responsive {
		overflow-x: auto;
	}

	#status_index .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}

	.status-purpose { text-transform: capitalize !important; }
</style>
