<template>

	<div>

		<div class="row" v-if="!hasDataPopulated || loading">

			<custom-loader :duration="4000"></custom-loader>
		</div>

		<alert componentName="worktime-type-create-edit"/>

		<div class="card card-light" v-if="hasDataPopulated">

			<div class="card-header">

				<h3 class="card-title">{{trans(title)}}</h3>
			</div>

			<div class="card-body">

				<div class="row">

					<text-field :label="trans('name')" :value="name"
								type="text"
								name="name"
								:onChange="onChange"
								classname="col-sm-6"
								:required="true">
					</text-field>
				</div>
			</div>

			<div class="card-footer">

				<button id="submit_btn" class="btn btn-primary" @click="onSubmit()">

					<i :class="iconClass"></i> {{trans(btnName)}}
				</button>
			</div>
		</div>
	</div>
</template>

<script>

    import axios from 'axios'

    import { successHandler, errorHandler } from 'helpers/responseHandler';

    import  { getIdFromUrl } from 'helpers/extraLogics';

    import { validateWorktimeTypeSettings } from "../validator/worktimeTypeSettings.js";

    export default {
        name: "worktime-type-create-edit",

        data(){

            return {

                title : 'create_worktime_type',

                iconClass : 'fas fa-save',

                btnName : 'save',

                hasDataPopulated : false,

                loading : false,

                // essentials

                worktime_type_id : '',

                name : ''
            }
        },

        beforeMount(){

            const path = window.location.pathname

            this.getValues(path);
        },

        methods :{

            getValues(path){

                const worktimeTypeId = getIdFromUrl(path)

                if(worktimeTypeId){

                    this.title = 'edit_worktime_type'

                    this.iconClass = 'fas fa-sync'

                    this.btnName = 'update'

                    this.hasDataPopulated = false

                    this.getInitialValues(worktimeTypeId)

                } else {

                    this.loading = false;

                    this.hasDataPopulated = true;
                }
            },

            getInitialValues(id){

                this.loading = true

                axios.get('/api/worktime-type/'+id).then(res=>{

                    this.loading = false;

                    this.hasDataPopulated = true

                    this.name = res.data.data.name;

                    this.worktime_type_id = res.data.data.id;

                }).catch(error=>{

                    this.loading = false;

                    errorHandler(error,'worktime-type-create-edit');

                    this.redirect('/worktime-type/list')
                });
            },

            isValid() {

                const { errors, isValid } = validateWorktimeTypeSettings(this.$data);

                if (!isValid) {

                    return false;
                }
                return true;
            },

            onChange(value, name) {

                this[name] = value;
            },

            onSubmit(){

                if(this.isValid()){

                    this.loading = true

                    let data = {};

                    data['name'] = this.name;

                    let endPoint = '/api/worktime-type/'+this.worktime_type_id;

                    axios.post(endPoint, data).then(res => {

                        this.loading = false

                        successHandler(res,'worktime-type-create-edit')

                        if(!this.worktime_type_id){

                            this.redirect('/worktime-type/list')
                        }
                    }).catch(err => {

                        this.loading = false

                        errorHandler(err,'worktime-type-create-edit')
                    });
                }
            },
        },

        components : {

            'alert' : require('components/MiniComponent/Alert'),

            'custom-loader' : require('components/MiniComponent/Loader'),

            "text-field": require("components/MiniComponent/FormField/TextField")
        }
    };
</script>

<style scoped>

</style>
