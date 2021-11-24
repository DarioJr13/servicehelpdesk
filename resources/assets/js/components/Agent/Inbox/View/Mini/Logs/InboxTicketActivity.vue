<template>

	<div>

		<div :class="{'scrollable-log' : !maximized}" id="activity_scroll">

			<div class="timeline timeline-inverse" v-if="activityLogs.length > 0">
			
				<template v-for="(log,index) in activityLogs">
						
					<div class="time-label" v-if="checkDate(index)">

						<span class="bg-success">{{formattedDate(log.created_at)}}</span>
					</div>

					<div>

						<i class="far fa-dot-circle"></i>

						<div class="timeline-item">

							<span class="time">

								<i class="far fa-clock"></i> {{formattedTime(log.created_at)}}
							</span>

							<div class="timeline-body" id="log_desc">
									
								<activity-parser :data="log.text"></activity-parser>
							</div>
						</div>
					</div>

					<div v-if="showThreadEnd(index)">

	              <i class="fas fa-history bg-gray"></i>
	            </div>
				</template>

				<infinite-loading @infinite="getLogs" ref="infiniteLoading">		
					<div slot="spinner"></div>								
					<div slot="no-results"></div>
					<div slot="no-more"></div>
				</infinite-loading>
			</div>
			<div v-if="!showLoader && !activityLogs.length">
				<h6 class="text-center">{{trans('no-records')}}</h6>
			</div>
		</div>
		
		<custom-loader :duration="4000" v-if="showLoader" />
	</div>
</template>

<script>

	import { mapGetters } from 'vuex';
	
	import { successHandler, errorHandler } from 'helpers/responseHandler';

	import axios from 'axios';

	import  { getIdFromUrl } from 'helpers/extraLogics';

	export default {

		name : 'inbox-ticket-activity-log',

		description : 'Inbox Ticket Activity Log Component',

		props : {

			ticketId : { type : String | Number, default : '' },

			maximized : { type : Boolean, default : false }
		},

		data() {

			return {

				activityLogs : [],
				
				page : 1,

				showLoader: false,

				ticketNum : this.ticketId
			}
		},

		computed : {

			...mapGetters(['formattedTime','formattedDate'])
		},

		beforeMount() {

			this.getLogs()
		},

		created() {

			window.eventHub.$on('updateTimelineActivity',this.updateLogs)
		},

		watch : {

			showLoader(newValue,oldValue){

				this.showLoader = newValue;

				return newValue
			}
		},

		methods : {

			updateLogs() {

				this.showLoader = true;

				this.activityLogs = [];

				this.page = 1;

				this.getLogs(undefined, true);
			},

			getLogs($state, isRefresh = false) {

				this.showLoader = true;

				 this.ticketNum = this.ticketId ? this.ticketId :  getIdFromUrl(window.location.pathname);

		  		axios.get('/api/agent/ticket-activity-log/'+ this.ticketNum, { params: { page: this.page } }).then(res => {

					if(res.data.data.data.length) {

						if(isRefresh) {
							
							this.activityLogs = res.data.data.data;
						
						} else {
							
							this.activityLogs.push(...res.data.data.data);
						}
											  			
			  			this.page += 1;
					
					} else {
			  			
			  			$state && $state.complete();
					}		

					this.activityLogs.forEach( function(element, index) {

						element['text'] = `<div>`+element['text']+`</div>`
					});	
		  		}).catch(error => {

			 		errorHandler(error, 'inbox-threads');

			 		this.activityLogs = [];
		  		
		  		}).finally(() => {
					
					$state && $state.loaded();

					this.showLoader = false;
		  		})
			},

			checkDate(x){

				if(x==0){

					return true;

				}else{

					var date1=this.formattedDate(this.activityLogs[x-1].created_at);

					var date2=this.formattedDate(this.activityLogs[x].created_at);

					if(date1!=date2){

						return true;
					}
				}
			},

			showThreadEnd(x){

				return x === this.activityLogs.length-1 
			}
		},

		components : {

			'thread-body' : require('./Mini/ThreadBody'),

			'faveo-box': require('components/MiniComponent/FaveoBox'),

			'custom-loader': require('components/MiniComponent/Loader'),

			'activity-parser': require('components/Common/ActivityParser'),
		}
	};
</script>

<style scoped>
	#activity_scroll::-webkit-scrollbar-track
  {
    background-color: #f1f1f1;
    border-radius:10px;
  }

  #activity_scroll::-webkit-scrollbar
  {
    width: 6px;
    background-color: #f1f1f1;
  }

  #activity_scroll::-webkit-scrollbar-thumb
  {
    background-color: #c1c1c1;
    border-radius: 10px;
  }

  .scrollable-log {
    min-height: 120px;
    max-height: 523px;
    overflow-y: auto;
  }
</style>