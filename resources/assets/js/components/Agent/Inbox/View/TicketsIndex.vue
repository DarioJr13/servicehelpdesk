<template>
	
	<div id="tickets-index">

		<alert componentName="inbox"></alert>

		<div class="card card-light" id="ticket-list-body">

			<div class="card-header">

				<h3 class="card-title">{{trans('tickets')}}</h3>

				<div class="card-tools" v-if="!loading">

					<button type="button" class="btn btn-tool" v-tooltip="trans('filter_tickets')" @click="toggleFilterView()">

						<i class="fas fa-filter"></i>
					</button>

			      <button type="button" class="btn btn-tool" data-card-widget="refresh" @click="refreshIndex()" 
			          	v-tooltip="trans('refresh')">
			            
			        	<i class="fas fa-sync-alt"></i>
			      </button>	
				</div>
			</div>
			
			<div class="card-body">

				<div v-if="!loading" class="row">

					<div class="col-md-12">

						<div class="form-group form-inline float-right VueTables__search">

							<div class="VueTables__search-field">

								<input type="text" class="form-control" placeholder="Search Ticket" v-model="search" autocomplete="off" 
									@keyup="doSearch($event,search)">

							</div>
						</div>

						<div class="form-group float-left VueTables__limit">

							<div class="VueTables__limit-field">

								<button type="button" class="btn btn-default btn-md bg-white cursor_def" v-tooltip="trans('select_all_tickets')">

								 	<select-all :tickets="ticketsArray" :selected="selectedTickets">
																			
									</select-all>
								</button>

								<ticket-actions v-if="selectedTickets.length" :selectedTickets="selectedTickets" :loadTickets="refreshTickets" :page="ticketPage">
					
								</ticket-actions>

								<per-page v-if="perpage" :perpage="perpage" :tableHeader="selectedColor" 
									v-on:ticketCount="handlePageCount">
									
								</per-page>

								<ticket-sorting v-on:sort="sorting" v-on:filter="filtering" :tableHeader="selectedColor"></ticket-sorting>
								
							</div>
						</div>
					</div>
				</div>

				<div v-if="loading" style="padding: 1rem;">
				
					<VclBulletList :rows="5"></VclBulletList>
				</div>

				<div class="row" v-if="hasDataPopulated">

					<custom-loader :duration="4000"></custom-loader>
				</div>
				
				<div class="mailbox-messages mailinbox">

				  	<div v-if="isShowFilter">

					  	<ticket-filter v-on:filter="setFilter" :showFilter="isShowFilter" 
							:closeFilterView="toggleFilterView">
								
						</ticket-filter>
					</div>

					<div class="row ticket-box">
						
						<div v-if="!loading" class="col-md-12 col-sm-12 col-12">

							<table v-if="ticketsArray.length > 0" id="tickets-expanded">
								
								<tbody>
									
									<ticket-details v-for="(ticket,index) in ticketsArray" :ticket="ticket" :key="ticket.id"
										:color="selectedColor" :appendSelect="appendSelect" :onSelect="onTicketSelect"
										:timelineId="timelineId">
											
									</ticket-details>
								</tbody>
							</table>

							<div v-else>
								
								<p class="text-center no-ticket-found">{{trans('no-ticket-found')}}</p>
							</div>
						</div>
					</div>
				</div>

				<div v-if="!loading">
            
	            <div class="mailbox-controls">
	            	
	            	<div class="row">
	            		
	            		<div class="col-sm-6 pad-top-18">
	            			
	            			<span class="show-entry" v-if="ticketResponse.total > 0">Showing {{ticketResponse.from}} 

									<span>to {{ticketResponse.from + ticketsArray.length-1}} of {{ticketResponse.total}} entries</span>

								</span>
	            		</div>
	            		<div class="col-sm-6">
	            			
	            			<div class="float-right">
	                  
			                  <uib-pagination id="ticket-page" v-if="ticketResponse.total > 10" :total-items="ticketResponse.total" 
										v-model="pagination" :max-size="5" class="pagination float-right" :boundary-links="true" :items-per-page="perpage" @change="pageChanged()">
													
									</uib-pagination>
			               </div>
	            		</div>
	            	</div>
	            </div>
	         </div>
			</div>
		</div>

		<div id="ticket-timeline" class="row">
			
			<ticket-timeline  v-if="timelineId" :ticketId="timelineId" :updateTable="reloadData" :key="counter" ref="ticketTimeline" fromComp="index">
						
				<span slot="headerMenu">  
					
					<button class="btn btn-default btn-xs" @click="refreshDetails" v-tooltip="trans('refresh')" href="javascript:;">

						<i class="fas fa-sync-alt"></i>
					</button>

					<button type="button" class="btn btn-default btn-xs" @click="backToInbox" v-tooltip="trans('back_to_inbox')">

						<i class="fas fa-arrow-up"></i>
					</button>

					<button type="button" class="btn btn-default btn-xs" @click="closeTimeline" v-tooltip="trans('close')">
				
						<i class="fas fa-times"></i>
					</button>	
				</span>
			</ticket-timeline>
		</div>
	</div>
</template>

<script>
	
import { VclBulletList } from 'vue-content-loading';

import  { boolean, getIdFromUrl } from 'helpers/extraLogics'

import axios from 'axios';

export default {

	props: {

		selectedColor: { type: String, default: '' },

		ticketPage: { type: String, default: '' },
	},

	data() {

		return {

			buttonStyle: { 'background-color': this.selectedColor + ' !important', 'color': '#fff' },

			loading: true,

			ticketsArray: [],

			ticketResponse: '',

			perpage: '',

			pagination: { currentPage: 1 },

			paramsObj: {},

			hasDataPopulated: false,

			search: '',

			selectedTickets: [],

			timelineId: '',

			url_params: [],

			/**
			 * `isApplyClicked` is true when filter is applied and saved by the user
			 * This is a fix for issue #4896
			 * 
			 * Get filter fileds params from `URL` only when
			 * 1. Redirection
			 * 2. Url parmas changed manualy
			 * 
			 */
			isApplyClicked: false,

			activePage : this.ticketPage,

			isShowFilter : false,

			counter : 0
		}
	},

	beforeMount() {

		if(this.activePage == 'filter'){

			this.activePage = '';

			this.paramsObj['filter_id'] = getIdFromUrl(window.location.pathname);

			this.getTicketList(this.paramsObj)
		} else { 

			this.getTicketList()
		}

		window.eventHub.$emit('update-sidebar');
	},

	created() {

		window.eventHub.$on('refreshInbox', this.getRefreshList);

		window.eventHub.$on('closeTimelineView', this.closeTimeline);
	},

	methods: {

		refreshDetails(){

			this.$refs.ticketTimeline.reloadTimeline();
		},

		backToInbox() {

			var elmnt = document.getElementById('tickets-index');
			
			elmnt.scrollIntoView({ behavior : "smooth"});
		},

		toggleFilterView() {

			this.isShowFilter = !this.isShowFilter;
		},

		reloadData(from) {

			if(from && from == 'duedate') {

				this.ticketsArray = [];

				this.loading = true;
			}

			this.hasDataPopulated = true;

			this.getTicketList(this.paramsObj);
		},

		closeTimeline() {

			var elmnt = document.getElementById('tickets-index');

			elmnt.scrollIntoView({ behavior: "smooth" });

			this.timelineId = '';
		},

		onTicketSelect(id) {

			$('html, body').animate({ scrollTop: $('#ticket-timeline').offset().top-70 }, 'slow');

			this.timelineId = id;

			this.counter += 1;
		},

		refreshTickets() {
			
			this.getRefreshList();

			window.eventHub.$emit("unCheckTicket");

			window.eventHub.$emit('refreshTicket');
		},

		doSearch(event, value) {

			this.commonActions();

			this.paramsObj['page'] = 1;

			this.paramsObj['search-query'] = value.trim();

			this.getTicketList(this.paramsObj);

			this.pagination.currentPage = 1;
		},

		getTicketList(params) {

			let  x = '';

			if(!this.isApplyClicked) {

				var search = location.search.substring(1);
				
				if(search.length!==0){

					this.url_params=JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/%2F/g, '\/') + '"}')
				}

				// Using Object spread syntax for merging filter values
				x = { ...this.handleUrlParamsInTicketFilter(x), ...params};

				params = x ? x : params;
			}

			let category = this.activePage;

			category = category === 'trash' ? 'deleted' : category;

			axios.get('/api/agent/ticket-list?category=' + category, {
				params
			}).then(res => {

				this.loading = false;

				this.hasDataPopulated = false;

				this.ticketResponse = res.data.data;

				this.perpage = parseInt(this.ticketResponse.per_page);

				this.ticketsArray = res.data.data.tickets;

				if(!this.ticketsArray.length && this.pagination.currentPage != 1) {

					this.pagination.currentPage = 1;

					this.paramsObj['page'] = 1;

					this.getTicketList(this.paramsObj);
				}
			}).catch(error => {

				this.loading = false;

				this.hasDataPopulated = false;
			})
		},

		refreshIndex() {

			this.hasDataPopulated = true;

			this.paramsObj['page'] = 1;

			this.getTicketList(this.paramsObj);

			window.eventHub.$emit('update-sidebar');

			this.pagination.currentPage = 1;
		},

		commonActions() {

			this.selectedTickets = [];

			this.hasDataPopulated = true;

			var elmnt = document.getElementById('ticket-list-body');

			elmnt.scrollIntoView({
				behavior: "smooth"
			});
		},

		getRefreshList() {

			this.pagination.currentPage = this.pagination.currentPage;

			this.paramsObj['page'] =  this.pagination.currentPage;

			this.commonActions();

			this.getTicketList(this.paramsObj);
		},

		pageChanged() {

			this.commonActions();

			this.paramsObj['page'] = this.pagination.currentPage;

			this.getTicketList(this.paramsObj)
		},

		handlePageCount(count) {

			this.commonActions();

			this.paramsObj['page'] = 1;

			this.paramsObj['limit'] = count;

			this.getTicketList(this.paramsObj);

			this.pagination.currentPage = 1;
		},

		sorting(payload) {

			this.commonActions();

			this.paramsObj['answered'] = '';

			this.paramsObj['sort-field'] = payload.value;

			this.paramsObj['sort-order'] = payload.order;

			this.getTicketList(this.paramsObj);
		},

		filtering(payload) {

			this.commonActions();

			this.paramsObj['answered'] = payload.value;

			this.getTicketList(this.paramsObj);
		},

		appendSelect(ticketId, checked) {

			if (checked) {

				this.selectedTickets.push(ticketId);
			} else {

				this.selectedTickets.splice(this.selectedTickets.indexOf(ticketId), 1);
			}
		},

		setFilter(payload, scroll, isApplyClicked) {

			this.commonActions();
			this.isApplyClicked = isApplyClicked
			const timeRangeFilterOptions = ['due-on', 'created-at', 'updated-at'];

			for (const key in payload) {
				if (payload.hasOwnProperty(key)) {
					if (timeRangeFilterOptions.includes(key)) {
						payload[key] = payload[key];
					}
				}
			}

			this.pagination.currentPage = 1;
			if (payload.category == '') {
				payload.category = this.url_params['show[]'];
			}
			this.paramsObj = JSON.parse(JSON.stringify(payload));

			this.setParamsAndApplyFilter(this.paramsObj, scroll)
		},

		handleUrlParamsInTicketFilter(filterParams) {		
			// get all parameters from the URL. If search by paramters is true, then
			if (boolean(this.url_params['filter-by-url'])) {
				return this.url_params;
			}
			return filterParams;
		},


		/**
		 * This function will parse the params and apply filter to ticket list
		 * TODO: Need refactoring
		 */
		setParamsAndApplyFilter(parameters, scroll = false) {
			/**
			 * `isApplyClicked` is true when filter is applied and saved by the user
			 * This is a fix for issue #4896
			 * 
			 * Get filter fields params from `URL` only when
			 * 1. Redirection
			 * 2. Url parmas changed manualy
			 * 
			 */
			if (!this.isApplyClicked) {
				let search = location.search.substring(1);
				if (search.length !== 0) {
					this.url_params = JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/%2F/g, '\/') + '"}')
				}
				parameters = this.handleUrlParamsInTicketFilter(parameters);
			}

			//  if(typeof parameters !== 'undefined' && parameters.hasOwnProperty('page')){
			//     $("html, body").animate({ scrollTop: $('#ticket-list-body').offset().top-70 }, 500);
			//  }
			if (this.url_params['show[]'] == "trash") {
				this.url_params['show[]'] = "deleted";
				this.deleteForver = true; // TODO:- Find the purpose of this line
			}

			if (typeof parameters === 'undefined') {
				let params = JSON.parse(JSON.stringify(this.paramsObj));

				//checking if params already have a non empty parameter as category and due_on
				params['category'] = (params['category'] !== undefined) ? params['category'] : this.url_params['show[]'];
				params['filter_id'] = getIdFromUrl(this.currentPath());
				this.getTicketList(params);
			} else {
				//only if scroll is passed as true, this will be scrolled
				if (scroll) {
					window.eventHub.$emit('hideInboxTimeline');
				}
				let params = parameters;
				params['category'] = (params['category'] !== undefined) ? params['category'] : this.url_params['show[]'];

				/**
				 * Condition for adding filter id in api params
				 * @param  {number} id of the filter
				 */
				if (this.showFilter) {
					params['filter_id'] = getIdFromUrl(this.currentPath());
				}
				params['limit'] = this.perpage;
				this.getTicketList(params);
			}
		}

	},

	components: {

		VclBulletList,

		'ticket-actions': require('./Mini/Table/TicketActions'),

		'ticket-details': require('./Mini/Table/TicketDetails'),

		'per-page': require('./Mini/Table/TicketPerPage'),

		'select-all': require('./Mini/Table/SelectAllTickets'),

		'ticket-sorting': require('./Mini/Table/TicketSortingMenu'),

		'loader': require('components/Client/Pages/ReusableComponents/Loader'),

		'custom-loader': require('components/MiniComponent/Loader'),

		'alert': require('components/MiniComponent/Alert'),

		'ticket-timeline': require('./TicketTimeline'),

		'ticket-filter': require('../../tickets/filters/TicketFilter'),

		'faveo-box': require('components/MiniComponent/FaveoBox'),

	},
};
</script>

<style scoped>
	
	@import '../css/inbox.css';

	#ticket_user{
		width :8%;
	}
	#ticket-page{
		margin-top: 10px;
	}

	#search{
		margin: 2px;
	}

	.refresh_a { margin-top: 8px; }

	.no-ticket-found {
	 line-height: 1.2;
	 font-size: 15px;
	 padding: 1rem;
	}

	.pad-top-18 { padding-top: 18px;padding-bottom: 18px; }

	.cursor_def { cursor: default !important; }

	.VueTables__search-field input {
    	width: 300px !important;
	}
</style>