<template>
	
	<modal v-if="showModal" :showModal="showModal" :onClose="onClose" :containerStyle="divStyle">

		<div slot="title">
	
			<h4 class="modal-title">{{lang('apply_approval_workflow')}}</h4>
		</div>

		<div v-if="!loading" slot="fields" class="row">
			
			<dynamic-select :label="lang('approval_workflow')" :multiple="false" name="workflow" :required="true"
			 	 classname="col-sm-12" apiEndpoint="/api/dependency/approval-workflows" 
				:value="workflow" :onChange="onChange" :clearable="workflow ? true : false" strlength="60">

			</dynamic-select>
		</div>

		<div class="row" slot="fields" v-if="loading">

			<loader :duration="4000" :size="60"></loader>

		</div>
			
		<button slot="controls" type="button"  @click="onSubmit" class="btn btn-primary" :disabled="isDisabled">
		
			<i class="fas fa-sync-alt"></i> {{lang('update')}}
		</button>
	</modal>
</template>

<script>

	import {errorHandler, successHandler} from 'helpers/responseHandler'

	import axios from 'axios'

	export default {

		name:'apply-approval-workflow',

  		description: 'applies selected workflow on the given ticketId',

		props:{

			showModal : { type : Boolean, default : false },

			onClose : { type : Function },

			ticketId : { type : String | Number, default : '' },

			reloadDetails : { type : Function }
		},

		data(){
			
			return {

				isDisabled:false,

				loading:false,

				workflow : '',

				divStyle : { width : '500px' }
			} 
		},

		beforeMount() {

			this.isDisabled = this.workflow ? false : true;
		},

		methods:{

			onChange(value,name) {

				this[name] = value;

				this.isDisabled = value ? false : true;
			},

			onSubmit(){
				
				this.loading = true;

				this.isDisabled = true;

				const data = {};

				data['ticket_id'] = this.ticketId;

				data['workflow_id'] =  this.workflow.id;

				axios.post('/api/apply-approval-workflow',data).then(res=>{

					window.eventHub.$emit('approvalWorkflowApplied');

					this.reloadDetails('approval');

					successHandler(res,'timeline');

					this.loading = false;

					this.isDisabled = false;

					this.onClose();

				}).catch(err=>{

					errorHandler(err,'timeline');

					this.loading = false;

					this.isDisabled = false;

					this.onClose();
				})
			},
		},

		components:{
			
			'modal':require('components/Common/Modal.vue'),
			
			'loader':require('components/Client/Pages/ReusableComponents/Loader'),

			'dynamic-select': require('components/MiniComponent/FormField/DynamicSelect'),
		},
	};
</script>