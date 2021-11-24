<template>
	
	<modal v-if="showModal" :showModal="showModal" :onClose="onClose" :containerStyle="containerStyle">

		<div slot="title">
			
			<h4 class="modal-title">{{trans('delete')}}</h4>
		</div>

		<div v-if="!loading" slot="fields">
	
			<dynamic-select v-if="replace" :label="trans(title)" :multiple="false" name="replace_item" :required="true"  :value="replace_item"
				:apiEndpoint="'/api/dependency/'+dependency" :onChange="onChange" :clearable="replace_item ? true : false">
			
			</dynamic-select>

			<span v-else>{{trans('are_you_sure_you_want_to_delete_dependencies')}}</span>
		</div>

		<div slot="alert">
			
			<alert componentName="delete-modal"></alert>	
		</div>

		<div v-if="loading" slot="fields" >
			
			<loader :animation-duration="4000" color="#1d78ff" :size="60"/>
		</div>

		<div slot="controls">
			
			<button type="button" @click = "onClick" class="btn btn-danger" :disabled="isDisabled">

				<i class="fas fa-trash" aria-hidden="true"></i> {{trans('delete')}}
			</button>
		</div>
	</modal>
</template>

<script type="text/javascript">
	
	import axios from 'axios'

	import {errorHandler, successHandler} from 'helpers/responseHandler'

	import { validateDeleteModalSettings } from "helpers/validator/deleteModalRules.js"

	export default {

		name : 'delete-modal',

		description : 'Delete Modal component',

		props:{

			showModal:{type:Boolean,default:false},

			replace : { type : Boolean, default : false },

			dependency : { type : String, default : '' },

			title : { type : String, default : '' },

			deleteUrl:{type:String},

			onClose:{type: Function},

			alertComponentName : { type : String, default : 'dataTableModal'},

			redirectUrl : { type : String, default : ''},

			componentTitle : { type : String, default : ''},

			from : { type : String, default : '' }

		},

		data () {

			return {

				containerStyle : { width:'650px' },

				loading:false,

				isDisabled : false,

				labelStyle : { display:'none' },

				replace_item : '',

				apiUrl : this.deleteUrl
			}
		},

		methods:{

			onChange(value,name) {

				this[name] = value ? value : '';

				this.apiUrl = this.deleteUrl;
			},

			isValid(){
				
				const {errors, isValid} = validateDeleteModalSettings(this.$data);
				
				return isValid
			},

			onClick() {

				if(this.replace) {

					if(this.isValid()){

						this.apiUrl = this.apiUrl+'/'+this.replace_item.id;

						this.onSubmit();
					}
				} else {

					this.onSubmit();
				}
			},

			onSubmit(){
				
				this.loading = true

				this.isDisabled = true;
				
				axios.delete(this.apiUrl).then(res=>{

					successHandler(res,this.alertComponentName);

					this.afterRespond();
				
				}).catch(err => {

					errorHandler(err,'delete-modal');

					this.loading = false;

					this.isDisabled = false;	
				})
			},

			afterRespond(){

				window.eventHub.$emit(this.componentTitle+'refreshData');

				window.eventHub.$emit(this.componentTitle+'uncheckCheckbox');
				
				if(this.redirectUrl){

					if(this.from && this.from == 'agent') {

						setTimeout(()=>{
							this.$router.push({ path : this.redirectUrl })
						},3000);
					} else {
					
						this.redirect(this.redirectUrl);
					}
				}

				if(this.alertComponentName == 'timeline') {

					window.eventHub.$emit('actionDone','external');
				}

				this.onClose();

				this.loading = false;

				this.isDisabled = false;
			}
		},

		components:{
			
			'modal':require('components/Common/Modal.vue'),
			
			'alert' : require('components/MiniComponent/Alert'),
			
			'loader': require('components/Extra/Loader'),

			'dynamic-select':require('components/MiniComponent/FormField/DynamicSelect')
		}
	};
</script>
