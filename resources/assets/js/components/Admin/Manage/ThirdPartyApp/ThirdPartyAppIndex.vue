<template>
  <div>
    <alert componentName="dataTableModal"/>

    <div class="card card-light">
      <div class="card-header">
        <h3 class="card-title">{{lang('third_party_apps')}}</h3>
        <div class="card-tools">
            <a class="btn btn-tool" :href="base+'/admin/third-party-apps/create'" v-tooltip="lang('create_app')">
              <span class="glyphicon glyphicon-plus"> </span>
            </a>
          </div>
     
      </div>

      <div class="card-body">

        <data-table :url="apiUrl" :dataColumns="columns"  :option="options"></data-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

import {lang} from 'helpers/extraLogics';
import axios from 'axios';

export default {

  name : 'third-party-index',

  data: () => ({

    base:window.axios.defaults.baseURL,

    columns: ['name', 'app_id', 'status', 'action'],

    options: {
      headings: { name: 'Name', app_id: 'App Id', status: 'Status', action:'Action'},
      texts: {
        filter: '',
        limit: ''
      },
      templates: {
        status: 'data-table-status',
        action: 'data-table-actions'
      },
      sortable:  ['name', 'status'],
      filterable:  ['name', 'status'],

      pagination:{chunk:5,nav: 'fixed',edge:true},

      requestAdapter(data) {
        return {
          sort: data.orderBy ? data.orderBy : 'id',
          order: data.ascending ? 'desc' : 'asc',
          search:data.query.trim(),
          page:data.page,
          limit:data.limit,

        }
      },
      responseAdapter({data}) {
        return {
          data: data.data.data.map(data => {

            data.edit_url = window.axios.defaults.baseURL + '/admin/third-party-apps/'+data.id+'/edit';

            data.delete_url = window.axios.defaults.baseURL + '/api/admin/third-party-apps/' + data.id;

            data.active = (data.active == '1') ? 'active' : 'inactive';

            return data;
          }),
          count: data.data.total
        }
      },
    },

    /**
     * api url for ajax calls
     * @type {String}
     */
    apiUrl:'api/admin/third-party-apps',


  }),

  components:{
    'data-table' : require('components/Extra/DataTable'),
    "alert": require("components/MiniComponent/Alert"),
  }


};
</script>

<style type="text/css" scoped>
.box-header h3{
  font-family: Source Sans Pro !important
}
.box.box-primary {
  padding: 0px !important;
}
.right{
  float: right;
}
</style>
