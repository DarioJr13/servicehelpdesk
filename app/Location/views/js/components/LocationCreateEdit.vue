<template>

	<div>

		<div class="row" v-if="!hasDataPopulated || loading">

			<custom-loader :duration="4000"></custom-loader>	
		</div>

		<alert componentName="location-create-edit"/>

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

				<number-field :label="trans('phone')"
					:value="phone"  
					name="phone"
					:onChange="onChange"
					classname="col-sm-6" 
					type="number"
					:required="false"
					>		
				</number-field>			
			</div>

			<div class="row">
				
				<dynamic-select :label="trans('country')" :multiple="false" name="country_id" classname="col-sm-6" :clearable="country_id ? true : false"
					apiEndpoint="/api/dependency/country-codes?limit=all" :value="country_id" :onChange="onChange" :required="false" strlength="40">
				</dynamic-select>
				
				<dynamic-select :label="trans('state')" :multiple="false" name="state_id" classname="col-sm-6" :required="false" strlength="40"
					:apiEndpoint="stateEndpoint" :value="state_id" :onChange="onChange" 
					:clearable="state_id ? true : false" :disabled="country_id ? false : true">
				</dynamic-select>			
			</div>

			<div class="row">

				<text-field :label="trans('city')" :value="city" type="text" name="city" :onChange="onChange" classname="col-sm-6" :required="false">

				</text-field>

				<text-field :label="trans('pincode')" :value="pincode" type="text" name="pincode" :onChange="onChange" classname="col-sm-6" :required="false">

				</text-field>		
			</div>

			<div class="row">

				<text-field :label="trans('address')" :value="address" 
					type="textarea" 
					name="address" 
					:onChange="onChange" 
					classname="col-sm-12" 
					>
				</text-field>
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
	
	import { validateLocationSettings } from "../helpers/validator/locationValidation.js";
	
	export default {
	
		name : 'location-create-edit',
	
		description  : 'Location create edit page',
	
		data(){
	
			return {
	
				page_title : 'create_location',
	
				iconClass : 'fas fa-save',
	
				btnName : 'save',
	
				hasDataPopulated : false,
	
				loading : false,
	
				// essentials
				location_id : '',
	
				title : '',

				phone : '',
	
				address : '',

				state_id : '',

				country_id : '',

				city : '',

				pincode : ''
			}
		},
		
		computed : {

			stateEndpoint() {

				return this.country_id ? '/api/dependency/states?supplements=' +  this.country_id.id : '/api/dependency/states?supplements='
			}
		},

		beforeMount(){
	
			const path = window.location.pathname
			
			this.getValues(path);
		},
	
		methods : { 
				
			getValues(path){
	
				const locationId = getIdFromUrl(path)
	
				if(path.indexOf('edit') >= 0){
	
					this.page_title = 'edit_location'
	
					this.iconClass = 'fas fa-sync'
	
					this.btnName = 'update'
	
					this.hasDataPopulated = false
	
					this.getInitialValues(locationId)
	
				} else {

					this.loading = false;
	
					this.hasDataPopulated = true;
				}
			},
	
			getInitialValues(id){
				
				this.loading = true
				
				axios.get('/api/location/'+id).then(res=>{
	
					this.loading = false;
	
					this.hasDataPopulated = true
	
					let locationData = res.data.data.location;

					this.location_id = locationData.id;
					
					this.title = locationData.title;

					this.phone = locationData.phone;

					this.address = locationData.address;

					this.city = locationData.city;
					
					this.country_id = locationData.country;

					this.state_id = locationData.state;

					this.pincode = locationData.pin_code;
				
				}).catch(error=>{
	
					this.loading = false;
		
					errorHandler(error,'location-create-edit')
				});
			},
	
			isValid(){
	
				const { errors, isValid } = validateLocationSettings(this.$data);
				
				return isValid;
			},
			
			onChange(value, name) {

				this[name] = value;

				if(name == 'country_id') {

					this.state_id = '';
				}
			},
		
			onSubmit(){
						
				if(this.isValid()){
			
					this.loading = true 
		
					let data = {};
					
					data['title'] = this.title;
					
					if(this.phone) { data['phone'] = this.phone; }

					if(this.address) { data['address'] = this.address; }

					if(this.country_id) { data['country_id'] =  this.country_id.id }

					if(this.state_id && this.country_id) { data['state_id'] =  this.state_id.id }

					if(this.city) { data['city'] =  this.city }
					
					if(this.pincode) { data['pincode'] =  this.pincode }
					
					let apiUrl =  '/api/location';

					if(this.page_title == 'edit_location') {

						apiUrl = '/api/location-update/'+this.location_id;

					}

					axios.post(apiUrl, data).then(res => {
					
						this.loading = false
						
						successHandler(res,'location-create-edit')
						
						if(!this.location_id){
						
							this.redirect('/helpdesk/location')
						
						} else {
						
							this.getInitialValues(this.location_id)
						}
					}).catch(err => {
					
						this.loading = false
						
						errorHandler(err,'location-create-edit')					
					});
				}
			}
		},
		components  : {
		
			'alert' : require('components/MiniComponent/Alert'),
		
			'custom-loader' : require('components/MiniComponent/Loader'),
		
			"text-field": require("components/MiniComponent/FormField/TextField"),

			'number-field':require('components/MiniComponent/FormField/NumberField'),

			'dynamic-select':require('components/MiniComponent/FormField/DynamicSelect'),
		
			'faveo-box' : require('components/MiniComponent/FaveoBox')
		}
	};
</script> 