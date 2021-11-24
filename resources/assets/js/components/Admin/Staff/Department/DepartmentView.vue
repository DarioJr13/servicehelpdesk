<template>
	
	<div class="row">

		<div v-if="loading" class="col-sm-12">
					
			<loader :animation-duration="4000" color="#1d78ff" :size="50"/>
		</div>

		<template v-if="!loading">
			
			<div class="col-sm-4">
			
				<dept-details :deptData="deptData"></dept-details>
				
				<dept-managers v-if="dept_managers.length > 0" v-for="(manager,index) in dept_managers" 
					:manager="manager" :key="manager.id">
						
				</dept-managers>
			</div>

			<div class="col-sm-8">
				
				<dept-members :id="deptId"></dept-members>

				<dept-tickets :id="deptId" :name="deptData.name"></dept-tickets> 

				<dept-report :id="deptId"></dept-report>
			</div>
		</template>
	</div>
</template>

<script>

	import {getIdFromUrl} from 'helpers/extraLogics';

	import axios from 'axios'

	export default {

		name : 'department-view',

		description : 'Department view page',

		data() {
			
			return {
				
				deptId : '',

				deptData : '',
				
				dept_managers : [],
				
				loading : true
			}
		},

		beforeMount(){
			
			const path = window.location.pathname;
			
			this.deptId = getIdFromUrl(path);
			
			this.getDeptData(this.deptId)
		},

		methods : {

			getDeptData(id){
				
				axios.get('/api/admin/department-profile/'+id).then(res=>{
					
					this.deptData = res.data.data;

					this.dept_managers = res.data.data.managers
					
					this.loading  = false;

				}).catch(err=>{
					
					this.loading  = false;
				})
			}
		},

		components : {
			
			'dept-details' : require('./Mini/DepartmentDetails.vue'),
			
			'dept-managers' : require('./Mini/DeptManagers.vue'),
			
			'dept-members' : require('./Mini/DepartmentMembers.vue'),
			
			'dept-tickets' : require('./Mini/DepartmentTickets.vue'),
			
			'dept-report' : require('./Mini/DepartmentReport.vue'),
			
			'loader':require('components/Client/Pages/ReusableComponents/Loader'),
		}
	};
</script>