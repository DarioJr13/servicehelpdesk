<template>
	
	<div class="card card-light" :class="{'note-card' : !replyZindex}">
		
		<div class="card-header">

			<h3 class="card-title">{{trans('add_note')}}</h3>
		</div>

		<div class="card-body">
		
			<div  class="form-group">
							
				<div class="row mr-3" :key="counter">
				
					<template>
						
						<time-field v-if="getTicketActions.show_thread_worktime && !fieldLoader" :label="trans('worktime')" :formStyle="formStyle"
							:value="worktime" type="number" name="worktime" :onChange="onChange" classname="col-sm-12" 
							:required="getTicketActions.require_thread_worktime">
												
						</time-field>
						<dynamic-select v-if="getTicketActions.show_worktime_type && !fieldLoader && worktime" :label="trans('worktime_type')" name="worktime_type" :value="worktime_type"
										:onChange="onChange" :strlength="30" :multiple="false" classname="col-sm-6"
										apiEndpoint="api/worktime-type-list" :required="getTicketActions.require_worktime_type_field && worktime"></dynamic-select>
						<div v-if="getTicketActions.show_thread_worktime && fieldLoader" class="col-sm-6 load_margin">

							<loader :size="30" :duration="4000"></loader>
						</div>

						<add-media :attachments="attachments" :inlineFile="inline" :description="internal_note" classname="col-sm-12" name="internal_note" :onAttach="setAttachments" :onInline="setInlineImages" :onInput="onChange" page_name="internal_note"
						id="focus_editor">
						</add-media>
					</template>

					<div v-if="loading">

	           		<custom-loader :size="60" :duration="4000"></custom-loader>
	        		</div>
				</div>
			</div>
		</div>

		<div class="card-footer">

			<button type="button" class="btn btn-primary" @click="onSubmit" :disabled="!internal_note || loading">

				<i class="fas fa-sync-alt"> </i> {{trans('update')}}
			</button>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios'

	import {errorHandler, successHandler} from 'helpers/responseHandler'

	import { mapGetters } from 'vuex';

    import { validateNoteSettings } from "helpers/validator/noteRules";

	export default {

		name : 'inbox-notes',

		description : 'Inbox Internal Notes Component',

		props : {

			id : { type : String | Number, default : '' },

			updateThreads : { type : Function }
		},

		data() {

			return {

				worktime:0,

                worktime_type: '',

				internal_note : '',

				loading : false,

				formStyle : { width:'24%' },

				fieldLoader : false,

				attachments : [],

				inline : [],

				counter : 0,

				replyZindex : false
			}
		},

		created () {

			window.eventHub.$on('fileModal',this.getModal)
		},

		computed : {

			...mapGetters(['getTicketActions'])
		},

		methods : {

			getModal(value) {

				this.replyZindex = value;
			},

			setAttachments(files){
				this.attachments = files;
			},

			setInlineImages(files){
				this.inline = files;
			},

			onChange(value, name){
				this[name]= value;
			},
            isValid() {

                const { errors, isValid } = validateNoteSettings(this.$data);

                return isValid;
            },
			onSubmit() {
                this.worktime_type = this.worktime_type || '';
                if(this.isValid()) {

                    /** Perform sanity check for required fields */
                    if (!this.internal_note) {
                        return;
                    }

                    this.loading = true;

                    if (this.worktime != 0) {
                        this.saveTimeTrack();
                    }

                    const params = {
                        content: this.internal_note,
                        ticket_id: this.id,
                        is_internal_note: true,
                        attachment: this.attachments
                    }

                    axios.post('api/thread/reply/' + this.id, params).then(res => {
                        this.counter++;
                        this.loading = false;
                        this.internal_note = '';
                        this.attachments = []
                        this.worktime = 0;
                        this.fieldLoader = true;
                        setTimeout(() => {
                            this.fieldLoader = false;
                        }, 1)
                        successHandler(res, 'timeline');

                        this.updateThreads('note');

                    }).catch(err => {
                        this.loading = false;
                        errorHandler(err, 'timeline')
                    })
                }
			},

			saveTimeTrack() {
				
				const data = {};

				data['work_time'] = this.worktime;

				data['entrypoint'] = 'note';

                if(this.worktime_type) {
                    data['worktime_type'] = this.worktime_type.id;
                }
				
				axios.post('ticket/'+this.id+'/time-track',data).then(res=>{
					 
					 this.worktime = 0;
                     this.worktime_type = '';
					 window.eventHub.$emit('refreshTimeTrack')
					 
				}).catch(err=>{
                    this.worktime_type = '';
                    this.worktime = 0;
				})
			}
		},

		components : {
			
			'time-field': require('components/MiniComponent/FormField/TimeField'),
			
			'loader':require('components/Client/Pages/ReusableComponents/Loader'),
			
			"add-media": require("components/MiniComponent/FormField/AddMedia"),

			'custom-loader': require('components/MiniComponent/Loader'),

            'dynamic-select': require('components/MiniComponent/FormField/DynamicSelect'),
		}
	};
</script>

<style scoped>
	
	.load_margin { margin-top: 50px; margin-bottom: 50px; }

	.note-card { z-index: 0; }
</style>