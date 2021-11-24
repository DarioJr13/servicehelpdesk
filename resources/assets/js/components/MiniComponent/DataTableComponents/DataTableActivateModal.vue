<template>

	<modal v-if="showModal" :showModal="showModal" :onClose="onClose" @close="showModal = false" :containerStyle="containerStyle">
	
		<div slot="title">
			<h4 class="modal-title">{{lang(title)}}</h4>
		</div>
		
		<div v-if="!loading" slot="fields" class="row">
			{{trans('are_you_sure_you_want_to_change_the_status')}}
		</div>
		
		<div v-if="loading" slot="fields">
			<loader :animation-duration="4000" color="#1d78ff" :size="size"/>
		</div>
					
		<div slot="controls">
			<button type="button" id="submit" @click="onSubmit()" :class="btnClass" :disabled="loading">
				<i :class="iconClass" aria-hidden="true"></i> {{lang(btnName)}}</button>
		</div>

	</modal>
</template>

<script type="text/javascript">
	

	// import {validateLdapNameSettings} from "helpers/validator/ldapNameValidation"
	import {errorHandler, successHandler} from 'helpers/responseHandler'
	import axios from 'axios' 

	export default {
		
		name : 'edit-modal',

		description : 'Edit Modal component',

		props:{
			
			/**
			 * status of the modal popup
			 * @type {Object}
			 */
			showModal:{type:Boolean,default:false},

			/**
			 * The function which will be called as soon as user click on the close button        
			 * @type {Function}
			*/
			onClose:{type: Function},

			data : { type : Object , default:()=>{}},

			apiUrl : { type : String , default :''},

			title : { type : String , default :''}

		},

		data:()=>({
			
			name :'',

			/**
			 * buttons disabled state
			 * @type {Boolean}
			 */
			isDisabled:false,

			/**
			 * width of the modal container
			 * @type {Object}
			 */
			containerStyle:{
				width:'500px'
			},

			/**
			 * initial state of loader
			 * @type {Boolean}
			 */
			loading:false,

			/**
			 * size of the loader
			 * @type {Number}
			 */
			size: 60,

			/**
			 * for rtl support
			 * @type {String}
			*/
			lang_locale:'',

			btnName : 'yes',

			btnClass : 'btn btn-primary',

			iconClass : 'fas fa-save'

		}),

		beforeMount() {
			if(this.title === 'edit'){
				this.btnName = 'update'
				this.iconClass = "fas fa-sync-alt"
			}
		},

		created(){
		// getting locale from localStorage
			this.lang_locale = localStorage.getItem('LANGUAGE');
			this.name = this.data.name
		},

		methods:{

		/**
		 * api calls happens here
		 * @return {Void} 
		 */
		onSubmit(){
				this.loading = true
				axios.patch(this.apiUrl,{ id: this.data.id,name:this.name}).then(res=>{
					this.loading = false
					successHandler(res,'dataTableModal');
					window.eventHub.$emit('refreshData');
						this.onClose();
				}).catch(err => {
					this.loading = false
					errorHandler(err,'dataTableModal')
				})
		},
	},

	components:{
		'modal':require('components/Common/Modal.vue'),
		'alert' : require('components/MiniComponent/Alert'),
		'loader': require('components/Extra/Loader'),
		'text-field': require('components/MiniComponent/FormField/TextField'),
	}

};
</script>
