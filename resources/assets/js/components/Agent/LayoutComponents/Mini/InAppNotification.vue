
<template>
	
	<li class="nav-item dropdown">
		
		<a class="nav-link font-1" data-toggle="dropdown" href="javascript:;" @click="getInitialLogs">
			
			<i class="far fa-bell"></i>

			<span class="badge badge-warning navbar-badge">{{notification_count}}</span>
		</a>
		
		<div class="dropdown-menu dropdown-menu-xl dropdown-menu-right">
			
			<span class="dropdown-header">{{trans('you_have')}} {{ show_count }} notification(s)</span>

			<div class="scrollable-ul" id="activity_scroll">

				<div  v-if="handledData.length > 0">
				
					<template v-for="(item,index) in handledData">
							
						<div class="dropdown-divider"></div>

						<a href="javascript:;" @click="makeSeen(item)" class="dropdown-item" :class="{'bg-light' : !item.seen, 'bg-whitte' : item.seen}">
							
							<div class="media">
								
								<faveo-image-element id="size-30" :source-url="item.requester.profile_pic" :classes="['img-size-50 mr-3 img-circle elevation-2']" 
									alternative-text="User Image"/>

								<div class="media-body">
									
									<h3 class="dropdown-item-title text-primary" v-tooltip="item.user">{{subString(item.user)}}</h3>
									
									<p class="text-gray">{{item.message}}</p>
									
									<p class="text-xs text-muted"><i class="far fa-clock mr-1"></i> <i>{{item.created_at}}</i></p>
								</div>
							</div>
						</a>
					</template>

					<infinite-loading @infinite="getLogs" ref="infiniteLoading">		
						<div slot="spinner"></div>								
						<div slot="no-results"></div>
						<div slot="no-more"></div>
					</infinite-loading>
				</div>

				<div v-if="!showLoader && !handledData.length">
					<h6 class="text-center">{{trans('no-records')}}</h6>
				</div>
			</div>
			
			<div v-if="showLoader" class="mb-3">
				<loader  :animation-duration="4000" :size="30"/>
			</div>
		</div>

		<custom-loader v-if="loading"  :animation-duration="4000"/>
	</li>
</template>

<script type="text/javascript">
	
	import axios from 'axios';

	import { mapGetters } from 'vuex';

	import { getSubStringValue } from 'helpers/extraLogics';

	export default {

		props : {

			userId : { type : String | Number, default : ''}
		},

		data(){

			return {

				loading: false,
					
				notifications : [],

				count : 0,

				notification_count : '',

				show_count : 0,

				handledData : [],

				page : 1,

				showLoader: false
			}
		},

		beforeMount(){
			
			this.getCount();
		},

		created() {

			window.eventHub.$on('update-sidebar',this.getCount);
		},

	methods: {
		
		subString(value,length = 30){

        return getSubStringValue(value,length)
      },

		getCount(){

			axios.get('/notification/api/unseen/count').then(res=>{

				this.notification_count = res.data.count > 9 ? "9+" : res.data.count ;

				this.show_count = res.data.count;

			}).catch(error=>{

				this.loading = false;
			})
		},

		getInitialLogs() {

			this.handledData = [];

			this.notifications = [];

			this.page = 1;

			this.getLogs();
		},

		getLogs($state, isRefresh = false) {

			this.showLoader = true;

	  		axios.get('/notification/api', { params: { page: this.page } }).then(res => {

				if(res.data.data.length) {

					if(isRefresh) {
						
						this.notifications = res.data.data;
					
					} else {
						
						this.notifications.push(...res.data.data);
					}
										  			
		  			this.page += 1;
				
				} else {
		  			
		  			$state && $state.complete();
				}		

				this.handleData(this.notifications)

	  		}).catch(error => {

		 		this.notifications = [];
	  		
	  		}).finally(() => {
				
				$state && $state.loaded();

				this.showLoader = false;
	  		})
		},


		handleData(data){

			for(var i in data){

				if (data[i].requester == null) {
						
					data[i]['user']= 'System';
						
					var profile_pic = "themes/default/common/images/system.png";
						
					data[i]['requester']= {'profile_pic':profile_pic};

				} 

				else if(data[i].requester.changed_by_first_name==null && data[i].requester.changed_by_last_name==null &&data[i].requester.changed_by_user_name==null){

					data[i]['user'] = data[i].by;
				} 

				else if(data[i].requester.changed_by_first_name=="" &&data[i].requester.changed_by_last_name=="" &&data[i].requester.changed_by_user_name==""){

					data[i]['user']=data[i].by;
				} 

				else if(data[i].requester.changed_by_first_name=="" &&data[i].requester.changed_by_last_name==""){

					data[i]['user']=data[i].requester.changed_by_user_name;
				} 

				else if(data[i].requester.changed_by_first_name==null &&data[i].requester.changed_by_last_name==null){

					data[i]['user']=data[i].requester.changed_by_user_name;
				} 

				else if(data[i].requester.changed_by_first_name==null){
												
					data[i]['user']=data[i].requester.changed_by_last_name;
				} 

				else if(data[i].requester.changed_by_last_name==null){

					data[i]['user']=data[i].requester.changed_by_first_name;
				} 

				else{
						
					data[i]['user']=data[i].requester.changed_by_first_name+" "+data[i].requester.changed_by_last_name;
				}
			}

			this.handledData = data;
		},

		makeSeen(item){

			let redirectUrl = item.url.includes('panel') ? item.url.replace(this.basePath()+'/panel','') : item.url.replace(this.basePath(),'');

			if(item.seen) {

				this.redirectTo(redirectUrl);

			} else {

				this.loading = true;

				axios.get('/notification/api/seen/'+this.userId+'?notification_id='+item.id).then(res=>{
					
					this.loading = false;

					this.getCount();

					this.redirectTo(redirectUrl);

				}).catch(error=>{
					
					this.loading = false
				})
			}
		},

		redirectTo(redirectUrl) {

			if(redirectUrl.includes('/agent/export/download/')) {

				window.open((this.basePath()+redirectUrl));
			
			} else if(redirectUrl.includes('/service-desk/import-tracking/')){

				window.open((redirectUrl));

			}else {
				
				this.$router.push({ path : redirectUrl })
			}
		}
	},

	components : {
		
		'loader':require('components/Client/Pages/ReusableComponents/Loader'),

		'faveo-image-element': require('components/Common/FaveoImageElement'),
	}
};
</script>

<style type="text/css" scoped>

	#size-30{
		width: 50px !important;
		height: 50px !important;
	}

	.navbar-badge{
		padding : 1px 4px !important;
	}

	.scrollable-ul { max-height: 280px; overflow-y: auto;overflow-x: auto; }

	.scrollable-ul::-webkit-scrollbar-track
  {
    background-color: #f1f1f1;
    border-radius:10px;
  }

  .scrollable-ul::-webkit-scrollbar
  {
    width: 6px;
    background-color: #f1f1f1;
  }

  .scrollable-ul::-webkit-scrollbar-thumb
  {
    background-color: #c1c1c1;
    border-radius: 10px;
  }
</style>