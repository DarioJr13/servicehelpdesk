<template>

	<div class="row">

		<div class="col-sm-12">
			
			<div class="card card-light">	
			
				<div class="card-header pbt-8" v-if="!actions.block_ticket_actions">

					<div class="card-tools">
							
						<button type="button" class="btn btn-xs btn-default" @click="showEditModal = true">
							
							<i class="far fa-edit"> </i> {{trans('edit')}}
						</button>

						<button  v-if="actions.assign"  type="button" class="btn btn-xs btn-default" @click="showAssignModal = true">
							
							<i  class="far fa-hand-point-right"> </i> {{trans('assign')}}
						</button>

						<div class="btn-group">
			
							<button type="button" class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown" 
								@click="getStatusList()" id="status">
								
								<i class="fas fa-exchange-alt"> </i> {{trans('change_status')}}
							</button>
							
							<div class="dropdown-menu status-list dropdown-menu-right">
									
								<div  v-if="loading" class="row">
										
										<loader :animation-duration="4000" color="#1d78ff" :size="20"/>
								</div>

								<template v-if="!loading">
									
									<template v-if="statusList && statusList.length > 0">
									
										<a v-for="status in statusList" class="dropdown-item"  id="change_status" @click="getStatus(status)" 
											href="javascript:;">
										
											<i :class="status.icon" :style="{color:status.icon_color}"> </i> &nbsp;{{status.name}}
										</a>
									</template>

									<a v-if="statusList && statusList.length === 0" class="dropdown-item"  href="javascript:;">
										{{trans('no-records')}}
									</a>
								</template>
							</div>
						</div>
					</div>
				</div>
			
				<div class="card-body"  id="ticket_data">
					
					<div class="row">
						
						<div class="col-md-12 info-row">

							<div class="row">
								
								<label class="col-sm-6">{{ trans('created_at') }} </label> 

								<a class="col-sm-6" v-tooltip="formattedTime(ticket.created_at)">{{formattedTime(ticket.created_at)}}</a>
							</div>
						</div>

						<div class="col-md-12 info-row">

							<div class="row">
								
								<label class="col-sm-6">{{ trans('updated_at') }} </label> 

								<a class="col-sm-6" v-tooltip="formattedTime(ticket.updated_at)">{{formattedTime(ticket.updated_at)}}</a>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.status">

							<div class="row">

								<label class="col-sm-6">{{ trans('status') }} </label> 

								<router-link class="col-sm-6" v-tooltip="ticket.status.name" :to="ticket.status.href.replace(basePath(),'')">{{subString(ticket.status.name,30)}}
              				
              				</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.last_replier">

							<div class="row">

								<label class="col-sm-6">{{ trans('last_replier') }} </label>

								<router-link class="col-sm-6" v-tooltip="ticket.last_replier.full_name" :to="'user/'+ticket.last_replier.id">
		              			{{subString(ticket.last_replier.full_name,30)}}
		              		</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.user">

							<div class="row">

								<label class="col-sm-6">{{ trans('requester') }} </label>

								<router-link class="col-sm-6" v-tooltip="ticket.user.full_name" :to="ticket.user.href.replace(basePath(),'')">
			              		
			              		{{subString(ticket.user.full_name,30)}}
			              	</router-link>
							</div>                  
						</div>

						<div class="col-md-12 info-row" v-if="ticket.creator">

							<div class="row">

								<label class="col-sm-6">{{ trans('creator') }} </label>

								<router-link class="col-sm-6" v-tooltip="ticket.creator.full_name" :to="ticket.creator.href.replace(basePath(),'')">

			              		{{subString(ticket.creator.full_name,30)}}
			              	</router-link>
							</div>                    
						</div>

						<div class="col-md-12 info-row" v-if="ticket.assignee">

							<div class="row">

								<label class="col-sm-6">{{ trans('assignee') }}</label>
								
								<router-link class="col-sm-6" v-tooltip="ticket.assignee.name" :to="ticket.assignee.href.replace(basePath(),'')">

			              		{{subString(ticket.assignee.name,30)}}
			              	</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.source" >
							
							<div class="row">

								<label class="col-sm-6">{{ trans('source') }}</label> 

								<router-link class="col-sm-6" v-tooltip="ticket.source.name" :to="ticket.source.href.replace(basePath(),'')">

			              		{{subString(ticket.source.name,30)}}
			              	</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.type">
							
							<div class="row">

								<label class="col-sm-6">{{ trans('type') }}</label>

								<router-link class="col-sm-6" v-tooltip="ticket.type.name" :to="ticket.type.href.replace(basePath(),'')">

			              		{{subString(ticket.type.name,30)}}
			              	</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.priority">
							
							<div class="row">

								<label class="col-sm-6">{{ trans('priority') }}</label>
								
								<router-link class="col-sm-6" v-tooltip="ticket.priority.name" :to="ticket.priority.href.replace(basePath(),'')">

			              		{{subString(ticket.priority.name,30)}}
			              	</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.departments">
							
							<div class="row">

								<label class="col-sm-6">{{ trans('departments') }}</label>

								<router-link class="col-sm-6" v-tooltip="ticket.departments.name" :to="ticket.departments.href.replace(basePath(),'')">

			              		{{subString(ticket.departments.name,30)}}
			              	</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.sla_plan">
							
							<div class="row">

								<label class="col-sm-6">{{ trans('sla_plan') }}</label>
								
								<router-link class="col-sm-6" v-tooltip="ticket.sla_plan.name" :to="ticket.sla_plan.href.replace(basePath(),'')">

			              		{{subString(ticket.sla_plan.name,30)}}
			              	</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.helptopic">
							
							<div class="row">

								<label class="col-sm-6">{{ trans('helptopic') }}</label>
								
								<router-link class="col-sm-6" v-tooltip="ticket.helptopic.name" :to="ticket.helptopic.href.replace(basePath(),'')">

			              		{{subString(ticket.helptopic.name,30)}}
			              	</router-link>
							</div>
						</div>

						<div class="col-md-12 info-row" v-if="ticket.location">
							
							<div class="row">

								<label class="col-sm-6">{{ trans('location') }}</label>

								<router-link class="col-sm-6" v-tooltip="ticket.location.name" :to="ticket.location.href.replace(basePath(),'')">

			              		{{subString(ticket.location.name,30)}}
			              	</router-link>
							</div>
						</div>

						<template v-if="timelineData.custom_field_values && timelineData.custom_field_values.length > 0">
							
							<div v-for="customField in timelineData.custom_field_values"  v-if="boolean(customField.value)" class="col-md-12 info-row">
								
								<div class="row">

									<label class="col-sm-6">{{ customField.label }}</label>

									<ul class="col-sm-6" v-if="Array.isArray(customField.value)">

										<li v-for="(value, index) in customField.value">

											<router-link :to="customField.href[index].replace(basePath(),'')" v-tooltip="value">{{subString(value,30)}}&nbsp;</router-link>
										</li>
									</ul>

									<template v-else>

										<router-link  v-if="customField.field_type === 'date'" class="col-sm-6" :to="customField.href.replace(basePath(),'')"  
											v-tooltip="formattedTime(customField.value)">{{ formattedTime(customField.value) }}</router-link>

										<router-link v-else class="col-sm-6" :to="customField.href.replace(basePath(),'')"  v-tooltip="customField.value">
											{{ subString(customField.value,30) }}</router-link>
									</template>
								</div>
							</div>
						</template>

						<div id="timeline-meta-list-box" class="col-sm-12">{{timelineMetaListBoxMounted()}}</div>
					</div>
				</div>
			</div>
		</div>
		
		<transition name="modal">

			<edit-ticket-modal v-if="showEditModal" :onClose="onClose" :showModal="showEditModal" 
				:ticketId="id" componentTitle="timeline" :reloadDetails="reloadData">

			</edit-ticket-modal>
		</transition>

		<transition name="modal">

			<assign-ticket-modal v-if="showAssignModal" :onClose="onClose" :showModal="showAssignModal" 
				:ticketIds="[id]" componentTitle="timeline" :reloadTickets="reloadData">

			</assign-ticket-modal>
		</transition>

		<transition name="modal">

			<change-status-modal v-if="showStatusModal" :onClose="onClose" :showModal="showStatusModal" 
				:ticketIds="[id]" :status="change_status" componentTitle="timeline" :reloadTickets="reloadData">
						
			</change-status-modal>
		</transition>
	</div>
</template>

<script>
	
	import { getSubStringValue, arrayUnique } from 'helpers/extraLogics'

	import { mapGetters } from 'vuex'

	import axios from 'axios';

	export default {

		name : 'timeline-data',

		props : {

			ticket : { type : Object, default : () => {}},

			actions : { type : Object | String, default : '' },

			afterAction : { type : Function, default : ()=>{} },

			id : { type : String | Number, default : '' },
		},

		data() {

			return {

				timelineData : this.ticket,

				showEditModal : false,

				showAssignModal : false,

				showStatusModal : false,

				change_status : '',

				statusList : '',

				loading : false,
			}
		},

		computed:{

			...mapGetters(['formattedTime'])
		},

		watch : {

			ticket(newValue,oldValue) {

				this.timelineData['custom_field_values'] = [];

				setTimeout(()=>{

					this.timelineData = newValue;
				},1000);
			}
		},

		methods :{

			getStatusList(){
				
				this.loading = true;
				
				let params = {meta: true, supplements:arrayUnique([this.id]),limit : 'all'}
	        
				axios.get('/api/dependency/statuses',{params}).then(res =>{
				
					this.loading  = false
				
					this.statusList=res.data.data.statuses;
				
				}).catch(err=>{
				
					this.loading  = false
				})
			},

			getStatus(status){
				
				this.showStatusModal = true
				
				this.change_status = status
			},

			reloadData(from) {
          	
          	this.afterAction(from);
          },

			subString(value,length = 15){
	 
				return getSubStringValue(value,length)
			},

			timelineMetaListBoxMounted(){
					window.eventHub.$emit('timeline-meta-box-mounted', this.ticket);
			},

			onClose() {

         	this.showEditModal = false;

				this.showAssignModal = false;

				this.showStatusModal = false;

				this.$store.dispatch('unsetValidationError');
         }
		},

		components : {

			 'edit-ticket-modal' : require('components/Agent/Inbox/View/Mini/Timeline/Mini/EditTicket'),

         'assign-ticket-modal': require('components/Agent/TicketsComponents/AssignTicketModal'),

         'change-status-modal': require('components/Agent/TicketsComponents/ChangeStatusModal'),

         'loader':require('components/Client/Pages/ReusableComponents/Loader'),
		}
	};
</script>

<style scoped>
	
	#ticket_data{ min-height: 560px;max-height: 560px; overflow-y: auto; }

	#ticket_data::-webkit-scrollbar-track
	{
		background-color: #f1f1f1;
		border-radius:10px;
	}

	#ticket_data::-webkit-scrollbar
	{
		width: 6px;
		background-color: #f1f1f1;
	}

	#ticket_data::-webkit-scrollbar-thumb
	{
		background-color: #c1c1c1;
		border-radius: 10px;
	}

	.info-row { border-top: 1px solid #f4f4f4; padding: 10px; }

	.pbt-8 {
		padding-bottom: 8px !important;
    padding-top: 8px !important;
	}
</style>