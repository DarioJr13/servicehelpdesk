<template>
	
	<modal v-if="showModal" :showModal="showModal" :onClose="onClose" :containerStyle="containerStyle">
		
		<div slot="title">

			<h4 class="modal-title">{{trans('logout-from-all-devices')}}</h4>
		</div>

		<div slot="alert">
			
			<alert componentName="logout-modal"></alert>
		</div>
			
		<div slot="fields">
			
			<text-field v-if="!loading" :label="trans('password')" :value="password" type="password" name="password" :required="true"
					placehold="Enter Password..." :onChange="onChange">
							
			</text-field>
			
			<div v-if="loading" class="row" slot="fields" >
			
				<loader :animation-duration="4000" :size="60"/>
			</div>	
		</div>

		<template slot="controls">

			<button class="btn btn-primary" @click="onSubmit()">
				<i class="fas fa-check"> </i> {{trans('proceed')}}
			</button>
		</template>
	</modal>
</template>

<script type="text/javascript">

	import axios from 'axios'

	import { errorHandler, successHandler } from 'helpers/responseHandler'
	
	export default {
		
		name : 'logout-modal',

		description : 'Logout Modal component',

		props:{
	
			showModal:{type:Boolean,default:false},

			onClose:{type: Function},

			userId : { type : String | Number, default : ''},

			alertName : { type : String, default : 'edit_agent_profile'}
		},

		data(){

			return {

				isDisabled:true,

				containerStyle:{ width:'600px' },

				loading:false,

				password : '',
			}
		},

		methods:{

			onChange(value, name) {

				this[name] = value;
			},

			onSubmit(){

				if(this.password) {

					this.loading=true;

					let data = {};

					data['password'] = this.password;

					axios.post('/api/logoutFromAllDevice/'+this.userId,data).then(res=>{

						this.loading = false;
						
						successHandler(res,this.alertName);

						this.onClose();

					}).catch(err=>{

						this.loading = false;

						errorHandler(err,'logout-modal');

						this.$store.dispatch('unsetValidationError');
					})

				} else {

	      		this.$store.dispatch('setValidationError', {'password' : 'This field is required'})
	      	}
			}
		},

		components:{

			'modal':require('components/Common/Modal.vue'),
		
			'loader':require('components/Client/Pages/ReusableComponents/Loader'),

			'text-field': require('components/MiniComponent/FormField/TextField'),

			'alert' : require('components/MiniComponent/Alert'),
		}
	};
</script>
