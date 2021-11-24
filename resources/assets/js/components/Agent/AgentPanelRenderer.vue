<template>
  
  <router-view v-if="!loading" :auth="updatedAuth" :company="companyInfo" :portal="portalInfo" :whiteLabel="whiteLabel" :tag="tag" :version="version"
  	:dummyInstall="dummyInstall" :isMailConfigured="isMailConfigured">
  	
  </router-view>
</template>

<script>

	export default {

		props : {

			authInfo : { type : Object, default : ()=> {} },

			companyInfo : { type : Object, default : ()=> {} },

			portalInfo : { type : Object, default : ()=> {} },

			whiteLabel : { type : Boolean , default : false},

			tag : { type : String , default : ''},

			version : { type : String , default : ''},

			dummyInstall : { type : Boolean | String, default : '' },

			isMailConfigured : { type : Boolean | String, default : '' }
		},

		data () {

			return {

				updatedAuth : this.authInfo,

				loading : false,

				updatedPortal : this.portalInfo
			}
		},

		watch : {
			
			$route(to, from){
        
	        this.$store.dispatch('unsetAlert');
	        
	        this.$store.dispatch('unsetValidationError');
	      }
		},

		created () {

			window.eventHub.$on('updateAgentProfile',this.updateProfile)
		},

		methods : {

			updateProfile(data) {

				Object.keys(this.updatedAuth.user_data).forEach(k => this.updatedAuth.user_data[k] = data[k] || this.updatedAuth.user_data[k]);
			}
		}
	};
</script>
