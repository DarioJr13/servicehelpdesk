<template>
<div>
	<alert componentName="template-index"></alert>
	<div class="card card-light" v-if="!pageLoad">
    	<div class="card-header">
        	<h3 class="card-title">{{ trans('notifications-channels')}}</h3>
    	</div>
    	<!-- /.box-header -->
    	<div class="card-body">
        	<div class="row">
                <div class="col-md-2 col-sm-6" v-for="channel in channels">
                    <div class="settingiconblue">
                        <div class="settingdivblue">
                            <a :href="basePath()+'/template-sets/list/'+channel.channel_name+((plugin)?'?plugin='+plugin:'')" onclick="sidebaropen(this)" v-tooltip="trans(channel.description)">
                                <span class="fa-stack fa-2x">
                                    <i :class="[channel.icon, 'fa-stack-1x']"></i>
                                </span>
                            </a>
                        </div>
                       <div class="text-center text-sm fw_600">{{ trans(channel.channel_name) }}</div>
                    </div>
                </div>
        	</div>
        <!-- /.row -->
    	</div>
    <!-- ./box-body -->
	</div>
	<div class="row" v-else>
		<custom-loader :duration="4000"></custom-loader>
	</div>
</div>
</template>

<script>
	import {errorHandler, successHandler} from 'helpers/responseHandler'
	import axios from 'axios'

	export default {
		name : 'template-index',
		data () {
			return {
				channels : null,
				pageLoad : true,
				plugin   : null,
			}
		},
		beforeMount() {
			this.plugin = new URL(location.href).searchParams.get('plugin');
			this.getNotificationChannels();
		},

		methods : {
			getNotificationChannels() {
				axios.get('/api/notification-channels').then(res => {
					console.log('in responseHandler');
					this.pageLoad = false;
					this.channels = res.data.data;
					successHandler(res,'template-index');
					
				}).catch(err => {
					console.log('in errorHandler');
					this.pageLoad = false;
					errorHandler(err,'template-index');
				});
			}
		},

		components : {

			'alert' : require('components/MiniComponent/Alert'),

			'custom-loader': require("components/MiniComponent/Loader"),

			'loader' : require('components/Client/Pages/ReusableComponents/Loader'),
		}
	};
</script>
<style type="text/css" scoped>
    .settingiconblue {
    	padding-top: 0.5rem;
    	padding-bottom: 0.5rem;
    }

    .settingdivblue {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        text-align: center;
        border: 5px solid #C4D8E4;
        border-radius: 100%;
        padding-top: 5px;
    }

    .settingdivblue span { margin-top: 3px; }

     .fw_600 { font-weight: 600; }
    .settingiconblue p{
        text-align: center;
        font-size: 16px;
        word-wrap: break-word;
        font-variant: small-caps;
        font-weight: 500;
        line-height: 30px;
    }
</style>