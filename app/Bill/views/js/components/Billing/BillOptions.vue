<template>
	
	<div>
		
		<alert componentName="bill_settings"></alert>

		<faveo-box :title="trans('bill_settings')">
			
			<div class="row" v-if="!hasDataPopulated || loading">

				<loader :animation-duration="4000" :size="60"/>
			</div>

			<template v-if="hasDataPopulated">

				<div class="row">
					
					<div class="form-group col-sm-4">
   					
   					<label for="status">{{trans('show_packages')}}</label><span style="color:red"> *</span><br>
   					
   					<status-switch name="show_packages" :value="show_packages" :onChange="onChange" :bold="true">
   					
   					</status-switch>   
    				</div> 

    				<div class="form-group col-sm-4">
   					
   					<label for="status">{{trans('allowWithoutPackage')}}</label><span style="color:red"> *</span><br>
   					
   					<status-switch name="allowWithoutPackage" :value="allowWithoutPackage" :onChange="onChange" :bold="true">
   					
   					</status-switch>   
    				</div> 

					<number-field :label="trans('invoice-due-by')" :value="invoice_due" name="invoice_due" classname="col-sm-4"
						:onChange="onChange" type="number" :required="true">
												
					</number-field>	
				</div>

				<div class="row">
					
					<div class="col-sm-4 faveo-dynamic-select">
						
						<v-currency-select :label="trans('currency')" v-model="currency"></v-currency-select>
					</div>
				</div>

				<div class="card-footer" slot="actions">

					<button class="btn btn-primary" @click="onSubmit()">
						
						<i class="fas fa-save"></i> {{trans('save')}}
					</button>
				</div>
			</template>
		</faveo-box>

		<div class="row" v-if="pageLoad">

			<custom-loader :duration="4000"></custom-loader>
		</div>
	</div>
</template>

<script>
	
	import FaveoBox from 'components/MiniComponent/FaveoBox';

	import Alert from 'components/MiniComponent/Alert';

	import CustomLoader from "components/MiniComponent/Loader";

	import Loader from 'components/Client/Pages/ReusableComponents/Loader';

	import NumberField from 'components/MiniComponent/FormField/NumberField.vue';

	import StatusSwitch from 'components/MiniComponent/FormField/Switch';

	import axios from 'axios';

	import { successHandler, errorHandler } from 'helpers/responseHandler';

	import { billOptionsValidation } from '../../helpers/validator/billOptionsRules.js';

	import vCurrencySelect from 'vue-currency-select';

	import { boolean } from 'helpers/extraLogics'

	export default {

		name : 'bill-options',

		data () {

			return {

				show_packages : 1,

				allowWithoutPackage : 1,

				invoice_due : '',

				currency : '',

				loading : false,

				hasDataPopulated : false,

				pageLoad : false
			}
		},

		beforeMount() {

			this.getInitialValues();
		},

		methods : {

			getInitialValues() {

				this.loading = true;

				axios.get('/bill/api/get-billing-options').then(res=>{

					this.allowWithoutPackage = boolean(res.data.data.allowWithoutPackage);

					this.currency = res.data.data.currency ? res.data.data.currency : 'USD';
					
					this.invoice_due = res.data.data['invoice-due'];

					this.show_packages = boolean(res.data.data.show_packages);
					
					this.loading = false;

					this.hasDataPopulated = true;

				}).catch(err=>{

					this.loading = false;

					this.hasDataPopulated = true;
				})
			},

			onChange(value, name) {

				this[name] = value;
			},

			isValid(){

				const { errors , isValid } = billOptionsValidation(this.$data)

				return isValid
			},

			onSubmit() {
			
				if (this.isValid()) {
			
					this.pageLoad = true;
			
					const data = {};

					data['allowWithoutPackage'] = this.allowWithoutPackage ? 1 : 0;

					data['currency'] = this.currency;

					data['invoice-due'] = this.invoice_due;

					data['show_packages'] = this.show_packages ? 1 : 0;

					data['_method'] = 'PATCH';

					axios.post('/bill/api/update-billing-options', data).then(res => {

						this.pageLoad = false;
						
						successHandler(res,'bill_settings');
						
						this.getInitialValues();
						
					}).catch(err => {

						this.pageLoad = false;
					
						errorHandler(err,'bill_settings');
					});
				}
			}
		},

		components : {

			'faveo-box' : FaveoBox,

			'alert' : Alert,

			'custom-loader': CustomLoader,

			'loader' : Loader,

			"number-field": NumberField,

			'status-switch' : StatusSwitch,

			vCurrencySelect
		}
	};
</script>

<style>

	@import "~currency-flags/dist/currency-flags.min.css";

	.currency-flag { margin-bottom: -3px; }

	.vcs-select-option-desc { margin-left: 10px; }
</style>