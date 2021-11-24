<template>
	
	<div class="col-sm-12" v-if="ticketNum">

		<alert componentName="timeline"></alert>

		<div v-if="hasDataPopulated && !ticketData" class="alert alert-danger">
		                    
        	{{trans('no-ticket-found')}}
    	</div>

		<div v-if="hasDataPopulated" class="card card-light" :style="styleData">
			
			<div class="card-header" v-if="ticketData">

				<h3 class="card-title"><i class="fas fa-ticket-alt"> </i> #{{ticketData.ticket_number}}&rlm;&nbsp;</h3>

				<div class="card-tools timelinebtns">

					<timeline-actions :id="ticketNum"  :data="ticketData" :afterAction="updateTimeline" :actions="getTicketActions" ref="timelineActions" 
						:key="dataCounter">	

						<template slot="left-actions">

							<button type="button" class="btn btn-default btn-xs" :class="{'bg-primary border-b': replyCompBtn == 'hide_reply'}" @click="replyMethod">

								<i class="fas fa-reply"></i> {{trans('reply')}}
							</button>

							<button type="button" class="btn btn-default btn-xs" :class="{'bg-primary border-b': internalCompBtn == 'hide_note'}" @click="noteMethod">

								<i class="fas fa-edit"></i> {{trans('add_note')}}
							</button>

							<button v-if="ticketData.user && !expand" type="button" class="btn btn-xs btn-default"  :class="{'bg-primary border-b': userCompBtn == 'hide_requester'}" @click="userMethod" id="user_btn">
							<i class="fas fa-user"></i> {{trans('requester')}}
						</button>

							<button v-if="fromComp != 'index'" class="btn btn-default btn-xs" @click="reloadTimeline" v-tooltip="trans('refresh')">

								<i class="fas fa-sync-alt"></i>
							</button>

							<button type="button" class="btn btn-xs btn-default" v-tooltip="expand ? trans('show_sidebar') : trans('hide_sidebar')" 
								@click="expandView">

								<i :class="{'fas fa-expand' : !expand, 'fas fa-compress' : expand}"> </i> 
							</button>
						</template>

					</timeline-actions>

					<slot name="headerMenu"></slot>
				</div>
			</div>	

			<div class="card-body" v-if="ticketData">

				<div class="row">
					
					<div class="col-sm-9">

						<h5 class="mr-2">{{ticketData.title}}&nbsp;

							<span>			

								<template v-if="ticketData.is_overdue || ticketData.due_today">
									
									<span v-if="ticketData.is_overdue" v-tooltip="trans('this_ticket_is_marked_as_overdue')" class="badge badge-danger">{{trans('overdue')}}
									
									</span>

									<span v-if="ticketData.due_today" class="badge badge-warning"  v-tooltip="trans('this_ticket_is_marked_as_duetoday')"> 
										{{ trans('due_today') }}
									</span>
								</template>

								<template v-if="!viewAll && ticketData.labels.length > 2">
									
									<template v-for="(label,index) in ticketData.labels.slice(0,2)">
												
										<a  target="_blank" :href="label.href" v-tooltip="trans(label.name)" class="badge mr-1" :style="{'backgroundColor' : label.color, 'color': '#FFF'}">
											{{subString(label.name)}}
										</a>
									</template>
								</template>

								<template v-if="!viewAll && ticketData.tags.length > 2">

									<template v-for="(tag,index) in ticketData.tags.slice(0,2)">			
										
										<a target="_blank" :href="tag.href" v-tooltip="trans(tag.name)" class="badge mr-1" id="ticket_tags">
										
											<i class="fas fa-tag"></i> {{subString(tag.name)}}
										</a>
									</template>
								</template>

								<template v-if="viewAll || (ticketData.labels.length <= 2 && ticketData.tags.length <= 2)">

									<template v-for="(label,index) in ticketData.labels">
													
										<router-link :to="label.href.replace(basePath(),'')" v-tooltip="trans(label.name)" class="badge" 
											:style="{'backgroundColor' : label.color, 'color': '#FFF'}">
											{{subString(label.name)}}
										</router-link>&nbsp;
									</template>

									<template v-for="(tag,index) in ticketData.tags">			
										
										<router-link :to="tag.href.replace(basePath(),'')" v-tooltip="trans(tag.name)" class="badge" id="ticket_tags">
										
											<i class="fas fa-tag"></i> {{subString(tag.name)}}
										</router-link>&nbsp;
									</template>
								</template>

								<a v-if="ticketData.labels.length > 2 || ticketData.tags.length > 2" href="javascript:;" class="badge"
									@click="toggleAll">

									<i class="fas fa-ellipsis-h"> </i> {{getMsg(ticketData)}}
								</a>&nbsp;
							</span>
						</h5>
					</div> 

					<div class="col-sm-3">

						<rating-component v-if="system_ratings && !refresh" url="rating/" v-for="rating in system_ratings" 
							:key="rating.id" :rating="rating" :ticket_id="rating.ticket_id" classname="mb-2 lh-1">
							
						</rating-component>
					</div>
				</div>

				<div class="row">

					<div :class="{'col-sm-12' : expand, 'col-sm-8' : !expand}">

						<div id="actions-card">
					
							<ticket-reply v-if="replyCompBtn == 'hide_reply'" :id="ticketNum" :user="replyUser" :ccArray="ticketData.collaborators" :ticket="ticketData"
								:updateThreads="updateTimeline" :key="updateMCE">
								
							</ticket-reply>

							<ticket-note v-if="internalCompBtn == 'hide_note'" :id="ticketNum" :updateThreads="updateTimeline"></ticket-note>
						</div>

						<div class="card card-light card-tabs">
							
							<div class="card-header p-0 pt-2">
			
								<ul class="nav nav-tabs" role="tablist">
									
									<li class="nav-item">
										
										<a class="nav-link" :class="{ active: activityCompBtn == 'hide_activity' }" data-toggle="pill" role="tab" href="javascript:;" 
											@click="activityMethod">
											
											<i class="far fa-comments"> </i> {{trans('ticket_conversation')}}
										</a>
									</li>

									<li class="nav-item">
										
										<a class="nav-link" :class="{ active: activityCompBtn == 'show_activity' }" data-toggle="pill" role="tab" href="javascript:;" 
											@click="activityMethod">
											
											<i class="fas fa-history"> </i> {{trans('ticket_activity')}}
										</a>
									</li>

									<li class="nav-item ml-auto mt-04">
							
										<a v-if="ticketData.is_overdue" class="btn-tool text-small" href="javascript:;" 
											v-tooltip="!getTicketActions.block_ticket_actions ? formattedTime(ticketData.duedate) : '--'" >

											<em>{{ trans('overdue') }} - <b>{{countUpForOverdue}}</b></em>
										</a>

										<a v-if="!ticketData.is_overdue" class="btn-tool text-small" href="javascript:;" 
											v-tooltip="!getTicketActions.block_ticket_actions ? formattedTime(ticketData.duedate) : '--'" >

											<em>{{ trans('due_in') }} - <b>{{countdownForDuedate ? countdownForDuedate : '--'}}</b></em>
										</a>

											<button type="button" class="btn btn-tool" data-card-widget="maximize" @click="maxView"  
					                  	v-tooltip="maximized ? trans('minimize') : trans('maximize')" >
					                  	<i class="fas fa-expand"></i>
					                  </button>
									</li>
								</ul>
							</div>

							<div class="card-body" :class="{'maximized-logs' : maximized}">

								<component  v-bind:is="activityComponent" :ticketId="ticketNum" :key="activityCounter" :maximized="maximized"></component>						
							</div>
						</div>	

						<inbox-associates v-if="hasDataPopulated" :ticketId="ticketNum" :ticketData="ticketData" ref="inboxAssociates">
						
						</inbox-associates>
					</div>

					<div class="col-sm-4" v-if="!expand">
						
						<timeline-user v-if="ticketData.user && userCompBtn == 'hide_requester'" :user="ticketData.user" :org="ticketData.organizations">
						
						</timeline-user>

						<timeline-data :id="ticketNum" :ticket="ticketData" :key="dataCounter" :actions="getTicketActions" :afterAction="updateTimeline">
						
						</timeline-data>
					</div>
				</div>
			</div>
		</div>
		
		<div v-if="loading">
		
			<VclTable :rows="10" :columns="4"></VclTable >
		</div> 
	</div> 
</template>

<script>
	
	import { VclTable   } from 'vue-content-loading';

	import axios from 'axios'

	import { getSubStringValue, scrollToElement } from 'helpers/extraLogics'

	import { mapGetters } from 'vuex';

	import {getIdFromUrl} from 'helpers/extraLogics';

	import { errorHandler, successHandler } from 'helpers/responseHandler'

	export default {

		name : 'ticket-timeline',

		description : 'Ticket Timeline',

		props : {

			ticketId : { type : String | Number, default : '' },

			from : { type : String, default : '' },

			fromComp : { type : String, default : '' },

			updateTable : { type : Function, default :()=>{} },
		},

		data() {

			return {

				ticketNum : this.ticketId,

				ticketData : '',

				loading : true,

				hasDataPopulated : false,

				system_ratings:[],

				ticket_ratings:[],

				refresh : false,

				currentActivity : 'ticket-conversation',

				activityCompBtn : 'hide_activity',

				associateCompBtn : 'show_associates',

				styleObj : {},

				replyCompBtn : 'reply',

				internalCompBtn : 'add_note',

				dataCounter : 0,

				activityCounter : 0,

				replyUser : '',

				updateMCE : 0,

				viewAll : false,

				countdownForDuedate:'',

				countUpForOverdue:'',

				expand : false,

				maximized : false,

				userCompBtn : 'show_requester',
			}
		},

		beforeMount() {

			if(this.from == 'timeline') {

				this.ticketNum = getIdFromUrl(window.location.pathname);
			}
			
			this.getTicketData()
		},

		mounted() {
		
			this.timerActions()
		},

		computed:{

			activityComponent(){
		  
				return this.currentActivity
			},

			styleData() {

				let obj = {};

				if(this.ticketData.priority != null) {

					obj['border-top'] = '3px solid '+this.ticketData.priority.priority_color;
				}

				return obj;
			},

			...mapGetters(['getRatingTypes','formattedTime','getTicketActions','timeDiffForPast','timeDiffForFuture'])
		},

		created(){

			window.eventHub.$on('workflowUpdated',this.updateTimeline);

			window.eventHub.$on('actionDone',this.updateTimeline);

			window.eventHub.$on('showHidedData',this.hideMethod);

			window.eventHub.$on('threadReply', this.replyOnThread);
		},

		methods : {

			getMsg(data){

				let count = data.labels.length + data.tags.length;

				return !this.viewAll ? 'View all '+ count  : 'View less'
			},

			expandView() {
			
				this.expand = !this.expand;
			},

			maxView() {
				
				this.maximized = !this.maximized;
			},

			userMethod() {

				this.userCompBtn = this.userCompBtn == 'hide_requester' ?  'show_requester' : 'hide_requester';
			},

			timerActions() {

				if(this.ticketData.is_overdue) {
					
					this.updateCountUp('duedate');
				
				} else {
					
					this.updateCountDownForDueDate();
				}
			},

			updateCountDownForDueDate(){

				this.countdownForDuedate = this.timeDiffForFuture(this.ticketData.duedate);
								
				if(this.countdownForDuedate === 0){
					
					this.ticketData.is_overdue = true
					
					this.ticketData.due_today = false
					
					this.updateCountUp('duedate');
				}
				else{

					const timer = setTimeout(() => { this.updateCountDownForDueDate(this.ticketData.duedate); }, 1000);
				}
			},

			updateCountUp(dateType){
				
				switch(dateType){
					
					case 'duedate':
						
						this.countUpForOverdue = this.timeDiffForPast(this.ticketData[dateType]);
						break;

					default:
					
						return;
				}
				var self = this;
					
				setTimeout(
						
					function(){
							
						self.updateCountUp(dateType);
				}, 10000);
			},

			toggleAll() {

				this.viewAll = !this.viewAll;
			},

			reloadTimeline() {

				this.hasDataPopulated = false;
				
				this.loading = true;

				this.getTicketData();
			},

			replyOnThread(value){

				this.updateMCE += 1;

				this.replyCompBtn = 'hide_reply';

				this.internalCompBtn = 'add_note';

				this.scrollToTarget('actions-card');

				this.replyUser = value.user;

				setTimeout(()=>{
					
					window.eventHub.$emit('updateContent', value)
				},1000)	
			},

			updateTimeline(from) {

				window.eventHub.$emit('update-sidebar');

				this.updateTable(from);

				if(from == 'external'){

					window.eventHub.$emit('closeTimelineActions');

					this.getTicketData();

					return	
				}

				window.eventHub.$emit('closeTimelineActions');

				this.associateCompBtn = 'show_associates';

				let activityUpdateActions = ['fork','forward'];

				if(activityUpdateActions.includes(from)) {
					
					window.eventHub.$emit('updateTimelineActivity')
				}

				let activityAndThreadUpdateActions = ['status','note','reply'];

				if(activityAndThreadUpdateActions.includes(from)) {
					
					this.activityCounter += 1;

					this.getTicketData();
				}

				let activityAndTicketUpdateActions = ['edit','assign','surrender','department','label','tag','approval','requester','timeline_merge','delete'];

				if(activityAndTicketUpdateActions.includes(from)) {

					window.eventHub.$emit('updateTimelineActivity')

					this.getTicketData();
				}

				if(from == 'duedate') {

					this.loading = true;

					this.hasDataPopulated = false;

					this.ticketData = '';
					
					window.eventHub.$emit('updateTimelineActivity')

					this.getTicketData();
				}
			},

			scrollToTarget(id){

				return scrollToElement(id)
			},

			replyMethod() {

				this.replyCompBtn = this.replyCompBtn == 'reply' ? 'hide_reply' : 'reply';

				this.internalCompBtn = 'add_note'

				if(this.replyCompBtn == 'hide_reply') {

					this.scrollToTarget('actions-card')
				}
			},

			noteMethod() {

				this.internalCompBtn = this.internalCompBtn == 'add_note' ? 'hide_note' : 'add_note';

				this.replyCompBtn = 'reply'

				if(this.internalCompBtn == 'hide_note') {

					this.scrollToTarget('actions-card')
				}
			},

			activityMethod() {

				this.activityCompBtn = this.activityCompBtn == 'show_activity' ?  'hide_activity' : 'show_activity';

				this.currentActivity = this.currentActivity == 'ticket-conversation' ? 'ticket-activity' : 'ticket-conversation';
			},

			hideMethod() {

				this.associateCompBtn = 'hide_associates';

				setTimeout(()=>{

					this.$refs.inboxAssociates.scrollCurrent();

					setTimeout(()=>{

						window.eventHub.$emit('showHideDiv');						
					},1500)
				},1)
			},

			subString(value){

				return getSubStringValue(value,30)
			},

			getTicketData() {

				this.$store.dispatch('setTicketId', this.ticketNum);

				this.$store.dispatch('updateTicketActions',this.ticketNum);

				axios.get('/api/agent/ticket-details/'+this.ticketNum).then(res=>{

					this.dataCounter +=1;

					this.loading = false;

					this.refresh = false;

					this.hasDataPopulated = true;
					
					this.ticketData = res.data.data.ticket;

					this.replyUser = this.ticketData.user;
					
					this.ticket_ratings = this.ticketData.ratings;

					this.ratingTypes(this.getRatingTypes)

					this.timerActions();

				}).catch(err=>{

					this.loading = false;

					this.hasDataPopulated = true;
				});
			},

			ratingTypes(types) {

				this.system_ratings = types;

				var ratingArr=[];

				if(this.ticket_ratings.length != 0){

					for(var i in this.system_ratings){

						for(var j in this.ticket_ratings){

							if(this.system_ratings[i].id == this.ticket_ratings[j].rating_id){
									
								if(this.system_ratings[i].restrict == '' || this.system_ratings[i].restrict == this.ticketData.departments.name || this.system_ratings[i].restrict == 'General'){

									this.system_ratings[i]['rating_value']=this.ticket_ratings[j].rating_value;

									this.system_ratings[i]['ticket_id']=this.ticketData.id;

									ratingArr.push(this.system_ratings[i])

								}
							}
						}
					}
				}
				
				this.system_ratings=ratingArr;
			},
		},

		components : {

			VclTable,

			'timeline-actions':require('./Mini/Timeline/TimelineActions'),

			'timeline-data':require('./Mini/Timeline/TimelineDetails'),

			'timeline-user' : require('./Mini/Timeline/TimelineRequester'),

			'alert' : require('components/MiniComponent/Alert'),

			'rating-component':require('components/MiniComponent/RatingComponent'),

			'ticket-conversation':require('components/Agent/Inbox/View/Mini/Logs/InboxThreads'),
			
			'ticket-activity':require('components/Agent/Inbox/View/Mini/Logs/InboxTicketActivity'),

			'inbox-associates':require('components/Agent/Inbox/View/Mini/Associates/InboxAssociates'),

			'ticket-reply':require('components/Agent/Inbox/View/Mini/Actions/Mini/InboxReply'),

			'ticket-note':require('components/Agent/Inbox/View/Mini/Actions/Mini/InboxNotes'),
		}
	};
</script>

<style scoped>
	
	#timeline_rate { margin-top: -10px; }
	
	#style-3::-webkit-scrollbar-track
	{
		background-color: #f1f1f1;
	  border-radius:10px;
	}

	#style-3::-webkit-scrollbar
	{
		width: 6px;
		background-color: #f1f1f1;
	}

	#style-3::-webkit-scrollbar-thumb
	{
		background-color: #c1c1c1;
	  border-radius: 10px;
	}

	#ticket_tags {
		background-color: lightgray;
		color: #444;
	}

	.timeline_title { width: 95%; }

	.callout a { color: #337ab7 !important; text-decoration: none !important; }

	#act_data{ min-height: 500px;max-height: 500px; overflow-y: auto; }

	#act_data::-webkit-scrollbar-track
	{
		background-color: #f1f1f1;
		border-radius:10px;
	}

	#act_data::-webkit-scrollbar
	{
		width: 6px;
		background-color: #f1f1f1;
	}

	#act_data::-webkit-scrollbar-thumb
	{
		background-color: #c1c1c1;
		border-radius: 10px;
	}

	.badge { font-size: 54% !important; }

	.mt-04 { margin-top: 4px !important; }

	.timelinebtns .btn-xs { font-size: .75rem !important;}

	.border-b { border: 1px solid #337ab7; }

	.maximized-logs { overflow: scroll; }

	.maximized-logs::-webkit-scrollbar-track
  {
    background-color: #f1f1f1;
    border-radius:10px;
  }

  .maximized-logs::-webkit-scrollbar
  {
    width: 6px;
    background-color: #f1f1f1;
  }

  .maximized-logs::-webkit-scrollbar-thumb
  {
    background-color: #c1c1c1;
    border-radius: 10px;
  }
</style>