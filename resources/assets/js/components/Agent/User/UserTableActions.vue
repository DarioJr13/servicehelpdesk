<template>

	<div>

		<template v-if="data.from == 'admin'">
			
			<a v-if="data.edit_url" class="btn btn-primary" :href="data.edit_url" v-tooltip="lang('edit')">

				<i class="fas fa-edit"></i>
			</a>

			<div v-if="data.role != 'user'" class="btn-group">
			
				<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" v-tooltip="lang('view')">
				
					<i class="fas fa-eye"></i>
				</button>
			
				<div class="dropdown-menu dropdown-menu-right">
					
					<a class="dropdown-item" :href="data.view_url"> {{trans('view_user')}} </a>

					<a class="dropdown-item" :href="data.agent_view_url"> {{trans('view_agent')}} </a>
				</div>
			</div>

			<a v-if="data.role === 'user'" class="btn btn-primary" :href="data.view_url" 
				v-tooltip="lang('view')">

				<i class="fas fa-eye"></i>
			</a>
		</template>

		<template v-else>
			
			<router-link v-if="data.edit_url" class="btn btn-primary" :to="data.edit_url" v-tooltip="lang('edit')">

				<i class="fas fa-edit"></i>
			</router-link>

			<div v-if="data.role != 'user'" class="btn-group">
			
				<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" v-tooltip="lang('view')">
				
					<i class="fas fa-eye"></i>
				</button>
			
				<div class="dropdown-menu dropdown-menu-right">
					
					<router-link class="dropdown-item" :to="data.view_url"> {{trans('view_user')}} </router-link>

					<router-link class="dropdown-item" :to="data.agent_view_url"> {{trans('view_agent')}} </router-link>
				</div>
			</div>

			<router-link v-if="data.role === 'user'" class="btn btn-primary" :to="data.view_url" 
				v-tooltip="lang('view')">

				<i class="fas fa-eye"></i>
			</router-link>
		</template>
	</div>

</template>

<script type="text/javascript">

	import axios from 'axios';

	import {boolean} from 'helpers/extraLogics'

	export default {

		name:"user-table-actions",

		description: "User table edit componnet",

		props: {

			data : { type : Object, required : true },
		},
	};
</script>
