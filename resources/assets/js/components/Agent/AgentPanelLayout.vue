<template>

	<div class="wrapper">

		<agent-nav-bar :auth="auth" :portal="portal"></agent-nav-bar>

		<agent-side-bar :auth="auth" :company="company" :portal="portal"></agent-side-bar>

		<div class="content-wrapper">

			<agent-bread-crumbs></agent-bread-crumbs>

			<div class="content">

				<div class="container-fluid">

					<alert componentName="layout"></alert>

					<div  v-if="dummyInstall" class="alert alert-info alert-dismissible">
						
						<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
							
							<i class="fas fa-warning"></i> 

							<template v-if="auth.user_data.role == 'admin'">
								
								{{trans('dummy_data_installation_message')}}&nbsp;<a :href="basePath()+'/clean-dummy-data'">{{trans('click')}}&nbsp;</a>{{trans('clear-dummy-data')}}
							</template>
							
							<template v-else>{{trans('clear-dummy-data-agent-message')}}</template>
							  
					</div>

					<div v-if="!dummyInstall && !isMailConfigured" class="alert alert-warning">
						  
					  <i class="fas fa-warning"></i>
					  
					  <template v-if="auth.user_data.role == 'admin'">
							{{trans('system-outgoing-incoming-mail-not-configured')}}&nbsp;
							<a :href="basePath()+'/emails/create'">{{trans('confihure-the-mail-now')}}</a>
					  </template>
					  
					  <template v-else> {{trans('system-mail-not-configured-agent-message')}}</template>
					</div>

					<div class="row">
						
						<transition name="fade" mode="out-in">

							<router-view :key="$route.fullPath" :auth="auth"></router-view>
						</transition>

						<vue-progress-bar></vue-progress-bar>
					</div>
				</div>
			</div>
		</div>

		<agent-footer :company="company" :whiteLabel="whiteLabel" :tag="tag" :version="version" :lang="auth.user_data.user_language"></agent-footer>

		<help-widget v-if="!whiteLabel"></help-widget>
	</div>
</template>

<script>

	export default {

		name : 'agent-panel-layout',

		props : {

			auth : { type : Object, default : ()=> {} },

			company : { type : Object, default : ()=> {} },

			portal : { type : Object, default : ()=> {} },

			whiteLabel : { type : Boolean, default : false },

			tag : { type : String , default : ''},

			version : { type : String , default : ''},

			isMailConfigured : { type : Boolean, default : true },

			dummyInstall : { type : Boolean, default : false }
		},

		components : {

			'agent-nav-bar' : require('./LayoutComponents/AgentNavbar'),

			'agent-side-bar' : require('./LayoutComponents/AgentSidebar'),

			'agent-bread-crumbs' : require('./LayoutComponents/AgentBreadcrumbs'),

			'agent-footer' : require('./LayoutComponents/AgentFooter'),

			'help-widget' : require('components/HelpSection/HelpSection'),

			'alert' : require('components/MiniComponent/Alert'),
		}
	};
</script>

<style scoped>
	
	.fade-enter {
	  opacity: 0;
	}

	.fade-enter-active {
	  transition: opacity 0.2s ease;
	}

	.fade-leave {}

	.fade-leave-active {
	  transition: opacity 0.2s ease;
	  opacity: 0;
	}
</style>
