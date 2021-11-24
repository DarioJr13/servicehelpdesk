<template>
	
	<div>
		
		<alert componentName="admin-settings"></alert> 

		<template v-if="!loading">
			
		</template>

		<template v-for="(navigationCategory, index) in navigationArray">

			<template v-if="navigationCategory.main_navigation && navigationCategory.name == 'Helpdesk'">
				
				<template v-for="(navigation, index) in navigationCategory.navigations">

					<div v-if="navigation.hasChildren" class="card card-light">
					
						<div class="card-header">
							
							<h3 class="card-title">{{navigation.name}}</h3>
						</div>

						<div class="card-body">
							
							<div class="row">
								
								<template v-for="(nav,index) in navigation.children">
									
									<div class="col-md-2 col-sm-6">
		                    		
		                    		<div class="settingiconblue">
		                        	
		                        	<div class="settingdivblue">
		                            	
		                            	<a :href="nav.redirectUrl">
		                                	
		                                	<span class="fa-stack fa-2x"> <i :class="nav.iconClass" class="fa-stack-1x"></i></span>
		                            	</a>
		                        	</div>
		                        	
		                        	<div class="text-center text-sm fw_600">{{nav.name}}</div>
		                    		</div>
		                		</div>
								</template>
							</div>
						</div>
					</div>
				</template>	
			</template>

			<template v-else-if="navigationCategory.main_navigation && navigationCategory.name != 'Helpdesk'">
		
				<div class="card card-light">
				
					<div class="card-header">
						
						<h3 class="card-title">{{navigationCategory.name.toUpperCase()}}</h3>
					</div>

					<div class="card-body">
						
						<div class="row">
							
							<template v-for="(nav,index) in navigationCategory.navigations">
									
									<div class="col-md-2 col-sm-6">
		                    		
		                    		<div class="settingiconblue">
		                        	
		                        	<div class="settingdivblue">
		                            	
		                            	<a :href="nav.redirectUrl">
		                                	
		                                	<span class="fa-stack fa-2x"> <i :class="nav.iconClass" class="fa-stack-1x"></i></span>
		                            	</a>
		                        	</div>
		                        	
		                        	<div class="text-center text-sm fw_600">{{nav.name}}</div>
		                    		</div>
		                		</div>
								</template>
						</div>
					</div>
				</div>
			</template>

			<template v-else>

				<div class="card card-light">
							
					<div class="card-header">
						
						<h3 class="card-title">{{navigationCategory.name.toUpperCase()}}</h3>
					</div>

					<div class="card-body">
	
						<div class="row">

							<template v-for="(navigation, index) in navigationCategory.navigations">

								<div class="col-md-2 col-sm-6" v-popover="{ name: 'nav-' + index, position : 'right' }">
		                    		
		                    		<div class="settingiconblue">
		                        	
		                        	<div class="settingdivblue">
		                            	
		                            	<a href="javascript:;">
		                                	
		                                	<span class="fa-stack fa-2x"> 

		                                		<i :class="navigation.iconClass" class="fa-stack-1x"></i>
		                                	</span>

		                                	<popover :name="'nav-'+index" :pointer="true" event="hover">
		                                		<div class="card bg-light nav_card" style="margin-left:0px">
													<div class="card-body p-2">
														<template v-for="(nav,index) in navigation.navigations">
															<div class="row">
																<div class="col-sm-12 col-md-2">
																	<div class="settingiconblue" v-tooltip="nav.name">
																		<div class="settingdivblue_mini">
																			<a :href="nav.redirectUrl">
																				<span class="fa-stack fa-1x"> <i :class="nav.iconClass" class="fa-stack-1x"></i></span>
																			</a>
																		</div>
																	</div>
																</div>
															</div>
														</template>
													</div>
												</div>
		                                	</popover>
		                            	</a>
		                        	</div>
		                        	
		                        	<div class="text-center text-sm fw_600">{{navigation.name}}</div>
		                    		</div>
		                		</div>
							</template>
						</div>	
					</div>
				</div>
			</template>
		</template>

		<div class="row" v-if="loading">

			<loader :animation-duration="4000" :size="60"/>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';

	import {errorHandler} from 'helpers/responseHandler';

	import Loader from 'components/Client/ClientPanelLayoutComponents/ReusableComponents/Loader.vue';

	import Alert from 'components/MiniComponent/Alert';

    import {lang} from 'helpers/extraLogics';

	export default  {

		name : 'admin-settings',

		data () {

			return {

				loading : false,

				navigationArray : []
			}
		},

		beforeMount() {

			this.getNavigations();
		},

		methods : {

			getNavigations() {

				this.loading = true;

				axios.get('/api/admin/navigation?meta=true').then(res=>{

					this.loading = false;

					let mainNavs = res.data.data.filter(({ main_navigation }) => main_navigation);

					let otherNavs = { 
						name : lang('additional_confiurations'),
						main_navigation : false,
						navigations : res.data.data.filter(({ main_navigation }) => !main_navigation)
					}

					if(otherNavs.navigations.length) {

						mainNavs.push(otherNavs);
					}

		  			this.navigationArray = mainNavs;

				}).catch(err=>{

					this.loading = false;

		  			errorHandler(err,'admin-settings');
				})
			}
		},

		components : {

			'loader' : Loader,

			'alert' : Alert
		}
	};
</script>

<style scoped>
	
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

    .settingdivblue_mini {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        text-align: center;
        border: 5px solid #C4D8E4;
        border-radius: 100%;
        padding-top: 5px;
    }

    .fs_13 { font-size: 12px !important; font-weight: 500;word-break: break-word; }

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
   .nav_body { height: 160px;overflow-y: auto; }

   .nav_body::-webkit-scrollbar-track
  	{
    	background-color: #f1f1f1;
    	border-radius:10px;
  	}

  	.nav_body::-webkit-scrollbar
  	{
    	width: 6px;
    	background-color: #f1f1f1;
  	}

  .nav_body::-webkit-scrollbar-thumb
  	{
    	background-color: #c1c1c1;
    	border-radius: 10px;
  	}

  	.vue-popover{ 
  		top:auto !important;
		left:75% !important;
		width: 63px !important;
  		background: unset !important;
    	padding: unset !important;
    	bottom: 30% !important;
    }

    .nav_card {margin-bottom: 0px;margin-left: -5px;margin-right: -5px;margin-top: -5px;}
</style>