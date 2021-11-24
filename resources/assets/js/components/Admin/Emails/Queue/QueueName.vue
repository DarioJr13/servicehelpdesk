<template>

	<span>

		<span v-if="!data.is_configurable">{{data.name}}</span>

		<a v-else :href="basePath()+'/queue/'+data.id">{{data.name}}</a>
		
		<a v-if="data.tooltip_message" v-tooltip="data.tooltip_message" :href="data.document_link" target="_blank">
		
			<i class="fas fa-question-circle"></i>
		</a>
	</span>

</template>

<script>

	import axios from 'axios';

	export default {

		name:"queue-name",

		description: "Queue table name component",

		props: {

			data : { type : Object, required : true },
		},
	};
</script>
