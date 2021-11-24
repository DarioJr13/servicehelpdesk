<template>
<div>
	<alert componentName="template-edit"></alert>
	<loader v-if="loading" />
	<div class="card card-light">
    	<div class="card-header" v-if="template">
        	<h3 class="card-title">{{ template.template_name }} {{trans('template')}}</h3>
    	</div>
    	<!-- /.box-header -->
    	<div class="card-body">
    		<div class="row">
                <div class="col-md-12">
                        <!-- first name -->
                    <p class="lead">{{ trans(name)}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-light">
                        <div class="card-header">
                            <h3 class="card-title">{{trans('list-of-available-shot-codes')}}</h3>
                            <div class="card-tools">
                                <button class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" :title="trans('collapse-list')"><i class="fas fa-minus"></i></button>
                            </div><!-- /.box-tools -->
                        </div><!-- /.box-header -->
                        <div class="card-body col-md-12">
                            <div class="alert alert-info alert-dismissable">
                                <i class="fas  fa-info-circle"></i>
                                <span>{{trans('template-short-code-tips')}}</span>
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            </div>
                        	<div>
                        		<ul class="list-inline" v-if="template">
                            		<li v-for="(description, value) in template.shortCodes" class="list-inline-item" style="width: 23%"><span v-tooltip.right="trans(description)" data-placement="right">{{value}}</span></li>
                        		</ul>
                    		</div>
                        </div><!-- /.box-body -->
                    </div>
                </div>
            </div>
            <div class="row">
            	<div class="col-md-12 form-group">
            		<!-- use subject -->
          			<checkbox v-if="template" name="variable" :value="variable" :label="trans('use_subject')" :onChange="onChange" classname="col-sm-12" :hint="trans('template-subject-usage-info')"/>
          			<text-field v-if="showsubject" :label="trans('subject')" :value="subject" type="text" name="subject" :onChange="onChange" classname="col-sm-6"/>
	          		<tiny-editor-with-validation :value="message" type="text" :onChange="onChange" name="message" :label="trans('content')"	:required="true" classname="col-sm-12 width55" :lang="'en'" :convertURLs="false"></tiny-editor-with-validation>

            	</div>
	    	</div>
    	<!-- ./box-body -->
		</div>
		<div slot="actions" class="card-footer">
            <button type="button" id="submitter"  @click="submit" class="btn btn-primary" :disabled="isDisabled">
                <i class="fas fa-save" aria-hidden="true"></i> {{trans('submit')}}
            </button>
        </div>
	</div>
</div>
</template>
<script type="text/javascript">
	import {errorHandler, successHandler} from 'helpers/responseHandler'
	import {getIdFromUrl} from 'helpers/extraLogics';
	import axios from 'axios'
	import Loader from "components/MiniComponent/Loader";

	export default {
        name : 'template-edit',

        data()  {
        	return {
        		template : null,
        		id       : null,
        		showsubject : false,
        		isDisabled : false,
        		loading : false,
        		variable : false,
        		name: '',
        		message: '',
        		subject : '',
        	}
        },

        beforeMount() {
        	this.id = getIdFromUrl(window.location.pathname);
        	this.getTemplateDetails();
        },

        methods: {
        	getTemplateDetails() {
        		this.toggleLoaders(true);
        		axios.get('/api/get-template/'+this.id).then(res => {
					this.template = res.data.data;
					this.showsubject = this.template.variable == 1;
					this.name = this.template.name;
					this.subject = this.template.subject;
					this.message = this.template.message;
					this.variable = this.template.variable == 1;
					this.toggleLoaders(false);
					successHandler(res,'template-edit');
					
				}).catch(err => {
					this.toggleLoaders(false);				
					errorHandler(err,'template-edit');
				});
        	},
      	
		    onChange(value, name) {
      			this[name] = value;
      			if(name=="variable") {
      				this.showsubject = value;
      			}
   			},

   			submit() {
   				this.toggleLoaders(true);
   				let data = {
   					'subject':this.subject,
   					'variable':this.variable,
   					'message':this.message
   				}
   				axios.patch('api/update-template/'+this.id,data).
   				then(res => {
   					this.toggleLoaders(false);
					successHandler(res,'template-edit');
				}).catch(err => {
					this.toggleLoaders(false);				
					errorHandler(err,'template-edit');
				});
   			},

   			toggleLoaders(value) {
   				this.loading = value;
   				this.isDisabled = value;
   			}
        },

        components: {
        	"text-field": require("components/MiniComponent/FormField/TextField"),
    		alert: require("components/MiniComponent/Alert"),
    		checkbox: require("components/MiniComponent/FormField/Checkbox"),
	    	"tool-tip": require("components/MiniComponent/ToolTip"),
	    	"custom-loader": require("components/MiniComponent/Loader"),
	    	'loader': Loader,
  		}
    }
</script>