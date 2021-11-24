<template>

	<div>

		<div class="row" v-if="!hasDataPopulated || loading">

			<custom-loader :duration="4000"></custom-loader>	
		</div>

		<alert componentName="priority-create-edit"/>

		<faveo-box v-if="hasDataPopulated" :title="trans(page_title)">
		
			<div class="row">

				<text-field :label="trans('priority')" :value="priority" 
					type="text" 
					name="priority" 
					:onChange="onChange" 
					classname="col-sm-6" 
					:required="true"
					>
				</text-field>

				<div class="col-sm-6 form-group" :class="{'has-error' : showErr || colorErr}">
					
					<label> {{ trans('priority_color') }} <span class="text-red">*</span> </label> 

					<color-picker  :color="priority_color" v-model="priority_color" :showError="showErr" :colorError="colorErr" />

					<div v-if="showErr" class="error-block is-danger">{{trans('this_field_is_required')}}</div>

					<span v-if="!showErr && colorErr" class="is-danger">{{colorErr}}</span>
				</div>
			</div>

			<div class="row">

				<text-field :label="trans('priority_desc')" :value="priority_desc" 
					type="textarea" 
					name="priority_desc" 
					:onChange="onChange" 
					classname="col-sm-6" 
					:required="true"
					>
				</text-field>

				<radio-button :options="publicOptions" :label="trans('visibility')" name="ispublic" :value="ispublic"
					:onChange="onChange" classname="form-group col-sm-3" >
									
				</radio-button>
			</div>

			<div class="row">
				
				<div class="col-sm-12 mt-2">

					<label class="label_align" name="is_default">

						<input class="checkbox_align" type="checkbox" name="is_default" v-model="is_default"
							:disabled="priority_id && defaultPriority ? true : false">
							&nbsp;{{trans('make-default-priority')}}
					</label>
				</div>
			</div>

			<div  slot="actions" class="card-footer">
				
				<button id="submit_btn" class="btn btn-primary" @click="onSubmit()">

					<i :class="iconClass"></i> {{trans(btnName)}}
				</button>
			</div>
		</faveo-box>
	</div>
</template>

<script>
	
	import axios from 'axios'
	
	import { successHandler, errorHandler } from 'helpers/responseHandler';
	
	import  { getIdFromUrl } from 'helpers/extraLogics';
	
	import { validatePrioritySettings } from "helpers/validator/priorityValidation.js";
	
	export default {
	
		name : 'priority-create-edit',
	
		description  : 'Priority create edit page',
	
		data(){
	
			return {
	
				page_title : 'create_ticket_priority',
	
				iconClass : 'fas fa-save',
	
				btnName : 'save',
	
				hasDataPopulated : false,
	
				loading : false,
	
				// essentials
				priority_id : '',
	
				priority : '',
	
				priority_desc : '',
	
				priority_color : '',

				ispublic : 1,

				publicOptions:[{name:'Public',value:1},{name:'Private',value:0}],

				is_default : false,

				showErr : false,

				colorErr : '',

				defaultPriority : ''
			}
		},
	
		beforeMount(){
	
			const path = window.location.pathname
			
			this.getValues(path);
		},

		watch : {

			priority_color(newValue, oldValue) {

				if(newValue == '#') {

					this.priority_color = '';
				}

				return this.priority_color
			},

			is_default(newValue, oldValue) {

				this.status = newValue ? 1 : this.status;
			}
		},
	
		methods : { 
				
			getValues(path){
	
				const priorityId = getIdFromUrl(path)
	
				if(path.indexOf('edit') >= 0){
	
					this.page_title = 'edit_priority'
	
					this.iconClass = 'fas fa-sync'
	
					this.btnName = 'update'
	
					this.hasDataPopulated = false
	
					this.getInitialValues(priorityId)
	
				} else {

					this.loading = false;
	
					this.hasDataPopulated = true;
				}
			},
	
			getInitialValues(id){
				
				this.loading = true
				
				axios.get('/api/priority/'+id).then(res=>{
	
					this.loading = false;
	
					this.hasDataPopulated = true
	
					let priorityData = res.data.data.priority;

					this.priority_id = priorityData.priority_id;

					this.defaultPriority = priorityData.is_default;
	
					this.updateStatesWithData(priorityData)
				
				}).catch(error=>{
	
					this.loading = false;
		
					errorHandler(error,'priority-create-edit')
				});
			},
	
			updateStatesWithData(data){
	
				const self = this;
				
				const stateData = this.$data;
				
				Object.keys(data).map(key => {
					
					if (stateData.hasOwnProperty(key)) {
					
						self[key] = data[key];
					}
				});
			},
	
			isValid(){
	
				const { errors, isValid } = validatePrioritySettings(this.$data);
				
				return isValid;
			},
			
			onChange(value, name) {

				this[name] = value;
			},
		
			onSubmit(){
				
				this.priority_color = this.priority_color == '#' ? '' : this.priority_color;
				
				this.showErr = !this.priority_color ? true : false;

				if(this.isValid()){

					this.loading = true 
		
					let data = {};
					
					data['priority'] = this.priority;
					
					data['priority_desc'] = this.priority_desc;
					
					data['priority_color'] = this.priority_color;

					data['ispublic'] = this.ispublic ? 1 : 0;

					data['is_default'] = this.is_default ? 1 : 0;
					
					let apiUrl =  '/api/priority';

					if(this.page_title == 'edit_priority') {

						apiUrl = '/api/priority-edit/'+this.priority_id;

						data['_method'] = 'PATCH'
					}

					axios.post(apiUrl, data).then(res => {
					
						this.loading = false
						
						this.colorErr = '';

						successHandler(res,'priority-create-edit')
						
						if(!this.priority_id){
						
							this.redirect('/ticket/priority')
						
						} else {
						
							this.getInitialValues(this.priority_id)
						}
					}).catch(err => {

						this.loading = false

						if(err.response.data.message && err.response.data.message['priority_color']){

							this.colorErr = err.response.data.message['priority_color'];
						}
						
						errorHandler(err,'priority-create-edit')					
					});
				}
			}
		},
		components  : {
		
			'alert' : require('components/MiniComponent/Alert'),
		
			'custom-loader' : require('components/MiniComponent/Loader'),
		
			'text-field': require("components/MiniComponent/FormField/TextField"),

			'radio-button':require('components/MiniComponent/FormField/RadioButton'),

			'color-picker': require('components/MiniComponent/FormField/ColorPicker.vue'),
		
			'faveo-box' : require('components/MiniComponent/FaveoBox')
		}
	};
</script> 