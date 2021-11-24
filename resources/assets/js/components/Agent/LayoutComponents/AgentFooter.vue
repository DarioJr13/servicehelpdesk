<template>
	
	<footer class="main-footer">
				
		<div :class="{'float-right' : lang != 'ar', 'float-left' : lang == 'ar'}" class="d-none d-sm-inline">

			<strong>{{trans('version')}}&nbsp;</strong> {{ whiteLabel ? tag : version }}
		</div>
		
		<strong> {{trans('copyright')}} &copy; {{new Date().getFullYear()}}  
		
			<a v-if="company.website" :href="company.website" target="_blank">{{ company.company_name }}.</a>

			<a v-else class="text-primary">{{ company.company_name }}.</a>
		</strong>

		<template v-if="whiteLabel"> {{ trans('all_rights_reserved') }} </template>

		<template v-else>
			
			{{ trans('all_rights_reserved') }}. {{ trans('powered_by') }} <a href="https://www.faveohelpdesk.com/" target="_blank">Faveo</a>
		</template>
	</footer>
</template>

<script>
	
	export default {

		name : 'agent-footer',

		props : {

			company : { type : Object | String, default : '' },

			whiteLabel : { type : Boolean, default : false },

			tag : { type : String , default : ''},

			version : { type : String , default : ''},

			lang : { type : String , default : ''},
		}
	};
</script>