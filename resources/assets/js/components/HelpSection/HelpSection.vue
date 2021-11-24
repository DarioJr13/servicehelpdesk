<template>

	<div>
		
		<div class="fabs">
			
			<div :class="chatClass" v-if="widgetOpen">
				
				<div class="chat_header">
					
					<div class="chat_option">
						
						<h5 id="chat_head">Welcome to Support Center</h5>
					</div>
				</div>
		 
				<div class="chat_body">

					<div v-if="loading" id="loader"></div>
					
					<template v-if="!loading">

						<div v-if="contentMsg">
							
							<div class="card-body text-center">
								
								<i class="fas fa-envelope-open-text fa-8x text-success"></i>

								<h5 class="mt-4">{{contentMsg}}</h5><br>
							</div>
						</div>
					
					<template v-if="!contentMsg">
						<div v-if="alertMsg && getIn" class="text-left" id="get_touch">

							<div class="alert alert-dismissible" :class="alertClass">
		                  
		                  	{{alertMsg}}
		                </div>
						</div>

						<div class="card card-light" v-if="getIn">
						
							<div class="card-header">
									
								<h3 class="card-title">Get in touch</h3>
								
								<div class="card-tools">
								
									<button class="btn btn-default btn-tool m-auto" @click="makeFalse"><i class="fas fa-times"> </i></button>		
								</div>	
							</div>
							
							<div class="card-body">				

								<div class="row">

									<div class="col-sm-12">

										<label class="float-left">Your Name</label>

										<input type="text" name="name" v-model="name" class="form-control">
									</div>

									<div class="col-sm-12">

										<label class="float-left">Your Email Address <span class="text-red"> *</span></label>
										
										<input type="email" name="email" v-model="email" class="form-control">
									</div> 

									<div class="col-sm-12">

										<label class="float-left">Select Your Product</label>

		    							<select v-model="product" class="form-control">
										   <option>--</option>
										  <option>Helpdesk</option>
										  <option>Servicedesk</option>
										</select>
									</div>

									<div class="col-sm-12">

										<label class="float-left">Your Account URL</label>

										<input type="text" name="url" v-model="url" class="form-control">
									</div> 

									<div class="col-sm-12">

										<label class="float-left">How does it impact your business?</label>

										<select v-model="impact" class="form-control">
										  <option>--</option>
										  <option>Low [How to setup something]</option>
										  <option>Minor [Issues with the setup]</option>
										  <option>Major [A major functionality has stopped working]</option>
										  <option>Critical [Severe outage/downtime]</option>
										</select>
									</div>

									<div class="col-sm-12">

										<label class="float-left">What's this about?</label>

										<select v-model="about" class="form-control">
										   <option>--</option>
										  <option>Sales / pricing question</option>
										  <option>Technical support question</option>
										</select>
									</div>

									<div class="col-sm-12">

										<label class="float-left">Subject <span class="text-red"> *</span></label>

										<input type="text" name="help_subject" v-model="help_subject" class="form-control">
									</div>

									<div class="col-sm-12">

										<label class="float-left">Describe your problem/question <span class="text-red"> *</span></label>

	    							 	<textarea name="help_message" v-model="help_message" class="form-control"></textarea>
	    							</div>

	    							 <div>
		 							  
											<input enctype ='multipart/form-data' :multiple="true" type="file" ref="help_doc" name="help_doc" id="helpdocs" title="File input" 
											 	files='true' @change="onFileSelected">
										<button data-toggle="modal" @click="$refs.help_doc.click()" class="btn-bs-file btn btn-sm btn-default btn-block mlr-8">
										
											<span><i class="far fa-file"></i> Choose file</span>
										</button>
									</div> 

									<template v-if="files && files.length">
								
										<div v-for="(file, index) in files" :key="index" class="file-detail-box">
											
											<div class="text-left">
												
												{{ file.name || file.value }}
											</div>
											
											<div class="float-right m-16">
											

												<i class="fas fa-times wd_cursor" @click="removeFile(index)" :title="trans('remove')"></i>
											</div>
										</div>
									</template>
								</div>
							</div>

							<div class="card-footer">
								
								<button class="btn btn-primary float-right" @click="sendMail"><i class="fas fa-paper-plane"></i> Send</button>
							</div>
						</div>
						
						<template v-if="!getIn">

							<!-- <div class="card" v-if="showContent">
							
								<div class="card-header border-0">
									
									<div class="row">
									
										<button class="btn btn-default" @click="showContent = false"><i class="fas fa-arrow-left"> </i></button>		
									</div>	
								</div>
								
								<div class="card-body art_det_wid">				
									
									<div v-html="contentVal"></div>
								</div>
							</div> -->

							<div class="card card-light" v-if="!showContent">
							
								<div class="card-header">
									<h3 class="card-title">Got Questions</h3>	
								</div>
								
								<div class="card-body">
									
									<div class="input-group">
										
										<input type="text" name="message" placeholder="Search ..." class="form-control" v-model="searchFilter">
										
										<span class="input-group-append">
											
											<button type="submit" class="btn btn-default" @click="setFilter"><i class="fas fa-search"></i> </button>
										</span>
									</div><br>
										
									<h6 class="art_wid_sug">Suggested Articles</h6>
									
									<div class="art_wid" v-if="articleList.length">

										<template v-for="article in articleList.slice(0,5)">
											
											<div class="card bg-light wd_cursor">

											  <div class="card-header d-flex">
													
													<i class="fas fa-newspaper mt_wid_icon"></i>  &nbsp;&nbsp;
													<h3 class="card-title art_wid_tit">
														<a target="_blank" :href="'https://support.faveohelpdesk.com/show/'+article.slug" class="text-dark">{{article.name}}</a>
													</h3>
												 
											  </div>
											  <!-- /.info-box-content -->
											</div>
										</template>
									</div>

									<div v-else>No results found.</div>
								</div>
							</div>
						</template>
					</template>

						<button v-if="!getIn && !showContent && !contentMsg" class="btn btn-primary btn-lg btn-block" @click="getIn = true">
							<i class="fas fa-pen-alt"></i> Get in touch
						</button>
					</template>
				</div>
			</div>
			
			<a id="prime" :class="btnClass" @click="toggleFab"><i :class="iconClass"></i></a>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';

	export default {

		name : 'help-widget',

		props : {

			from : { type : String, default : '' }
		},

		data() {

			return {
				
				chatClass : 'chat',

				btnClass : 'fab',

				iconClass : 'prime fas fa-question',

				articleList : [],

				loading : false,

				hasDataPopulated : false,

				showContent : false,

				searchFilter : '',

				widgetOpen : false,

				getIn : false,

				files : [],

				help_email : 'support@ladybirdweb.com',

				help_subject : '',

				help_message : '',

				alertMsg : '',

				alertClass : '',

				product : '',	

				impact : '',

				about  : '',

				name : '',

				email : '',

				url : '',

				contentMsg : '',

        fileUploadRuleObject: {},
			}
		},

    computed: {
		  totalFileCount() {
		    return this.files.length;
      },

      totalFileSizeInBytes() {
		    return this.files.length ? this.files.map(file => file.size).reduce((previousValue, nextValue) => previousValue + nextValue) : 0;
      }
    },

		methods :{
      bytesToHuman(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes === 0) return '0 Bytes';

        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

        if (i === 0) return `${bytes} ${sizes[i]}`;

        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
      },

		  async getFileUploadRules() {
		    try {
          let { data } = await axios.get('file-manager/upload-info');
          this.fileUploadRuleObject = data.data;
        } catch (e) {
          //no use of handling
        }
      },

			makeFalse() {

				this.getIn = false;

				this.alertMsg = '';

				this.resetData();
			},

			onFileSelected (e) {
				
				const files = e.target.files;

        const filesArray = [...files]

        let inputFileSize = filesArray.map(file => file.size).reduce((previousValue, nextValue) => previousValue + nextValue)

        if ((this.totalFileSizeInBytes + inputFileSize) > this.fileUploadRuleObject.maxPostSize) {
          this.alertClass = 'alert-danger';
          this.alertMsg = `Maximum post size should be less than ${this.bytesToHuman(this.fileUploadRuleObject.maxPostSize)}`;
          this.scrollToDiv();
          return;
        }

        if ((this.totalFileCount + files.length) > this.fileUploadRuleObject.maxFileUploadCount) {
          this.alertMsg = `Maximum ${this.fileUploadRuleObject.maxFileUploadCount} file(s) can be uploaded at once`
          this.alertClass = 'alert-danger';
          this.scrollToDiv();
          return;
        }

				for ( var i = 0; i < files.length; i++ ) {

          if (files[i].size > this.fileUploadRuleObject.maxSingleFileSize) {
            this.alertMsg = `File size cannot be greater than ${this.bytesToHuman(this.fileUploadRuleObject.maxSingleFileSize)}`
            this.alertClass = 'alert-danger';
            this.scrollToDiv();
            return;
          }

					this.files.push( files[i]);
				}
			},

			removeFile (index) {
				this.files.splice(index, 1);
			},

			toggleFab() {
				
				this.widgetOpen = !this.widgetOpen;

				this.chatClass = this.chatClass == 'chat' ? 'chat is-visible' : 'chat';
			  
				this.btnClass = this.btnClass == 'fab' ? 'fab is-float is-visible' : 'fab';

				this.iconClass = this.iconClass == 'prime fas fa-question' ? 'prime fas fa-times is-active is-visible' : 'prime fas fa-question';

				if(!this.widgetOpen){
					this.articleList = [];
					this.loading = false;
					this.hasDataPopulated = false;
					this.showContent = false;
					this.searchFilter = '';
					this.widgetOpen = false;
					this.getIn = false;
					this.contentMsg = '';
				} else {
          this.getFileUploadRules();
					this.getArticles();
				}
			},

			getArticles(obj) {
				
				this.loading = true;

				var params = obj;

				delete window.axios.defaults.headers.common['X-Requested-With'];
				
				axios.get('https://support.faveohelpdesk.com/api/article-list-with-category',{params}).then(res=>{
				
					this.loading=false;

					this.hasDataPopulated = true
			
					this.articleList = res.data.data.articles;

				}).catch(err=>{
					
					this.loading=false;

					this.hasDataPopulated = true
				});

				window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
			},

			setFilter() {

				this.getArticles({'search-query' : this.searchFilter});       		
			},

			sendMail() {

				if(this.help_subject && this.help_message && this.email) {

					if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))
				  	{
				    	this.onSubmit();

						this.alertMsg = '';
				  	} else {
					    
					   this.alertClass = 'alert-danger';

						this.alertMsg = `Enter valid email address`;

						this.scrollToDiv();
					}

				} else {

					this.alertClass = 'alert-danger';

					this.alertMsg = `Please fill required fields (*)`;

					this.scrollToDiv();
				}
			},

			onSubmit(){

				let completeStr = `${this.help_message.replace(/\n/g,'<br>')}<br><b>Product</b> : ${this.product}<br><b>Impact</b> : ${this.impact}<br><b>About</b> : ${this.about}<br><b>Name</b> : ${this.name}<br><b>Email</b> : ${this.email}<br><b>Account URL</b> : ${this.url}<br>`;

				this.loading = true;

				let fd = new FormData();

				fd.append('help_email', this.help_email)

				fd.append('help_subject', this.help_subject)
				
				fd.append('help_massage', completeStr)

				fd.append('reply_email', this.email)

				if(this.files.length){

					for(let i in this.files){

						fd.append('helpdocs['+i+']', this.files[i])
					}
				}

				const config = { headers: { 'Content-Type': 'multipart/form-data' } }

				axios.post('/helpsection/mail',fd,config).then(res=>{

					this.loading = false;

					if(res.data == 'Message Sent! Thanks for reaching out! Someone from our team will get back to you soon.'){

						this.contentMsg = res.data;	

						this.resetData()
					} else {

						this.alertClass = 'alert-danger';

						this.alertMsg = res.data.fails;

						this.scrollToDiv();

					}

				}).catch(err=>{

					this.contentMsg = '';
					
					this.alertMsg = '';
					
					this.loading = false;
				})
			},

			scrollToDiv(){

				setTimeout(()=>{

					var elmnt = document.getElementById('get_touch');
	  			
	  				elmnt.scrollIntoView({ behavior : "smooth"});
				},1);
			},

			resetData() {
				this.files = [];
				this.help_email = 'support@ladybirdweb.com';
				this.help_subject = '';
				this.help_message = '';
				this.product = '';
				this.impact = '';
				this.about  = '';
				this.name = '';
				this.email = '';
				this.url = '';
			}
		}
	};
</script>


<style scoped>

.wd_cursor { cursor: pointer; }

.mt_wid_icon{ margin-top: 3px; }

.art_wid_tit{ text-align: left;font-size: 14px;font-weight: 400 !important;}

.art_wid_sug{ text-align: left;font-weight: 500 !important;padding-bottom: 10px;}

.art_wid{ max-height: 170px; overflow-y: scroll;padding: 5px;}

.art_det_wid{ max-height: 370px;overflow-y: scroll;}

#chat_head{ position: relative;top: 17px;}

.fabs { bottom: 0;position: fixed;margin: 1em;right: 0;z-index: 2147483647;}

.fab {
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  text-align: center;
  color: #f0f0f0;
  margin: 25px auto 35px;
  box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
  cursor: pointer;
  -webkit-transition: all .1s ease-out;
  transition: all .1s ease-out;
  position: relative;
  z-index: 998;
  overflow: hidden;
  background: #42a5f5;
}

.fab > i {
  font-size: 2em;
  line-height: 55px;
  -webkit-transition: all .2s ease-out;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  color: white;
}


.chat {
  position: fixed;
  right: 15px;
  bottom: 110px;
  width: 400px;
  font-size: 12px;
  line-height: 22px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  opacity: 0;
  box-shadow: 1px 1px 100px 2px rgba(0, 0, 0, 0.22);
  border-radius: 10px;
  -webkit-transition: all .2s ease-out;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}

.chat_header {
	 font-size: 13px;
	 font-weight: 500;
	 color: #f3f3f3;
	 height: 80px;
	 background: #42a5f5;
	 border-top-left-radius: 10px;
	 border-top-right-radius: 10px;
	 padding-top: 8px;
}


.chat.is-visible {
  opacity: 1;
  -webkit-animation: zoomIn .2s cubic-bezier(.42, 0, .58, 1);
  animation: zoomIn .2s cubic-bezier(.42, 0, .58, 1);
}

.chat_option {
  float: left;
  font-size: 15px;
  list-style: none;
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
	letter-spacing: 0.5px;
	font-weight: 400
}

.chat_body {
  background: #fff;
  width: 100%;
  border-bottom-right-radius: 10px;
	 border-bottom-left-radius: 10px;
  display: inline-block;
  text-align: center;
  min-height: 300px;
  max-height: 430px;
  overflow-y: auto;
padding: 5px;
margin-bottom: -7px;
}



/*Chatbox scrollbar*/

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  margin: 2px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}
/*Element state*/

.is-active {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
}

.is-float {
  box-shadow: 0 0 6px rgba(0, 0, 0, .16), 0 6px 12px rgba(0, 0, 0, .32);
}

/*Animation*/

@-webkit-keyframes zoomIn {
  0% {
	 -webkit-transform: scale(0);
	 transform: scale(0);
	 opacity: 0.0;
  }
  100% {
	 -webkit-transform: scale(1);
	 transform: scale(1);
	 opacity: 1;
  }
}

@keyframes zoomIn {
  0% {
	 -webkit-transform: scale(0);
	 transform: scale(0);
	 opacity: 0.0;
  }
  100% {
	 -webkit-transform: scale(1);
	 transform: scale(1);
	 opacity: 1;
  }
}

@-webkit-keyframes load {
  0% {
	 -webkit-transform: scale(0);
	 transform: scale(0);
	 opacity: 0.0;
  }
  50% {
	 -webkit-transform: scale(1.5);
	 transform: scale(1.5);
	 opacity: 1;
  }
  100% {
	 -webkit-transform: scale(1);
	 transform: scale(1);
	 opacity: 0;
  }
}

@keyframes load {
  0% {
	 -webkit-transform: scale(0);
	 transform: scale(0);
	 opacity: 0.0;
  }
  50% {
	 -webkit-transform: scale(1.5);
	 transform: scale(1.5);
	 opacity: 1;
  }
  100% {
	 -webkit-transform: scale(1);
	 transform: scale(1);
	 opacity: 0;
  }
}
/* SMARTPHONES PORTRAIT */

@media only screen and (min-width: 300px) {
  .chat {
	 width: 250px;
  }
}
/* SMARTPHONES LANDSCAPE */

@media only screen and (min-width: 480px) {
  .chat {
	 width: 300px;
  }
}
/* TABLETS PORTRAIT */

@media only screen and (min-width: 768px) {
  .chat {
	 width: 300px;
  }
}
/* TABLET LANDSCAPE / DESKTOP */

@media only screen and (min-width: 1024px) {
  .chat {
	 width: 400px;
  }
}

input[type="file"]{
	position: absolute;
  opacity: -999;
}

.file-detail-box {
	border: 1px solid #dedede;
   padding: .3rem;
   margin-top: .5rem;
   background: #f8f9fa;
   border-radius: 0.25rem;
   width: 95.4%;    
   margin-left: 8px;
}

.m-16{ margin-top: -22px; }

#loader {
  position: absolute;
  left: 56%;
  top: 66%;
  z-index: 1;
  width: 100px;
  height: 100px;
  margin: -76px 0 0 -76px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.mlr-8 { margin-right: 8px; margin-left: 8px; }
</style>