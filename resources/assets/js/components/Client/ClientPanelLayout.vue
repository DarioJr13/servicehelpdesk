<style>

	@media (min-width: 1200px){

		.container {
	    max-width: 1170px;
		}
	}
	.footer_align{
		direction: rtl;
	}

	.text-small{
		font-size: 14px;
	}

	a:hover{
		text-decoration: none !important;
		color: #0056b3 !important;
	}

	.center-of-page { left: 12% !important;top: 40% !important; }

	.btn-default {
    	background-color: #f8f9fa;
    	border-color: #ddd;
    	color: #444;
	}
  @import 'css/rtl.css';
</style>

<template>
<div>
	<div v-if="getUserLoadStatus" id="page" class="hfeed site text-small">
		
		<header id="masthead" class="site-header" role="banner">
			
			<div class="container">
				
				<client-panel-navigation :layout="layout" :auth="auth"></client-panel-navigation>

				<div id="header-search" class="site-search clearfix">
					
					<client-panel-header-search v-if="layout.kb_settings.status" :layout="layout"></client-panel-header-search>
				</div>
			</div>
		</header>

		<div class="site-hero clearfix" :style="{'background-color' : layout.portal.client_header_color}">
			
			<div class="container">
			
				<client-panel-breadcrumbs :layout="layout"></client-panel-breadcrumbs>
			</div>
		</div>

		<div id="main" class="site-main clearfix">
			<div class="container">
				
				<div class="content-area">
					
					<alert componentName="layout"></alert>

					<router-view :key="$route.fullPath" :auth="auth" :layout="layout"></router-view>
						
					<vue-progress-bar></vue-progress-bar>
				</div>
			</div>
		</div>
		
		<footer id="colophon" class="site-footer" role="contentinfo" :class="{footer_align : layout.language === 'ar'}">
			
			<div class="container">

				<client-panel-footer :layout="layout"></client-panel-footer>

				<div class="row bord">

					<div class="site-info col-md-6" :class="{'float1 align1' : layout.language === 'ar'}">

						<client-panel-copyright :layout="layout"></client-panel-copyright>
					</div>

					<div class="site-social text-right col-md-6" :class="{'left rem' : layout.language === 'ar'}">
							
						<client-panel-social-widgets :layout="layout"></client-panel-social-widgets>
					</div>
				</div>
			</div>
		</footer>
	</div>

	<div v-else class="row">
    
    <client-panel-loader :size="100" :color="layout.portal.client_header_color"></client-panel-loader>
  </div>

</div>
</template>

<script>
	
	import { mapGetters } from 'vuex';

	export default {

		name:'client-panel-layout',
		
		description:'Client panel Layout Component',

		props : {

			layout : { type : Object, default : ()=> {}},

			auth : { type : Object | Array, default : ()=> []}
		},

		computed:{

			...mapGetters(['getUserLoadStatus']),
		},

		components:{
			
			'client-panel-navigation' : require('components/Client/ClientPanelLayoutComponents/Header.vue'),
			
			'client-panel-header-search' : require('components/Client/ClientPanelLayoutComponents/Search.vue'),
			
			'client-panel-breadcrumbs' : require('components/Client/ClientPanelLayoutComponents/Breadcrumbs.vue'),
			
			'client-panel-footer' : require('components/Client/ClientPanelLayoutComponents/Footer.vue'),
			
			'client-panel-copyright' : require('components/Client/ClientPanelLayoutComponents/CopyRight.vue'),
			
			'client-panel-social-widgets' : require('components/Client/ClientPanelLayoutComponents/SocialWidgets.vue'),

			'client-panel-loader' : require('components/Client/ClientPanelLayoutComponents/ReusableComponents/Loader.vue'),

			'alert' : require('components/MiniComponent/Alert'),
		},
	};
</script>