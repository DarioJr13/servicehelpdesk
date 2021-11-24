<template>
  <div class="col-sm-12">
    <alert componentName="dashboard-page"/>
    <custom-loader :duration="4000" v-if="showLoader" />
    <div class="row" v-if="hasDataPopulated">
      <div class="col-md-12">
        <dashboard-top-widgets :top-widget-count="topWidgetCount"></dashboard-top-widgets>
      </div>

      <div class="col-md-8">
        <dashboard-requires-immediate-action></dashboard-requires-immediate-action>
      </div>

      <div class="col-md-4">
        <dashboard-todo></dashboard-todo>
      </div>

      <template v-if="userRoles.includes('manager') || userRoles.includes('admin')">
        <div class="col-md-6">
          <dashboard-agent-summary></dashboard-agent-summary>
        </div>
        <div class="col-md-6">
          <dashboard-department-summary></dashboard-department-summary>
        </div>
      </template>

      <div class="col-md-8">
        <dashboard-recent-activities></dashboard-recent-activities>
      </div>
      <div class="col-md-4">
        <dashboard-agent-performance-widget></dashboard-agent-performance-widget>
      </div>

      <div class="col-md-12" v-if="userRoles.includes('admin')">
        <dashboard-system-analysis></dashboard-system-analysis>
      </div>

    </div>

    <div v-if="loading" class="row">

      <loader :animation-duration="4000" :size="60"/>
    </div>
  </div>
</template>

<script type="text/javascript">

  import { mapGetters } from "vuex";

  import axios from 'axios';
	
  export default {
		
    name: 'dashboard-page',
  
		data: () => {
			return {
        /** Array of user roles -- used to decide which widget to show/hide */
        userRoles : [],

        topWidgetCount : 3,

        hasDataPopulated : false,

        loading : false
      }
		},

    beforeMount() {

      this.getDashData()
    },
		
		computed: {
    ...mapGetters(['showLoader'])
    },

    methods : {

      getDashData() {

        this.loading = true;

        axios.get('/api/agent/dashboard-data').then(res=>{

          this.userRoles = res.data.data.roles;
          
          this.topWidgetCount = res.data.data.count;

          this.hasDataPopulated = true;
          
          this.loading = false;

        }).catch(err=>{

          this.hasDataPopulated = true;

          this.userRoles = [];
          
          this.topWidgetCount = 0;
          
          this.loading = false;

        })
      }
    },

    beforeDestroy() {
      this.$store.dispatch('forceStopLoader');
    },

		components: {
      'loader':require('components/Client/Pages/ReusableComponents/Loader'),
      'alert': require("components/MiniComponent/Alert"),
      'custom-loader': require("components/MiniComponent/Loader"),
      'dashboard-top-widgets': require('./DasboardTopWidgets'),
      'dashboard-recent-activities': require('./DashboardRecentActivities'),
      'dashboard-todo': require('./DashboardTodo'),
      'dashboard-system-analysis': require('./DashboardSystemAnalysis'),
      'dashboard-requires-immediate-action': require('./DashboardRequiresImmediateAction'),
      'dashboard-agent-summary': require('./ManagerView/AgentsSummary'),
      'dashboard-department-summary': require('./ManagerView/DepartmentSummary'),
      'dashboard-agent-performance-widget': require('./DashboardAgentPerformanceWidget')
		}
	};
</script>

<style type="text/css" scoped>

</style>