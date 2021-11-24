<template>

	<div>

		<alert componentName="dataTableModal"/>

		<div class="card card-light worktime-type-table">

			<div class="card-header">

				<h3 id="worktime-type-list" class="card-title">{{trans('list_of_worktime_types')}}</h3>

				<div class="card-tools">

					<a class="btn btn-tool" :href="basePath()+'/worktime-type'" v-tooltip="trans('add-worktime-type')">

						<span class="glyphicon glyphicon-plus"> </span>
					</a>
				</div>
			</div>

			<div class="card-body" id="worktime-type-table">

				<data-table :url="apiUrl" :dataColumns="columns"  :option="options" scroll_to ="license-type-list">

				</data-table>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

    import axios from 'axios';

    import Vue from 'vue';

    Vue.component('table-actions', require('components/MiniComponent/DataTableComponents/DataTableActions.vue'));

    import { mapGetters } from 'vuex';

    export default {

        name : 'worktime-type-list',

        description : 'Worktime type lists table component',


        data: () => ({

            columns: ['name', 'created_at', 'updated_at', 'action'],

            options: {},

            apiUrl:'/api/worktime-type-list?meta=1',
        }),

        beforeMount() {

            const self = this;

            this.options = {

                sortIcon: {

                    base : 'glyphicon',

                    up: 'glyphicon-chevron-down',

                    down: 'glyphicon-chevron-up'
                },

                texts: { filter: '', limit: '' },

                columnsClasses : {

                    name : 'worktime-type-name',

                    created_at: 'worktime-type-created',

                    updated_at : 'worktime-type-updated'
                },

                templates: {

                    created_at(h,row){

                        return self.formattedTime(row.created_at)
                    },

                    updated_at(h,row){

                        return self.formattedTime(row.updated_at)
                    },

                    action: 'table-actions'
                },

                sortable:  ['name', 'created_at', 'updated_at'],

                filterable:  ['name', 'created_at', 'updated_at'],

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

                    return {

                        data: data.data.data.map(data => {

                            data.edit_url = self.basePath() + '/worktime-type/' + data.id;

                            data.delete_url = self.basePath() + '/api/worktime-type/' + data.id;

                            return data;
                        }),
                        count: data.data.total
                    }
                },
            }
        },

        computed : {

            ...mapGetters(['formattedTime'])
        },

        components : {

            "data-table" : require('components/Extra/DataTable'),

            "alert": require("components/MiniComponent/Alert"),
        }
    };
</script>

<style type="text/css">

	.worktime-type-name {
		width:25%;
		word-break: break-all;
	}

	.worktime-type-created{
		width:25%;
		word-break: break-all;
	}

	.worktime-type-updated{
		width:25%;
		word-break: break-all;
	}
</style>