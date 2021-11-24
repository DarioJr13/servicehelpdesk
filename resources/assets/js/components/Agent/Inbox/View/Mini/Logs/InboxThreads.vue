<template>

  <div>

      <div :class="{'scrollable-thread' : !maximized}" id="thread_scroll">

        <div class="timeline timeline-inverse" v-if="inboxThreads.length > 0">

          <template v-for="(thread,index) in inboxThreads">

            <div class="time-label" v-if="checkDate(index)">

              <span class="bg-success">{{formattedDate(thread.created_at)}} </span>
            </div>

            <thread-body :thread="thread" :key="'thread'+index" :index="index" :max="maximized"></thread-body>

            <div v-if="showThreadEnd(index)">

              <i class="fas fa-history bg-gray"></i>
            </div>
          </template>

          <infinite-loading @infinite="getThreads" ref="infiniteLoading">
            <div slot="spinner"></div>
            <div slot="no-results"></div>
            <div slot="no-more"></div>
          </infinite-loading>
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

  name : 'inbox-threads',

  description : 'Inbox Threads Component',

  props : {

    ticketId : { type : String | Number, default : '' },

    maximized : { type : Boolean, default : false }
  },

  data() {

    return {

      inboxThreads : [],

      page : 1,

      showLoader: false,

      ticketNum : this.ticketId
    }
  },

  computed : {

    ...mapGetters(['formattedTime','formattedDate'])
  },

  beforeMount() {

    this.getThreads()
  },

  created() {

    window.eventHub.$on('updateTimelineThreads',this.updateLogs)
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
      
      this.inboxThreads = [];

      this.page = 1;

      this.getThreads(undefined, true);
    },

    getThreads($state, isRefresh = false) {

      this.showLoader = true;

      this.ticketNum = this.ticketId ? this.ticketId :  getIdFromUrl(window.location.pathname);

      axios.get('/api/agent/ticket-conversation/'+this.ticketNum, { params: { page: this.page } }).then(res => {

        if(res.data.data.data.length) {

          if(isRefresh) {

            this.inboxThreads = res.data.data.data;

          } else {

            this.inboxThreads.push(...res.data.data.data);
          }

          this.page += 1;

        } else {

          $state && $state.complete();
        }
      }).catch(error => {

        errorHandler(error, 'inbox-threads');

        this.inboxThreads = [];

      }).finally(() => {

        $state && $state.loaded();

        this.showLoader = false;
      })
    },

    checkDate(x){

      if(x==0){

        return true;

      }else{

        var date1=this.formattedDate(this.inboxThreads[x-1].created_at);

        var date2=this.formattedDate(this.inboxThreads[x].created_at);

        if(date1!=date2){

          return true;
        }
      }
    },

    showThreadEnd(x){

      return x === this.inboxThreads.length-1
    }
  },

  components : {

    'thread-body' : require('./Mini/ThreadBody'),

    'faveo-box': require('components/MiniComponent/FaveoBox'),

    'custom-loader': require('components/MiniComponent/Loader')
  }
};
</script>

<style scoped>

.refresh_a { cursor: pointer;color: #777 !important; }

  #thread_scroll::-webkit-scrollbar-track
  {
    background-color: #f1f1f1;
    border-radius:10px;
  }

  #thread_scroll::-webkit-scrollbar
  {
    width: 6px;
    background-color: #f1f1f1;
  }

  #thread_scroll::-webkit-scrollbar-thumb
  {
    background-color: #c1c1c1;
    border-radius: 10px;
  }

  .scrollable-thread {
    min-height: 120px;
    max-height: 523px;
    overflow-y: auto;
  }
</style>