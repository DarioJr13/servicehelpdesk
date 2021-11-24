<template>
  
  <div class="card card-light dashboard-widget-box">
  
    <div class="card-header">
      
      <template v-if="departmentSummary.title">
  
        <h3 class="card-title">
          <i class="fas fa-sitemap" aria-hidden="true"> </i> {{departmentSummary.title}}
        </h3>
        
        <dashboard-help :helplink="departmentSummary.helpLink" :description="departmentSummary.description" />
      </template>
      
      <div class="card-tools">
                  
          <button type="button" class="btn btn-tool" data-card-widget="refresh" @click="refreshData()" v-tooltip="lang('refresh')">
            
            <i class="fas fa-sync-alt"></i>
          </button>
      </div>
    </div>
    
    <div class="card-body scrollable-area" v-if="departmentSummary.data.length > 0">

      <div class="card card-widget widget-user-2 shadow-0" v-for="(department, aindex) in departmentSummary.data" :key="aindex">
        
        <div class="widget-user-header" style="padding: 0px;">
        
          <h3 class="widget-user-username widget-name">{{department.title}}</h3>
        </div>
        
        <div class="card-footer p-0">
        
          <ul class="nav flex-column bg-white">
        
            <li  class="nav-item" v-for="(attribute, index) in department.attributes" :key="index">

              <a class="nav-link">{{attribute.key}} 

                <span class="float-right badge bg-primary font-14 pad-0">
                  
                  <router-link :to="getRoute(attribute.value,'href')" :class="getRoute(attribute.value,'className')">{{getRoute(attribute.value,'textContent')}}

                    </router-link>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <infinite-loading @infinite="getDataFromServer">
          <div slot="spinner"></div>
          <div slot="no-results"></div>
          <div slot="no-more"></div>
        </infinite-loading>
    </div>
    <div v-if="hasDataFetched && departmentSummary.data.length === 0 && !refresh" class="no-data-section">{{lang('no_data_available')}}</div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios';
import { errorHandler } from 'helpers/responseHandler';

	export default {
		
    name : 'dashboard-department-summary',
  
		data: () => {
			return {
        departmentSummary: {
          title: '',
          data: []
        },
        hasDataFetched: false,
        page : 1,
        refresh : false
      }
    },
    
    beforeMount() {
      this.getDataFromServer();
    },
		
		methods: {

      getRoute(value,attr) {

        var parser = new DOMParser();
        
        var doc = parser.parseFromString(value, 'text/html');

        return attr == 'href' ? doc.getElementById('hyper_link')[attr].replace(this.basePath(),'') : doc.getElementById('hyper_link')[attr];
      },

			getDataFromServer($state,isRefresh) {
        this.$store.dispatch('startLoader', this.$options.name);
        axios.get('api/agent/dashboard-report/manager/department-analysis', { params: { page: this.page } })
        .then(response => {
          this.updateData(response.data.data, $state, isRefresh);
        })
        .catch(error => {
          this.refresh = false;
          errorHandler(error, 'dashboard-page', this.$options.name);
        })
        .finally(() => {
          this.$store.dispatch('stopLoader', this.$options.name);
        })
      },

      updateData(responseData, $state, isRefresh) {
        this.departmentSummary.title = responseData.title;
        this.departmentSummary.description = responseData.description;
        this.departmentSummary.helplink = responseData.helpLink;
        if(isRefresh) {            
          this.departmentSummary.data = responseData.data;
        } else {
          this.departmentSummary.data.push(...responseData.data);
        }
        if(responseData.data.length == 0) {
          // mark infinite loader as complete if data length is 0
          $state && $state.complete();
        } else {
          this.page += 1;
        }
        this.hasDataFetched = true;
        this.refresh = false;
      },

      refreshData() {
        this.refresh = true;
        this.page = 1;
        this.departmentSummary.data = [];
        this.getDataFromServer(undefined, true);
      }
		},

    components: {
      'faveo-image-element': require('components/Common/FaveoImageElement'),
      'dashboard-help': require('../DashboardHelp')
    }
	};
</script>

<style type="text/css" scoped>
.products-list .product-info {
  margin-left: 0px !important;
}
.attribute-value-text {
  font-size: 16px;
}
.shadow-0{ box-shadow: none !important; }

.widget-name {
  margin-left: 0 !important;
  padding-bottom: 5px;
  font-size: 20px !important;
  border-bottom: 1px solid #dfdfdf;
}
.font-14 { font-size: 14px !important; }

.pad-0 { padding: 0px; }
</style>