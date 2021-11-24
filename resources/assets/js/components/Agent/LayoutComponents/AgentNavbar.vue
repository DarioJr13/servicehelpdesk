<template>
  
  <nav class="main-header navbar navbar-expand" :class="portal.agent_header_color">
	 	
	 	<ul class="navbar-nav">
			
			<li class="nav-item">
		  	
		  		<a class="nav-link" href="javascript:;" role="button" @click="pushMenu" data-widget="pushmenu"><i class="fas fa-bars"></i></a>
			</li>
		</ul>

	 	<ul class="navbar-nav ml-auto">
			
			<li v-if="auth.user_data.role == 'admin'" class="nav-item">
		  	
		  		<a class="nav-link" :href="basePath()+'/admin'">{{trans('admin_panel')}}</a>
			</li>

			<application-updates v-if="auth.user_data.role == 'admin'"></application-updates>

			<inapp-notification :userId="auth.user_data.id"></inapp-notification>

			<li id="nav-id" class="nav-item">{{navbarMounted()}}</li>

			<language-dropdown :language="userLang"></language-dropdown>

			<li class="nav-item dropdown user-menu">
        		
        		<a href="javascript:;" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">

          		<faveo-image-element id="nav-image" :source-url="auth.user_data.profile_pic" :classes="['user-image img-circle elevation-2']" 
						alternative-text="User Image"/>
          		
          		<span class="d-none d-md-inline" v-tooltip="auth.user_data.full_name">{{subString(auth.user_data.full_name)}}</span>
        		</a>
        		
        		<ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="left: inherit; right: 0px;">

          		<li class="user-header bg-white">
            	
	            	<faveo-image-element id="nav-user-image" :source-url="auth.user_data.profile_pic" :classes="['img-circle elevation-2']" 
							alternative-text="User Image"/>

	            	<p>{{auth.user_data.full_name}} <small class="text-capitalize">{{auth.user_data.role}}</small></p>
	          	</li>
	          
	          	<li class="user-footer">
	            	
	            	<router-link to="/profile" class="btn btn-primary btn-flat">{{trans('profile')}}</router-link>
	            	
	            	<a href="javascript:;" class="btn btn-danger btn-flat float-right" @click="signOut">{{trans('sign_out')}}</a>
	          	</li>	
	        	</ul>
	      </li>
	 	</ul>

	 	<custom-loader v-if="loading"  :animation-duration="4000"/>
 	</nav>
</template>

<script>
	
	import { getSubStringValue } from 'helpers/extraLogics';

	import { mapGetters } from 'vuex';

	export default {

		name : 'agent-top-navbar',

		props : {

			auth : { type : Object, default : ()=>{} },

			portal : { type : Object, default : ()=>{} },
		},

		data() {

			return {

				loading : false
			}
		},

		created() {

			this.togglePush();			
		},

		computed : {

      	userLang(){

	        	return this.auth.user_data.user_language ? this.auth.user_data.user_language : 'en'
	      },

	      ...mapGetters(['getPushMenu'])
	   },

	   methods : {

	   	navbarMounted() {
	   		window.eventHub.$emit('navbar-mounted');
	   	},

	   	subString(value,length = 30){

	        return getSubStringValue(value,length)
	      },

	      signOut(){

	     		this.loading = true;

				axios.post('/auth/logout').then(res=>{

					this.loading = false;

					window.location.href = res.data.data ? res.data.data : this.basePath();

				}).catch(error=>{

					this.loading = false;
				})
			},

			pushMenu() {

				this.$store.dispatch('setPushMenu',!this.getPushMenu);

				this.togglePush()
			},

			togglePush() {

				let element = document.getElementById('agent_body');

				setTimeout(()=>{

					if(this.getPushMenu){

						element.classList.add("sidebar-collapse");	
					
					} else {

						element.classList.remove("sidebar-collapse");	
					}
				},1000);				
			}
	   },

		components : {

			'faveo-image-element': require('components/Common/FaveoImageElement'),

			'language-dropdown' : require('./Mini/AgentLang'),

			'inapp-notification' : require('./Mini/InAppNotification'),

			'application-updates' : require('./Mini/ApplicationUpdates'),

			'loader':require('components/Client/Pages/ReusableComponents/Loader'),
		}
	};
</script>