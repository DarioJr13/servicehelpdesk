<template>

	<div>

		<div class="row" v-if="!hasDataPopulated || loading">

			<custom-loader :duration="4000"></custom-loader>	
		</div>

		<alert componentName="label-create-edit"/>

		<faveo-box v-if="hasDataPopulated" :title="trans(page_title)">
		
			<div class="row">

				<text-field :label="trans('title')" :value="title" 
					type="text" 
					name="title" 
					:onChange="onChange" 
					classname="col-sm-6" 
					:required="true"
					>
				</text-field>

				<number-field :label="trans('order')"
					:value="order"  
					name="order"
					:onChange="onChange"
					classname="col-sm-6" 
					type="number"
					:required="true"
					placeholder="n"
					>		
				</number-field>			
			</div>

			<div class="row">

				<dynamic-select :label="trans('visibility')" :multiple="true"
					:elements="visibility_options" name="visible_to" :value="visible_to" 
					classname="col-sm-4" :onChange="onChange" :required="true">
				</dynamic-select>

				<div class="col-sm-4 form-group" :class="{'has-error' : showErr || colorErr}">
				
					<label> {{ trans('icon_color') }} <span class="text-red"> *</span></label>
			
					<color-picker :color="color" v-model="color" :showError="showErr" :colorError="colorErr"/>

					<div v-if="showErr" class="error-block is-danger">{{trans('this_field_is_required')}}</div>

					<span v-if="!showErr && colorErr" class="is-danger">{{colorErr}}</span>
				</div>

				<div class="col-sm-4" v-if="page_title == 'edit_label'">
					
					<label for="status"> {{ trans('status') }} </label>

					<status-switch name="status" :value="status" :onChange="onChange" :bold="true">
								
					</status-switch>
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
	
	import { validateLabelSettings } from "helpers/validator/labelValidation.js";
	
	export default {
	
		name : 'label-create-edit',
	
		description  : 'Label create edit page',
	
		data(){
	
			return {
	
				page_title : 'create_label',
	
				iconClass : 'fas fa-save',
	
				btnName : 'save',
	
				hasDataPopulated : false,
	
				loading : false,
	
				// essentials
				label_id : '',
	
				title : '',
	
				order : '',
	
				color : '',

				colorErr : '',

				status : 1,

				showErr : false,

				visibility_options:[{ id:"agents",name:"Agents" },{ id : 'team_lead', name : 'Team Lead'}, { id : 'dept_mngr', name : 'Department Manager'}],

				visible_to: "",
			}
		},
	
		beforeMount(){
	
			const path = window.location.pathname
			
			this.getValues(path);
		},
	
		methods : { 
				
			getValues(path){
	
				const labelId = getIdFromUrl(path)
	
				if(path.indexOf('edit') >= 0){
	
					this.page_title = 'edit_label'
	
					this.iconClass = 'fas fa-sync'
	
					this.btnName = 'update'
	
					this.hasDataPopulated = false
	
					this.getInitialValues(labelId)
	
				} else {

					this.loading = false;
	
					this.hasDataPopulated = true;
				}
			},
	
			getInitialValues(id){
				
				this.loading = true
				
				axios.get('/api/label/'+id).then(res=>{
	
					this.loading = false;
	
					this.hasDataPopulated = true
	
					let labelData = res.data.data.label;

					this.label_id = labelData.id;
	
					this.updateStatesWithData(labelData);

					this.status = parseInt(this.status)
				
				}).catch(error=>{
	
					this.loading = false;
		
					errorHandler(error,'label-create-edit')
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

				let arr = this.visible_to.split(',');

				this.visible_to = this.visibility_options.filter(obj => arr.includes(obj.id)).map(obj => obj);
			},
	
			isValid(){
	
				const { errors, isValid } = validateLabelSettings(this.$data);
				
				return isValid;
			},
			
			onChange(value, name) {

				this[name] = value;
			},
		
			onSubmit(){
				
				this.color = this.color == '#' ? '' : this.color;
				
				this.showErr = !this.color ? true : false;

				if(this.isValid() && this.color){
			
					this.loading = true 
		
					let data = {};
					
					data['title'] = this.title;
					
					data['order'] = parseInt(this.order);
					
					data['color'] = this.color;

					data['status'] = this.status ? 1 : 0;

					data['visible_to'] = this.visible_to.map(a => a.id);
					
					let apiUrl =  '/api/label';

					if(this.page_title == 'edit_label') {

						apiUrl = '/api/label-update/'+this.label_id;

						data['_method'] = 'PATCH'
					}

					axios.post(apiUrl, data).then(res => {
						
						this.$store.dispatch('unsetValidationError');
						
						this.colorErr = '';

						this.loading = false
						
						successHandler(res,'label-create-edit')
						
						if(!this.label_id){
						
							this.redirect('/labels')
						
						} else {
						
							this.getInitialValues(this.label_id)
						}
					}).catch(err => {

						if(err.response.data.message && err.response.data.message['color']){

							this.colorErr = err.response.data.message['color'];
						}

						this.loading = false
						
						errorHandler(err,'label-create-edit')					
					});
				}
			}
		},
		components  : {
		
			'alert' : require('components/MiniComponent/Alert'),
		
			'custom-loader' : require('components/MiniComponent/Loader'),
		
			"text-field": require("components/MiniComponent/FormField/TextField"),

			'number-field':require('components/MiniComponent/FormField/NumberField'),

			'color-picker': require('components/MiniComponent/FormField/ColorPicker.vue'),
		
			'faveo-box' : require('components/MiniComponent/FaveoBox'),

			'status-switch':require('components/MiniComponent/FormField/Switch'),

			'dynamic-select':require('components/MiniComponent/FormField/DynamicSelect')
		}
	};
</script> 