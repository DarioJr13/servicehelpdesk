<template>

  <div class="card card-light" v-if="showTemplate">

    <div class="card-header pointer" @click="toggleCard">

      <h3 class="card-title">{{trans('ticket_details_associated_tickets')}}</h3>

      <div class="card-tools">

        <button type="button" class="btn btn-tool">

          <i :class="{'fas fa-angle-up' : cardOpen, 'fas fa-angle-down' : !cardOpen }" class="fs-25"></i>
        </button>
      </div>
    </div>

    <div v-if="cardOpen" class="card-body" id="crt-associated-tickets">

      <data-table :url="apiUrl" :dataColumns="columns"  :option="options"></data-table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FaveoBox from "components/MiniComponent/FaveoBox";
import axios from 'axios';

export default {

  name: "associated-ticket-crt",

  components: {
    'faveo-box': FaveoBox,
    "data-table" : require('components/Extra/DataTable'),
  },

  data() {
    return {
      apiUrl: '',

      columns: ['ticket_number', 'ticket_title', 'status', 'type'],

      options: {},

      cardOpen : false,

      showTemplate: false
    }
  },

  props : {
    ticketId : {type: String|Number}
  },

  computed :{
    ...mapGetters(['formattedTime','formattedDate'])
  },

  beforeMount() {
    this.apiUrl = `api/agent/associated-tickets?ticket_id=${this.ticketId}`;

    this.checkForVisibility();

    const self = this;

    this.options = {

      headings: {ticket_number: 'Ticket Number', type : 'Parent/Child', ticket_title:'Subject', status: 'Status'},

      columnsClasses : {
        ticket_number: 'ticket-number', ticket_type_for_crt : 'ticket-type-parent-or-child',
        ticket_title:'ticket-subject', ticket_status: 'associated-ticket-status'
      },

      sortIcon: {

        base : 'glyphicon',

        up: 'glyphicon-chevron-up',

        down: 'glyphicon-chevron-down'
      },

      texts: { filter: '', limit: '' },

      templates: {

        ticket_number: (createElement,row) => {
          let ticket = row.id;
          if (!ticket)
            return '--';
          return createElement('router-link', {
            attrs: {
              to:'/thread/'+ticket
            }
          }, row.ticket_number)
        },

        status: (createElement, row) => {
          let status = row.status;
          let statusColor = row.status_icon_color;

          if (!status) {
            return '--';
          }

          return createElement('span', {
            attrs: {
              class: 'badge',
              style: `background-color: ${statusColor}; color: white`
            }
          }, status);
        }
      },

      sortable:  ['ticket_number'],

      filterable:  false, //for hiding search bar

      pagination:{chunk:5,nav: 'fixed',edge:true},

      requestAdapter(data) {

        return {

          'sort_field' : data.orderBy ? data.orderBy : 'id',

          'sort_order' : data.ascending ? 'desc' : 'asc',

          'search_term' : data.query,

          page : data.page,

          limit : data.limit,
        }
      },

      responseAdapter({data}) {
        return {
          data: data.data.data,
          count: data.data.total
        }
      },
    }
  },

  methods : {
    toggleCard() {
      this.cardOpen = !this.cardOpen;
    },

    async checkForVisibility() {
      try {
        let { data } = await axios.get(this.apiUrl + '&count=1');
        let count = data.data.count;
        if (count) {
          this.showTemplate = true;
        }
      } catch (e) {
        console.log("Error, while checking visibility of associated tickets", e);
      }
    }
  }
}
</script>

<style>
.ticket-number { width: 25%; word-break: break-word !important; }

.ticket-subject { width: 50%; word-break: break-word !important; }

.associated-ticket-status { width: 25%; word-break: break-word !important; }

.ticket-type-parent-or-child { width: 25%; word-break: break-word !important;  }

</style>
