<template>

	<div>

		<date-time-field v-if="formField.type === 'date'" type="datetime"  :label="formField.label" :value="selectedValue" :id="formField.unique" :required="false"
			:name="formField.unique" :onChange="onChange" format="MMMM DD YYYY HH:mm" :clearable="true" outputFormat="YYYY-MM-DD HH:mm:ss">
			
		</date-time-field>

		<dynamic-select v-if="formField.type === 'select'" :id="formField.unique" :label="formField.label" :multiple="false" :name="formField.unique" :elements="dropdownOptions" :value="selectedValue" :onChange="onChange" :optionLabel="dropdownLabel">
			
		</dynamic-select>

		<text-field v-if="formField.type === 'text' || formField.type === 'textarea' || formField.type === 'number' || formField.type === 'email'" 
			:id="formField.unique" :label="formField.label" :type="formField.type" :name="formField.unique" :value="selectedValue" :onChange="onChange"
			from="filter">
			
		</text-field>

		<radio-field v-if="formField.type === 'radio'" :name="formField.unique" :label="formField.label" :options="formField.options" :value="selectedValue" 
			:onChange="onChange" from="filter">
				
		</radio-field>

		<checkbox-field v-if="formField.type === 'checkbox'" :name="formField.unique" :label="formField.label" :options="formField.options" 
			:value="selectedValue" :onChange="onChange" from="filter">
				
		</checkbox-field>
	</div>
	
</template>

<script>

import { MULTIPLE_PROPERTY_HELPER, boolean } from 'helpers/extraLogics';

export default {

	name: 'custom-form-fields',

	props: {

		formField: { type: Object, required: true },

		allFields : { type : Array, default : ()=> [] }
	},

	data () {

		return {

			selectedVal : this.formField.value,

			uniqueId : this.formField.unique,

			updatedFields : this.allFields,

			dropdownOptions: [],

			dropdownLabel : 'label'
		}
	},

	watch : { 

		allFields(newValue,oldValue){

			this.updatedFields = newValue;
		},

		formField(newValue,oldValue) {

			this.uniqueId = newValue.unique;

			this.selectedVal = newValue.value;

			if(newValue.type == 'checkbox') {

				this.selectedVal = this.selectedVal.split(',')
			}
		}
	},

	beforeMount() {

		if(this.formField.type === 'select') {
	      
	      this.getSelectFieldOptions()
	   }
	},

	computed : {

		apiInfoUrl () {

      	let apiUrl = MULTIPLE_PROPERTY_HELPER.convertStringOfPropertiesToObject(this.formField.api_info).url;

      	return apiUrl
    	},

    	dropdownKey () {

    		let keyName = MULTIPLE_PROPERTY_HELPER.convertStringOfPropertiesToObject(this.formField.api_info).key;

    		return keyName
    	},

		selectedValue() {

			let index = this.updatedFields.findIndex(obj => obj.unique == this.uniqueId);
			
			if(index != -1){

				if (Array.isArray(this.selectedVal) && this.selectedVal != null) {
				
					let valueArr = [];

					this.selectedVal.forEach(val => {
				
						if(typeof val == 'object'){
				
							valueArr.push(val.label)
				
						} else{
				
							valueArr.push(val)
						}
					})
					
					this.updatedFields[index].value = valueArr.map(val => val).toString();
					
					return this.updatedFields[index].options.filter(option =>valueArr.includes(option.label));
		
				} else if (!boolean(this.updatedFields[index].options)) return (this.selectedVal ? this.selectedVal : '');

				else {

					let objVal = '';

						if(typeof this.selectedVal == 'object'){
							
							objVal = this.selectedVal.label;
						} else{
							
							objVal = this.selectedVal;
						}

						return this.updatedFields[index].options.find((item) => item.label === objVal);		
				}
				
			} else {

				return this.selectedVal;
			}
		}
	},

	methods: {

		getSelectFieldOptions () {
      	
      	if (boolean(this.apiInfoUrl)) {
        		
        		this.fetchOptionListForApiField();
      	
      	} else {
        	
        		this.dropdownOptions = this.formField.options;

        		this.dropdownLabel = 'label'
      	}
    	},

    	// Fetch option list -- specifically for 3rd party api config form-field
    	fetchOptionListForApiField () {

      	axios.get(this.apiInfoUrl).then((response) => {

          	this.dropdownLabel = this.dropdownKey;

          	let finalizedValue = response.data;

          	for(let i in finalizedValue) {

          		finalizedValue[i][this.dropdownLabel] = finalizedValue[i][this.dropdownLabel].toString()
          	}

         	this.dropdownOptions = finalizedValue;
          	
        	}).catch((error) => {
         
          	this.dropdownOptions = [];
        	})
    	},

		// triggered when any form-field value detects any change
		onChange (value, name) {
			
			let index = this.updatedFields.findIndex(obj => obj.unique == name);
			
			if(Array.isArray(value) && value != null){
			
				this.updatedFields[index].value = value.map(obj => obj.label).toString();
				
				this.selectedVal = value;

			} else if(typeof value == 'object' && value != null){
			
				this.updatedFields[index].value = value[this.dropdownLabel];

				this.selectedVal = value;

			}  else {
			
				this.updatedFields[index].value = value ? value : ''  

				this.selectedVal = value ? value : '';

			}
			
			this.$emit('updated',this.updatedFields);
		}
	},

	components: {
	 
		'dynamic-select': require('components/MiniComponent/FormField/DynamicSelect'),
		
		'text-field': require('components/MiniComponent/FormField/TextField'),
		
		'radio-field': require('components/Common/Form/RadioField'),
		
		'checkbox-field': require('components/Common/Form/CheckboxField'),
		
		'date-time-field': require('components/MiniComponent/FormField/DateTimePicker'),
	}
};
</script>