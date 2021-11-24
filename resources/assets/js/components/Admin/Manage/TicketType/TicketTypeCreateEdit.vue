<template>

	<div>

		<div class="row" v-if="!hasDataPopulated || loading">

			<custom-loader :duration="4000"></custom-loader>	
		</div>

		<alert componentName="ticket-type-create-edit"/>

		<faveo-box v-if="hasDataPopulated" :title="trans(page_title)">
		
			<div class="row">

				<text-field :label="trans('name')" :value="name" 
					type="text" 
					name="name" 
					:onChange="onChange" 
					classname="col-sm-6" 
					:required="true"
					>
				</text-field>

				<radio-button :options="publicOptions" :label="trans('visibility')" name="ispublic" :value="ispublic"
					:onChange="onChange" classname="form-group col-sm-6" >
									
				</radio-button>
			</div>

			<div class="row">

				<text-field :label="trans('description')" :value="type_desc" 
					type="textarea" 
					name="type_desc" 
					:onChange="onChange" 
					classname="col-sm-12" 
					:required="true"
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
	
	import { validateTicketTypeSettings } from "helpers/validator/ticketTypeValidation.js";
	
	export default {
	
		name : 'ticket-type-create-edit',
	
		description  : 'Ticket Type Create edit page',
	
		data(){
	
			return {
	
				page_title : 'create_ticket_type',
	
				iconClass : 'fas fa-save',
	
				btnName : 'save',
	
				hasDataPopulated : false,
	
				loading : false,
	
				// essentials
				type_id : '',
	
				name : '',

			  	type_desc : '',
	
				ispublic : 1,

				publicOptions:[{name:'Public',value:1},{name:'Private',value:0}],
			}
		},
	
		beforeMount(){
	
			const path = window.location.pathname
			
			this.getValues(path);
		},

		methods : { 
				
			getValues(path){
	
				const typeId = getIdFromUrl(path)
	
				if(path.indexOf('edit') >= 0){
	
					this.page_title = 'edit_ticket_type'
	
					this.iconClass = 'fas fa-sync'
	
					this.btnName = 'update'
	
					this.hasDataPopulated = false
	
					this.getInitialValues(typeId)
	
				} else {

					this.loading = false;
	
					this.hasDataPopulated = true;
				}
			},
	
			getInitialValues(id){
				
				this.loading = true
				
				axios.get('/api/ticket-types/'+id).then(res=>{
	
					this.loading = false;
	
					this.hasDataPopulated = true
	
					let typeData = res.data.data.ticketType;

					this.type_id = typeData.id;

					this.updateStatesWithData(typeData)
				
				}).catch(error=>{
	
					this.loading = false;
		
					errorHandler(error,'ticket-type-create-edit')
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
	
				const { errors, isValid } = validateTicketTypeSettings(this.$data);
				
				return isValid;
			},
			
			onChange(value, name) {

				this[name] = value;
			},
		
			onSubmit(){
						
				if(this.isValid()){
				
					this.loading = true 
		
					let data = {};
					
					data['name'] = this.name;
					
					data['type_desc'] = this.type_desc;
					
					data['ispublic'] = this.ispublic ? 1 : 0;
					
					let apiUrl =  '/api/ticket-types';

					if(this.page_title == 'edit_ticket_type') {

						apiUrl = '/api/ticket-types-edit/'+this.type_id;

						data['_method'] = 'PATCH'
					}

					axios.post(apiUrl, data).then(res => {
					
						this.loading = false
						
						successHandler(res,'ticket-type-create-edit')
						
						if(!this.type_id){
						
							this.redirect('/ticket-types')
						
						} else {
						
							this.getInitialValues(this.type_id)
						}
					}).catch(err => {
						
						this.loading = false
						
						errorHandler(err,'ticket-type-create-edit')					
					});
				}
			}
		},
		components  : {
		
			'alert' : require('components/MiniComponent/Alert'),
		
			'custom-loader' : require('components/MiniComponent/Loader'),
		
			'text-field': require("components/MiniComponent/FormField/TextField"),

			'radio-button':require('components/MiniComponent/FormField/RadioButton'),
		
			'faveo-box' : require('components/MiniComponent/FaveoBox')
		}
	};
</script> 