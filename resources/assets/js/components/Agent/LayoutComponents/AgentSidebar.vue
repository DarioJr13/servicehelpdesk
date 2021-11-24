<template>

	 <aside class="main-sidebar elevation-4" :class="portal.agent_sidebar_color">

	 	<a :href="company.website" class="brand-link text-center" :class="portal.agent_header_color != 'navbar-light' ? portal.agent_header_color : ''">
	      
	      <img :src="portal.logo" alt="AdminLTE Logo" class="brand-image ml-0 float-none">
	      
	    </a>

      <agent-navigation-bar :auth="auth" from="agent"></agent-navigation-bar>
   </aside>
</template>

<script>
	
	export default {

		name : 'agent-sidebar',

		props : {

			company : { type : Object, default : ()=> {} },

			portal : { type : Object, default : ()=> {} },

			auth : { type : Object, default : ()=> {} }
		},

		components : {

			'agent-navigation-bar' : require('components/Navigation/AgentNavigationBar'),
		}
	};
</script>