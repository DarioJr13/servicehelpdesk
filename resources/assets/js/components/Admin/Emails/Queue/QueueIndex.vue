<template>

	<div>

		<alert componentName="dataTableModal"/>

		<div class="card card-light ">

			<div class="card-header">

				<h3 class="card-title">{{trans('queues')}}</h3>

			</div>

			<div class="card-body" id="queue_index">

				<div v-if="activated && activated.name == 'Database'">
					
					<div class="card p-4 bg-light">
							
						<div class="row">
							
							<div class="col-sm-2">
								
								<span class="text-xl">*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*</span>
							</div>

							<div class="col-sm-4">
								
								<select v-if="php_path != 'other'" class="form-control" v-model="php_path">
									
									<option disabled value="">{{trans('specify-php-executable')}}</option>
									
									<template v-for="(path, index) in phpPaths">
										
										<option :value="path">{{path}}</option>	
									</template>
									
									<option value="other">{{trans('other')}}</option>
								</select>

								<div v-if="php_path == 'other'" class="input-group">

									<input type="text" class="form-control" v-model="custom_php_path" :placeholder="trans('specify-php-executable')">
									
									<div class="input-group-append">
									
									  <a href="javascript:;" class="input-group-text" @click="clearPhpPath"><i class="fas fa-times"></i></a>
									
									</div>
								 </div>
							</div>
							
							<div class="col-sm-5"><span class="text-md">{{cron_path}}</span></div>
							
							<div class="col-sm-1">
								
								<span v-if="!copying" v-tooltip="trans('verify-and-copy-command')" @click="copyCommand()" class="pointer">

									<i class="far fa-clipboard fa-2x"></i>
								</span>

								<span v-if="copying" class="pointer"><i class="fas fa-circle-notch fa-spin fa-2x"></i></span>
				 
							</div>
						</div>
					</div>
				</div>

				<data-table url="/api/queue-list" :dataColumns="columns" :option="options" scroll_to ="queue_index" componentTitle="QueueIndex" />
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import {errorHandler, successHandler} from 'helpers/responseHandler'

	import axios from 'axios'
	
	import copy from 'clipboard-copy';

	import Vue from 'vue';

	Vue.component('queue-actions', require('./QueueActions.vue'));

	Vue.component('queue-name', require('./QueueName.vue'));

	export default {

		name : 'queue-index',

		description : 'Queues table component',

		data(){

			return {

				columns: [ 'name', 'status', 'action'],

				options: {},

				activated : '',

				cron_path : '',

				phpPaths : '',

				php_path : '',

				labelStyle : { display : 'none' },

				custom_php_path : '',

				copying : false,
			}	
		},

		beforeMount() {

			this.getPaths();

			const self = this;

			this.options = {

				sortIcon: {

					base : 'glyphicon',

					down: 'glyphicon-chevron-up',

					up: 'glyphicon-chevron-down'
				},

				columnsClasses : {

					name: 'queue-name',

					status: 'queue-status',

					action: 'queue-action',
				},

				texts: { filter: '', limit: '' },

				templates: {

					name : 'queue-name',

					status: function(createElement, row) {
						
						let span = createElement('span', {
						
							attrs:{
							
								'class' : row.status ? 'btn btn-success btn-xs' : 'btn btn-danger btn-xs'
							}
						}, row.status ? 'Active' : 'Inactive');
									
						return createElement('a', {}, [span]);
					},

					action: 'queue-actions'
				},

				sortable:  '',

				filterable:  '',

				pagination: { chunk:5,nav: 'fixed',edge:true },

				requestAdapter(data) {

					return {

						'sort-field' : data.orderBy ? data.orderBy : 'name',

						'sort-order' : data.ascending ? 'asc' : 'desc',

						'search-query' : data.query.trim(),

						page : data.page,

						limit : data.limit,
					}
				},

				responseAdapter({data}) {

					self.activated = data.data.queues.find( ({ status }) => status );

					if(self.activated.name != 'Database'){
						self.clearPhpPath();
					}

					return {

						data: data.data.queues,

						count: data.data.total
					}
				},
			}
		},

		methods : {

			getPaths() {

				axios.get('/api/queue/get-path-list').then(res=>{

					this.phpPaths = res.data.data.paths;

					this.cron_path = res.data.data.cronPathToShow;

				}).catch(err=>{

					this.phpPaths = []
				})
			},

			clearPhpPath() {

				this.php_path = '';

				this.custom_php_path = '';
			},

			copyCommand() {

				this.copying = true;

				let data = {};

				data['path'] = this.custom_php_path ? this.custom_php_path : this.php_path;

				axios.post('/verify-php-path', data).then(res=>{

					copy('* * * * * ' + (this.custom_php_path ? this.custom_php_path : this.php_path) +' '+this.cron_path);

					this.copying = false;

					successHandler(res,'dataTableModal');

				}).catch(err=>{

					this.copying = false;

					errorHandler(err,'dataTableModal');
				})
			},

		},

		components : {

			"data-table" : require('components/Extra/DataTable'),

			"alert": require("components/MiniComponent/Alert"),
		}
	};
</script>

<style type="text/css">

	.queue-name,.queue-status,.queue-action { max-width: 250px; word-break: break-all;}

	#queue_index .VueTables .table-responsive {
		overflow-x: auto;
	}

	#queue_index .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}
</style>
