<template>
		
	<div id="user_report_div">
		
		<alert componentName="UserReport"/>

		<div class="card card-light ">
		
			<div class="card-header">
			
				<h3 class="card-title" v-tooltip="lang('report')">{{lang('report_of')}} {{name}}</h3>

				<div class="card-tools">
					
					<button type="button" class="btn btn-tool" @click="toggleCard">

                  <i :class="{'fas fa-angle-up' : cardOpen, 'fas fa-angle-down' : !cardOpen }" class="fs-25"></i>
              </button>
				</div>
			</div>
			
			<div v-if="cardOpen" class="card-body">
			
					<div class="row">
						
						<date-time-field :label="lang('select_date_range')"
							:value="date"
							type="date"
							name="date"
							:required="false"
							:onChange="onChange" range
							:currentYearDate="false"
							format="YYYY-MM-DD" classname="col-md-6 col-sm-12 col-xs-12" :confirm="true"
							:clearable="true" :editable="true" :disabled="false" :after="new Date()">
						</date-time-field>
					</div>

					<div class="row">
					
						<div v-if="loading" class="col-md-12 col-sm-12 col-xs-12">

							<loader :animation-duration="4000" :size="60"/>
						</div>
							
						<div v-else class="col-md-12 col-sm-12 col-xs-12">
						
							<canvas id="trafficBar"></canvas>
						</div>
						
						<hr class="visible-xs-block">
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Chart from 'chart.js';
	
	import moment from 'moment';

	import axios from 'axios';

	export default {

		name : 'user-report',

		description : 'User report page',

		props : { 

			id : { type : String | Number, default : '' },

			name : { type : String, default : '' },
		},

		data() {

			return {

				chartData : '',

				updated_at : '',
				
				date  :'',
				
				apiUrl : '/api/ticket-chart-report',
				
				loading : true,

				cardOpen : false
			}
		},

		computed : {

			isMobile () {
	     
	      return (window.innerWidth <= 800 && window.innerHeight <= 600)
	    },

	    apiEndPoint(){

        let path = window.location.pathname.split('/');

        if(path[path.length-2] === 'user'){

          return this.apiUrl + '?view_as=user'          
        }

        return this.apiUrl
      }
		},


		created(){

			window.eventHub.$on('refreshUserReport',this.getChartData)
		},

		methods : {

			toggleCard() {
          
             this.cardOpen = !this.cardOpen;

             if(this.cardOpen){
             	
             	this.getChartData();
             }
         },

			onChange(value,name){
		
				let filteredVal = value.filter((item) => item);

				let val = '';

				if(filteredVal.length) {

					val =  'date::' + filteredVal.map(date => moment(date).format('YYYY-MM-DD HH:mm:ss')).join('~');
				}

				this.updated_at = val;
				
				if(value){
				
					this.getChartData();	
				}
			},

			getChartData(){

				this.loading = true;
				
				axios.get(this.apiEndPoint,{
					params : {
					'user_ids[]' : this.id,
					'updated-at' : this.updated_at
				}}).then(res=>{
						
					this.chartData = res.data.data;
				
					this.showChart(this.chartData);
					
				}).catch(error=>{
				
					this.loading = false
				})
			},

			showChart(data){
				
				this.loading = false;
				
				var newset = data.datasets.map(el=>{
				
					el = {
				
						label: el.label,
        
            fill: false,
        
            borderColor: el.border_color,
        
            pointBackgroundColor: el.point_background_color,
        
            backgroundColor: el.background_color,
        
            data: el.data
					}
					return el
				})

				let result = newset.map(a => a.data);
				
				let maxRow = result.map(function(row){ return Math.max.apply(Math, row); });

				let step = Math.max.apply(null, maxRow) < 10 ? 1 : '';

				this.$nextTick(() => {
				
					var ctx = document.getElementById('trafficBar').getContext('2d')
					
					var config = {
					
						type: 'line',
					
						data: {
				
							labels: data.labels,
						
							datasets: newset
						},
				
						options: {
				
							responsive: true,
							
							maintainAspectRatio: !this.isMobile,
				
							scales: {
				
				        yAxes: [{

				          ticks: {
				
				            stepSize: step,
				
				            min: 0,
				          }
				        }]
				      },
							
							legend: {
							
								position: 'bottom',
							
								display: true
							},
							tooltips: {
								
								mode: 'label',
								
								xPadding: 10,
								
								yPadding: 10,
								
								bodySpacing: 10
							}
						}
					}
					new Chart(ctx, config)
				})
			}
		},

		components : {

			"alert": require("components/MiniComponent/Alert"),

			'date-time-field': require('components/MiniComponent/FormField/DateTimePicker'),
			
			'loader':require('components/Client/Pages/ReusableComponents/Loader'),
		}
	};
</script>

<style scoped>
	
.fullCanvas {
	width: 100%;
}

.fs-25{ font-size: 25px; }

#user_report_div{ margin-bottom: 60px; }
</style>