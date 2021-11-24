<template>
<div>
	<alert componentName="templates-list-index"></alert>
	<div class="card card-light" v-if="!pageLoadnig">
    	<div class="card-header">
        	<h3 class="card-title">{{ trans('templates')}}</h3>
    	</div>
    	<!-- /.box-header -->
        <div class="card-body"  v-if="list.length == 0">
            <center><p>{{ trans('no_data_found') }}</p></center>
        </div>
    	<div class="card-body" v-else>
            <ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
            	<li v-for="(value, name, index) in list" :class="['nav-item']">
            		<a :class="['nav-link', (index === 0) ? 'active':'']" :id="name+'-tab'" data-toggle="pill" :href="'#'+name" role="tab" :aria-controls="name" aria-selected="true">{{trans(name)}}</a>
            	</li>
            </ul>
            <div class="tab-content" id="custom-content-below-tabContent">
              <div v-for="(values, name, index) in list" :class="['tab-pane', 'fade',  (index === 0) ? 'active show': '']" :id="name" role="tabpanel" :aria-labelledby="name">
              	<table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th style="width: 20%">{{trans('name')}}</th>
                      <th style="width: 70%">{{trans('description')}}</th>
                      <th style="width: 10%">{{trans('actions')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="value in values">
                      	<td style="width: 20%">{{value.template_type.name}}</td>
              			<td style="width: 70%">{{trans(value.name)}}</td>
              			<td style="width: 10%"><a class="btn btn-primary" :href="basePath()+'/template/edit/'+value.id" v-tooltip="trans('edit')"><i class="fas fa-edit"></i></a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>            
        </div>
    <!-- ./box-body -->
	</div>
	<div class="row" v-else>
		<custom-loader :duration="4000"></custom-loader>
	</div>
</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
    import Vue from 'vue';
    import { mapGetters } from 'vuex';
    import {getIdFromUrl} from 'helpers/extraLogics';
    import { successHandler, errorHandler } from 'helpers/responseHandler'

    Vue.component('table-actions', require('components/MiniComponent/DataTableComponents/DataTableActions.vue'));

    export default {
    	name : 'templates-list-index',
    	data() {
    		return {
    			plugin : null,
    			id     : null,
    			pageLoadnig : true,
    			list : [],
    		}
    	},

    	beforeMount() {
    		let locationURL = new URL(location.href);
            this.plugin = locationURL.searchParams.get('plugin');
        	this.id = getIdFromUrl(window.location.pathname);
        	this.getTemplatesList();
        },

        methods : {
        	getTemplatesList() {
        		let url = '/api/templates?set_id='+this.id+((this.plugin)?'&plugin='+this.plugin:'');
            axios.get(url).then(res => {
            this.list = res.data.data;
					this.pageLoadnig = false;
					successHandler(res,'template-edit');
					
				}).catch(err => {
					this.pageLoadnig = false;		
					errorHandler(err,'template-edit');
				});
        	}
        },
        components : {

			'alert' : require('components/MiniComponent/Alert'),

			'custom-loader': require("components/MiniComponent/Loader"),

			'loader' : require('components/Client/Pages/ReusableComponents/Loader'),
		}
    }
</script>