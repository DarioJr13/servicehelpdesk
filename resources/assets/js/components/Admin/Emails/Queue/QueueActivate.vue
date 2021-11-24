<template>
	
	<modal v-if="showModal" :showModal="showModal" :onClose="onClose" :containerStyle="containerStyle">
		
		<div slot="title">

			<h4 class="modal-title">{{trans('activate')}}</h4>
		</div>
			
		<div v-if="!loading" slot="fields">
				
			<span>{{trans('are_you_sure')}}</span>		 		
		</div>

		<div v-if="loading" class="row" slot="fields" >
				
			<loader :animation-duration="4000" :size="60"/>
		</div>	
						
		<div slot="controls">

			<button  type="button" @click="onSubmit" class="btn btn-primary" :disabled="isDisabled">

				<i class="fas fa-check"></i> {{trans('activate')}}
			</button>
		</div>
	</modal>
</template>

<script type="text/javascript">
	
	import {errorHandler, successHandler} from 'helpers/responseHandler'
	
	import axios from 'axios'
	
	export default {
		
		name : 'queue-activate-modal',
	
		props : {
	
			showModal : { type : Boolean, default : false },
	
			queueId : { type : String | Number, default : '' },
	
			onClose : { type : Function },
		},

		data(){
		
			return {
		
				isDisabled:false,
		
				containerStyle:{ width:'600px' },
		
				loading:false,
			}
		},
		
		methods:{
		
			onSubmit(){
				
				this.loading = true
				
				this.isDisabled = true
		
				axios.post('/api/queue/'+this.queueId+'/activate').then(res=>{
					
					window.eventHub.$emit('QueueIndexrefreshData');
						
					successHandler(res,'dataTableModal')
					
					this.loading = false;
		
					this.isDisabled = false;
						
					this.onClose();
		
				}).catch(err => {
		
					this.loading = false;
					
					this.isDisabled = false;
		
					errorHandler(err,'dataTableModal');
		
					this.onClose();
				})
			}
		},
		
		components:{
			
			'modal':require('components/Common/Modal.vue'),
		
			'loader':require('components/Client/Pages/ReusableComponents/Loader'),
		}
	};
</script>