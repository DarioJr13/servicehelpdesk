<template>

	<li class="nav-item dropdown">

		<a class="nav-link font-1" data-toggle="dropdown" href="javascript:;" 
			v-tooltip="trans('application_updates')">
			
			<i class="fas fa-sync-alt"></i>
			
			<span class="badge badge-warning navbar-badge">{{updatesCount}}</span>
		</a>
		
		<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
			
			<span v-if="!updatesCount" class="dropdown-header">You have {{updatesCount}} update(s)</span>
			
			<template  v-if="updatesCount" >
				
				<span class="dropdown-header">New version(s) available.</span>
				
				<div class="dropdown-divider"></div>

				<a href="javascript:;" class="dropdown-item">
					
					Please <a :href="basePath()+'/check-updates'"> click here </a> to update your system.
				</a>
			</template>
		</div>
	</li>
</template>

<script>
	
	export default {

		name : 'system-updates',

		data() {

			return {

				updatesCount : ''
			}
		},

		beforeMount(){

			this.getUpdate();
		},

		methods : {

			getUpdate(){

				this.loading = true;

				axios.get('/auto-update/notification').then(res=>{

					this.loading = false;

					this.updatesCount = res.data.data.count;
				
				}).catch(err=>{

					this.loading = false;

					this.updatesCount = 0;
				})
			}
		}
	};
</script>

<style scoped>
	
	.navbar-badge { padding : 1px 4px !important; }
</style>