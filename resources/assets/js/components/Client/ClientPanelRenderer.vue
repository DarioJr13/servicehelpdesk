<template>
  
  <router-view :auth="updatedAuth" :layout="layout"></router-view>
</template>

<script>

	export default {

		props : {

			layoutDetails : { type : Object, default : ()=> {}},

			authInfo : { type : Object | Array, default : ()=> []}
		},

		data() {

			return {
				updatedAuth : this.authInfo
			}
		},

		created () {

			window.eventHub.$on('updateProfileData',this.updateAuthData)
		},

		beforeMount(){

				this.$store.dispatch('updateUserData',this.authInfo);
		},

		computed:{

			layout() {

				this.$store.dispatch('clientLayoutActions',this.layoutDetails);
				
				return this.layoutDetails
			}
		},

		watch : {
			
			$route(to, from){
        
        this.$store.dispatch('unsetAlert')
      }
		},

		methods : {

			updateAuthData(value) {

				this.updatedAuth = value;
			}
		},
	};
</script>
