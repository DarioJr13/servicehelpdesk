<template>

		<div class="nav-tabs-custom" :class="{pro_align : language === 'ar' }">
			
			<meta-component :dynamic_title="lang('client-profile-title')" :layout="layout"
				:dynamic_description="lang('client-profile-description')" ></meta-component>

			<alert componentName="edit_profile"/>	
			
			<ul class="nav nav-tabs">
			
				<li v-for="tab in tabs" class="nav-item">
			
					<a id="profile_tab" :class="{ active: current === tab.title, float1 : language === 'ar' }" 
					class="nav-link" data-toggle="tab" @click="onTabChange(tab.title)" href="javascript:;">
			
						{{lang(tab.title)}}
					</a>
				</li>
			</ul>
			
			<div class="tab-content">
			
				<div class="active tab-pane">
			
					<div :class="{'row' : current != 'login-logs' , 'mt-3' : current == 'login-logs'}">
						
						<component :is="currentTabComponent" :layout="layout" :auth="auth" :userId="auth.user_data.id" alertName="edit_profile" :showBtn="true">
							
						</component>

					</div>
				</div>
			</div>
		</div>
</template>

<script>

	export default{

		name : 'client-profile',

		description : 'Client profile component',

		props : {

			layout : { type : Object, default : ()=>{}},
			
			auth : { type : Object, default : ()=>{}},
		},

		data() {

			return {

				current : 'edit_profile',

				tabs : [{title:'edit_profile'},{title:'change_password'},{title:'2-step_verification'},{title:'login-logs'}],

				language : this.layout.language
			}
		},

		computed : {

			currentTabComponent(){
        
          return this.current === 'edit_profile' ? 'edit-profile' : this.current === 'change_password' ? 'change-password' : this.current === '2-step_verification' ? 'two-step' : 'login-logs'
        
        }
		},

		methods : {

     		onTabChange(value) {

				this.$store.dispatch('unsetAlert');

				this.current = value;
			},
     },

		components : {

			'alert' : require('components/MiniComponent/Alert'),

			'edit-profile' : require('components/Client/Pages/ProfileComponents/EditProfile'),
			
			'change-password' : require('components/Client/Pages/ProfileComponents/ChangePassword'),

			'two-step' : require('components/Client/Pages/ProfileComponents/TwoStepVerify'),

			'login-logs' : require('components/Agent/Profile/LoginLogs'),
		}
	};
</script>

<style scoped>
	
	#profile_tab {

		cursor: pointer;
	}
	.pro_align{
		direction: rtl;
	}

	.mt-3 { margin-top: 1.5rem; }
</style>

<style>
	.card-title { float: left; font-size: 1.1rem; font-weight: 400; margin: 0; }

	.card-header>.card-tools { float: right; margin-right: -.625rem;}

	.btn-tool { background-color: transparent; color: rgba(31,45,61,.8);; font-size: .875rem; margin: -.75rem 0; padding: .25rem .5rem;}

	.range_btn { font-size: 13px; }

	.btn-primary { background-color: #337ab7 !important;border-color: #337ab7 !important; }
</style>