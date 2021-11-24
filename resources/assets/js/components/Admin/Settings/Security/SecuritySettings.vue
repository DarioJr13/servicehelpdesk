<template>
	
	<div>
		
		<alert componentName="security"></alert>

		<faveo-box :title="trans('security_settings')">
			
			<div class="row" v-if="!hasDataPopulated || loading">

				<loader :animation-duration="4000" :size="60"/>
			</div>

			<template v-if="hasDataPopulated">

				<div class="row">
					
					<number-field :label="trans('max_attempt')" :value="backlist_threshold" name="backlist_threshold" classname="col-sm-6"
						:onChange="onChange" type="number" :required="true" :hint="trans('security_msg2')">
												
					</number-field>

					<number-field :label="trans('lockout_period')" :value="lockout_period" name="lockout_period" classname="col-sm-6"
						:onChange="onChange" type="number" :required="true" :hint="trans('security_msg3')">
												
					</number-field>	
				</div>
				
				<div class="row">
				
					<text-field :label="trans('lockout_message')" type="textarea" name="lockout_message" :value="lockout_message" :rows="5"
						classname="col-sm-12" :onChange="onChange" :required="true" :hint="trans('security_msg1')">
					</text-field>
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

	import TextField from 'components/MiniComponent/FormField/TextField.vue';

	import NumberField from 'components/MiniComponent/FormField/NumberField.vue';

	import axios from 'axios';

	import { successHandler, errorHandler } from 'helpers/responseHandler';
	
	import { securitySettingsValidation } from 'helpers/validator/securitySettingRules.js';

	export default {

		name : 'security-settings',

		data () {

			return {

				backlist_threshold : '',

				lockout_period : '',

				lockout_message : '',

				loading : false,

				hasDataPopulated : false,

				pageLoad : false,

				securityId : ''
			}
		},

		beforeMount() {

			this.getInitialValues();
		},

		methods : {

			getInitialValues() {

				this.loading = true;

				axios.get('/api/security').then(res=>{

					this.backlist_threshold = res.data.data.backlist_threshold;

					this.lockout_period = res.data.data.lockout_period;
					
					this.lockout_message = res.data.data.lockout_message;

					this.securityId = res.data.data.id;
					
					this.loading = false;

					this.hasDataPopulated = true;

				}).catch(err=>{

					this.loading = false;

					this.hasDataPopulated = true;
				})
			},

			isValid(){

				const { errors , isValid } = securitySettingsValidation(this.$data)

				return isValid
			},


			onChange(value, name) {

				this[name] = value;
			},

			onSubmit() {
			
				if (this.isValid()) {
			
					this.pageLoad = true;
			
					const data = {};

					data['backlist_threshold'] = this.backlist_threshold;

					data['lockout_period'] = this.lockout_period;

					data['lockout_message'] = this.lockout_message;

					data['_method'] = 'PATCH';

					axios.post('/api/security/'+this.securityId, data).then(res => {

						this.pageLoad = false;
						
						successHandler(res,'security');
						
						this.getInitialValues();
						
					}).catch(err => {

						this.pageLoad = false;
					
						errorHandler(err,'security');
					});
				}
			}
		},

		components : {

			'faveo-box' : FaveoBox,

			'alert' : Alert,

			'custom-loader': CustomLoader,

			'loader' : Loader,

			'text-field' : TextField,

			"number-field": NumberField,
		}
	};
</script>