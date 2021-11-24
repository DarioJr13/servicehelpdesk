<template>
	
	<div>
	
		<alert componentName="language" />

		<custom-loader v-if="loading" :duration="4000"></custom-loader>

		<div class="card card-light">
			
			<div class="card-header">
				
				<h3 class="card-title">{{trans('language-settings')}}</h3>

				<div class="card-tools">

					<a class="btn-tool" v-tooltip="trans('download')" :href="basePath()+'/api/admin/download-language-template'">

						<i class="fas fa-download"></i>
					</a>
				</div>
			</div>

			<div class="card-body" id="lang-table">
				
				<data-table v-if="apiUrl" :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to="lang-table" :key="updateTable">
					
				</data-table>
			</div>
		</div>
	</div>
</template>

<script>

	import axios from "axios";

	import { successHandler, errorHandler } from 'helpers/responseHandler';

	export default {
		
		name: "languages-index",

		description: "Languages table component",

		data(){

			return {

				columns: [ "language", "native_name", "iso_code", "system_default_language", "action"],

				options: {},

				apiUrl: "api/admin/language-list",

				loading : false,

				updateTable : 0
			}
		},

		beforeMount() {

			const self = this;

			this.options = {
			
				texts: { filter: "", limit: "" },
	
				headings: {
					
					native_name: "Native Name",
					
					iso_code: "ISO-CODE",
				},

				columnsClasses : {

					language: 'lang-name',

					native_name : 'lang-native',

					iso_code : 'lang-iso',

					system_default_language : 'lang-default'
				},

				templates: {

					system_default_language(createElement, row) {
						
						let span = createElement('span', {
						
							attrs:{
							
								'class' : row.system_default_language ? 'btn btn-default text-success btn-xs pointer_normal' : 'btn btn-default text-danger btn-xs pointer_normal'
							}
						}, row.system_default_language ? 'Yes' : 'No');
									
						return createElement('a', {}, [span]);
					},

					language(createElement,row) {

						return createElement('span', {
						
							domProps: {

						    innerHTML: row.language
						  }
						});
					},

					action(createElement, row) {
              
		            return createElement('button', {
		            	
		            	attrs: {

		           			class : 'btn btn-primary',
		           			
		           			disabled : row.system_default_language
		              	},

		              	on: {

		                	click: function() {

		                 	 	self.makeDefault(row.iso_code)
		                	}
		              	}
		            }, 'Make default');
		         },
				},
				
				sortable: ["language", "native_name", "iso_code"],

				filterable: ["language", "native_name", "iso_code"],
				
				pagination: { chunk: 5, nav: "scroll" },
				
				requestAdapter(data) {
					
					return {
						
						'sort-field' : data.orderBy ? data.orderBy : "language_name",
						
						'sort-order' : data.ascending ? "asc" : "desc",
						
						'search-query' : data.query.trim(),
						
						page: data.page,
						
						limit: data.limit
					};
				},

				responseAdapter({ data }) {  

					self.total_records = data.data.total;      
				
					return {
						
						data: data.data.data,
						
						count: data.data.total
					};
				}
			};
		},

		methods: {
			
			makeDefault(iso) {

				this.loading = true;

				axios.patch('api/admin/update-system-language/'+iso).then(res=>{

					this.loading = false;

					this.updateTable += 1;

					successHandler(res,'language');

					location.reload();

				}).catch(err=>{

					this.loading = false;

					errorHandler(err,'language');
				})
			}
		},

		components: {
			
			'custom-loader' : require('components/MiniComponent/Loader'),

			"data-table": require("components/Extra/DataTable"),
			
			'alert' : require('components/MiniComponent/Alert'),
		}
	};
</script>

<style>

	.lang-name,.lang-native,.lang-iso,.lang-default{
		max-width: 250px; word-break: break-all;
	}
	
	#lang-table .VueTables .table-responsive {
		overflow-x: auto;
	}

	#lang-table .VueTables .table-responsive > table{
		width : max-content;
		min-width : 100%;
		max-width : max-content;
		overflow: auto !important;
	}
</style>
