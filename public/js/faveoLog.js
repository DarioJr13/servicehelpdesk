webpackJsonp([5],{126:function(t,e,a){var r=a(0)(a(2902),a(2903),!1,function(t){a(2900)},null,null);t.exports=r.exports},127:function(t,e,a){var r=a(0)(a(2911),a(2912),!1,function(t){a(2909)},"data-v-d9bff5f2",null);t.exports=r.exports},246:function(t,e,a){var r=a(0)(a(2920),a(2926),!1,function(t){a(2918)},null,null);t.exports=r.exports},2892:function(t,e,a){t.exports=a(2893)},2893:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(33),n=(a.n(r),a(11));a(24);Vue.component("logs-index",a(2894));new Vue({el:"#app-system-logs",store:n.a})},2894:function(t,e,a){var r=a(0)(a(2895),a(2948),!1,null,null,null);t.exports=r.exports},2895:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(3),n=(a.n(r),a(19)),s=(a.n(n),a(15)),i=a.n(s),o=a(17),l=a.n(o);i.a.component("logs-trace",a(2896)),e.default={name:"system-logs",description:"System logs component",data:function(){return{showModal:!1}},methods:{onChange:function(t,e){this[e]=t},onClose:function(){this.showModal=!1,this.$store.dispatch("unsetValidationError")}},components:{"exception-logs":a(2905),"cron-logs":a(2914),"mail-logs":a(2928),"logs-modal":a(126),alert:a(5),"faveo-box":l.a}}},2896:function(t,e,a){var r=a(0)(a(2899),a(2904),!1,function(t){a(2897)},null,null);t.exports=r.exports},2897:function(t,e,a){var r=a(2898);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("3eb6f36b",r,!0,{})},2898:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".trace{padding:1rem;color:#fff;background-color:#000;height:50vh;overflow:auto!important;line-height:1.5!important;white-space:nowrap!important}",""])},2899:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(3);a.n(r);e.default={name:"logs-trace",description:"Logs trace component",props:{data:{type:Object,required:!0}},data:function(){return{showModal:!1}},filters:{subStringFilter:function(t){return t&&t.length>40?t.substring(0,40)+"...":t}},methods:{onClose:function(){this.showModal=!1}},components:{"logs-modal":a(126)}}},2900:function(t,e,a){var r=a(2901);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("9656e7ce",r,!0,{})},2901:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".mod_width{max-height:400px;overflow-x:hidden;overflow-y:auto}.trace{background:#000!important;color:#f0f8ff;padding:10px;font-family:monospace;font-size:13px;line-height:1.5!important}",""])},2902:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(19),n=a.n(r),s=a(3),i=a.n(s),o=a(6),l=a(10),c=a.n(l);e.default={name:"logs-modal",description:"Logs Modal component",props:{showModal:{type:Boolean,default:!1},onClose:{type:Function},data:{type:Object,default:function(){}},title:{type:String,default:""}},data:function(){return{containerStyle:{width:"950px"},loading:!0,size:60,lang_locale:"",content:"",mail_message:"",isDisabled:!0,delete_after_date:"",delete_before_date:"",timeOptions:{start:"00:00",step:"00:30",end:"23:30"},checkOptions:[{name:"cron",value:"cron"},{name:"mail",value:"mail"},{name:"exception",value:"exception"}],logs:[]}},beforeMount:function(){this.checkTitle()},created:function(){this.lang_locale=localStorage.getItem("LANGUAGE")},methods:{contentParser:function(t){var e=this,a=(new DOMParser).parseFromString(t,"text/html"),r=a.getElementsByTagName("body")[0];return r.querySelectorAll("a").forEach(function(t){var r=t.href.replace(e.basePath(),"").split("/").filter(function(t){return t});if("change-approval"==r[0]||"service-desk"==r[0]&&"contract-approval"==r[1])t=t;else{var n=a.createElement("a");t.href.includes("/panel/")||t.href.includes("/ticket-conversation/")?n.setAttribute("href",t.href):n.setAttribute("href",t.href.replace(e.basePath(),e.basePath()+"/panel")),n.innerText=t.innerText,t.parentNode.replaceChild(n,t)}}),r.innerHTML},checkTitle:function(){"delete_logs"!==this.title?"logs_content"===this.title?this.getLogsContent(this.data.id):(this.content=this.data.trace,this.containerStyle.width="1000px",this.loading=!1):this.loading=!1},getLogsContent:function(t){var e=this;i.a.get("/api/get-log-mail-body/"+t).then(function(t){e.loading=!1,e.content=e.contentParser(t.data.data.mail_body),e.mail_message=t.data.message}).catch(function(t){e.loading=!1})},onChange:function(t,e){this[e]=t,"logs"===e&&(this.isDisabled=0===t.length)},onSubmit:function(){var t=this;this.loading=!0,this.isDisabled=!0;var e={};e.categories=this.logs,e.delete_before=""!==this.delete_before_date&&null!==this.delete_before_date?n()(this.delete_before_date).format("YYYY-MM-DD HH:mm:ss"):"",e.delete_after=""!==this.delete_after_date&&null!==this.delete_after_date?n()(this.delete_after_date).format("YYYY-MM-DD HH:mm:ss"):"",i.a.delete("/api/delete-logs",{data:e}).then(function(e){Object(o.b)(e,"dataTableModal"),window.eventHub.$emit("cronLogsrefreshData"),window.eventHub.$emit("mailLogsrefreshData"),window.eventHub.$emit("exceptionLogsrefreshData"),t.onClose(),t.loading=!1,t.isDisabled=!0}).catch(function(t){Object(o.a)(t,"dataTableModal")})}},components:{modal:c.a,loader:a(8),"date-time-field":a(28),"check-box":a(86)}}},2903:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.showModal?a("modal",{attrs:{showModal:t.showModal,onClose:t.onClose,containerStyle:t.containerStyle},on:{close:function(e){t.showModal=!1}}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("h4",{staticClass:"modal-title"},[t._v(t._s(t.lang(t.title)))])]),t._v(" "),t.loading||"delete_logs"===t.title?t._e():a("div",{staticClass:"mod_width",attrs:{slot:"fields"},slot:"fields"},[a("p",{class:[{trace:"trace"===t.title}],domProps:{innerHTML:t._s(t.content)}})]),t._v(" "),""!=t.mail_message?a("div",{staticClass:"span",attrs:{slot:"fields"},slot:"fields"},[a("br"),t._v(" "),a("span",{domProps:{innerHTML:t._s(t.mail_message)}})]):t._e(),t._v(" "),t.loading||"delete_logs"!==t.title?t._e():a("div",{staticClass:"row",attrs:{slot:"fields"},slot:"fields"},[a("check-box",{attrs:{id:"log_delete_checkbox",options:t.checkOptions,label:t.lang("logs"),name:"logs",value:t.logs,onChange:t.onChange,classname:"col-sm-4",class_name:"col-sm-4"}}),t._v(" "),a("date-time-field",{attrs:{id:"log_delete_date1",label:t.lang("delete_after"),value:t.delete_after_date,type:"datetime","time-picker-options":t.timeOptions,name:"delete_after_date",required:!1,onChange:t.onChange,currentYearDate:!1,format:"YYYY-MM-DD HH:mm:ss",classname:"col-sm-4",clearable:!0,disabled:!1}}),t._v(" "),a("date-time-field",{attrs:{id:"log_delete_date2",label:t.lang("delete_before"),value:t.delete_before_date,type:"datetime","time-picker-options":t.timeOptions,name:"delete_before_date",required:!1,onChange:t.onChange,currentYearDate:!1,format:"YYYY-MM-DD HH:mm:ss",classname:"col-sm-4",clearable:!0,disabled:!1}})],1),t._v(" "),"delete_logs"===t.title?a("div",{attrs:{slot:"controls"},slot:"controls"},[a("button",{staticClass:"btn btn-danger",attrs:{id:"log_delete_btn",type:"button",disabled:t.isDisabled},on:{click:function(e){t.onSubmit()}}},[a("i",{staticClass:"fa fa-trash",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.lang("delete")))])]):t._e(),t._v(" "),t.loading?a("div",{staticClass:"row",attrs:{slot:"fields"},slot:"fields"},[a("loader",{attrs:{"animation-duration":4e3,color:"#1d78ff",size:t.size}})],1):t._e()]):t._e()],1)},staticRenderFns:[]}},2904:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("p",{attrs:{id:"logs_trace"}},[t._v(t._s(t._f("subStringFilter")(t.data.trace))+"\n\n\t\t"),a("a",{attrs:{id:"logs_read_more",href:"javascript:;"},on:{click:function(e){t.showModal=!0}}},[a("span",{staticClass:"label label-default"},[t._v(t._s(t.lang("read-more")))])])]),t._v(" "),a("transition",{attrs:{name:"modal"}},[t.showModal?a("logs-modal",{attrs:{onClose:t.onClose,showModal:t.showModal,data:t.data,title:"trace"}}):t._e()],1)],1)},staticRenderFns:[]}},2905:function(t,e,a){var r=a(0)(a(2908),a(2913),!1,function(t){a(2906)},null,null);t.exports=r.exports},2906:function(t,e,a){var r=a(2907);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("2b19975a",r,!0,{})},2907:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".log-category{width:10%!important;word-break:break-word}.log-file{width:30%!important;word-break:break-all}.log-trace{width:20%!important;word-break:break-all}.log-line{width:8%!important;word-break:break-all}.log-created{width:12%!important;word-break:break-all}.log-message{width:20%!important;word-break:break-all}",""])},2908:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(3),n=(a.n(r),a(7)),s=a(17),i=a.n(s),o=a(19),l=a.n(o),c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t};function d(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}e.default={data:function(){var t;return d(t={columns:[],options:{},apiUrl:"/api/logs/exception"},"columns",["category","file","line","message","trace","created_at"]),d(t,"options",{}),d(t,"category_ids",[]),d(t,"timeOptions",{start:"00:00",step:"00:30",end:"23:30"}),d(t,"created_date",""),d(t,"created_at_start",""),d(t,"created_at_end",""),d(t,"moment",l.a),t},beforeMount:function(){var t=this;this.options={headings:{category:"Category",file:"File",line:"Line",message:"Message",trace:"Trace",created_at:"Created At"},columnsClasses:{category:"log-category",file:"log-file",line:"log-line",trace:"log-trace",message:"log-message",created_at:"log-created"},sortIcon:{base:"glyphicon",up:"glyphicon-chevron-down",down:"glyphicon-chevron-up"},texts:{filter:"",limit:""},templates:{category:function(t,e){return e.category.name},created_at:function(e,a){return t.formattedTime(a.created_at)},trace:"logs-trace"},sortable:["category","file","line","trace","message","created_at"],filterable:["category","file","line","trace","message","created_at"],pagination:{chunk:5,nav:"fixed",edge:!0},requestAdapter:function(t){return{sort_field:t.orderBy,sort_order:t.ascending?"desc":"asc","search-query":t.query.trim(),page:t.page,limit:t.limit}},responseAdapter:function(t){var e=t.data;return{data:e.data.data,count:e.data.total}}}},methods:{refreshTable:function(){window.eventHub.$emit("exceptionLogsrefreshData")},onChange:function(t,e){this[e]=t,"created_date"===e&&(this.created_at_start=null!==t[0]?l()(t[0]).format("YYYY-MM-DD+HH:mm:ss"):"",this.created_at_end=null!==t[1]?l()(t[1]).format("YYYY-MM-DD+HH:mm:ss"):"")}},computed:c({},Object(n.b)(["formattedTime","formattedDate"])),components:{"logs-table":a(127),"dynamic-select":a(13),"date-time-field":a(28),"faveo-box":i.a}}},2909:function(t,e,a){var r=a(2910);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("4f6f3202",r,!0,{})},2910:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".pad[data-v-d9bff5f2]{border-top:1px solid #efefef;padding:8px}#logs_table[data-v-d9bff5f2]{padding-bottom:60px}",""])},2911:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{category_ids:{type:Array,default:function(){return[]}},created_at_start:{type:String,default:""},created_at_end:{type:String,default:""},cron_start_time_start:{type:String,default:""},cron_start_time_end:{type:String,default:""},sender_mails:{type:Array,default:function(){return[]}},reciever_mails:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},options:{type:Object,default:function(){}},apiUrl:{type:String,default:""},id:{type:String,default:""},componentTitle:{type:String,default:""}},data:function(){return{apiEndpoint:this.apiUrl+"?category_ids="+this.category_ids+"&created_at_start="+this.created_at_start+"&created_at_end="+this.created_at_end+"&cron_start_time_start="+this.cron_start_time_start+"&cron_start_time_end="+this.cron_start_time_end+"&sender_mails="+this.sender_mails+"&reciever_mails="+this.reciever_mails}},watch:{created_at_start:function(t,e){var a=this.category_ids.map(function(t){return t.id}),r=this.sender_mails.map(function(t){return t.email}),n=this.reciever_mails.map(function(t){return t.email});return this.apiEndpoint=this.apiUrl+"?category_ids="+a+"&created_at_start="+t+"&created_at_end="+this.created_at_end+"&cron_start_time_start="+this.cron_start_time_start+"&cron_start_time_end="+this.cron_start_time_end+"&sender_mails="+r+"&reciever_mails="+n,t},created_at_end:function(t,e){var a=this.category_ids.map(function(t){return t.id}),r=this.sender_mails.map(function(t){return t.email}),n=this.reciever_mails.map(function(t){return t.email});return this.apiEndpoint=this.apiUrl+"?category_ids="+a+"&created_at_start="+this.created_at_start+"&created_at_end="+t+"&cron_start_time_start="+this.cron_start_time_start+"&cron_start_time_end="+this.cron_start_time_end+"&sender_mails="+r+"&reciever_mails="+n,t},cron_start_time_start:function(t,e){var a=this.category_ids.map(function(t){return t.id}),r=this.sender_mails.map(function(t){return t.email}),n=this.reciever_mails.map(function(t){return t.email});return this.apiEndpoint=this.apiUrl+"?category_ids="+a+"&created_at_start="+this.created_at_start+"&created_at_end="+this.created_at_end+"&cron_start_time_start="+t+"&cron_start_time_end="+this.cron_start_time_end+"&sender_mails="+r+"&reciever_mails="+n,t},cron_start_time_end:function(t,e){var a=this.category_ids.map(function(t){return t.id}),r=this.sender_mails.map(function(t){return t.email}),n=this.reciever_mails.map(function(t){return t.email});return this.apiEndpoint=this.apiUrl+"?category_ids="+a+"&created_at_start="+this.created_at_start+"&created_at_end="+this.created_at_end+"&cron_start_time_start="+this.cron_start_time_start+"&cron_start_time_end="+t+"&sender_mails="+r+"&reciever_mails="+n,t},category_ids:function(t,e){var a=this.sender_mails.map(function(t){return t.email}),r=this.reciever_mails.map(function(t){return t.email}),n=t.map(function(t){return t.id});return this.apiEndpoint=this.apiUrl+"?category_ids="+n+"&created_at_start="+this.created_at_start+"&created_at_end="+this.created_at_end+"&cron_start_time_start="+this.cron_start_time_start+"&cron_start_time_end="+this.cron_start_time_end+"&sender_mails="+a+"&reciever_mails="+r,t},sender_mails:function(t,e){var a=this.category_ids.map(function(t){return t.id}),r=this.reciever_mails.map(function(t){return t.email}),n=t.map(function(t){return t.email});return this.apiEndpoint=this.apiUrl+"?category_ids="+a+"&created_at_start="+this.created_at_start+"&created_at_end="+this.created_at_end+"&cron_start_time_start="+this.cron_start_time_start+"&cron_start_time_end="+this.cron_start_time_end+"&sender_mails="+n+"&reciever_mails="+r,t},reciever_mails:function(t,e){var a=this.category_ids.map(function(t){return t.id}),r=this.sender_mails.map(function(t){return t.email}),n=t.map(function(t){return t.email});return this.apiEndpoint=this.apiUrl+"?category_ids="+a+"&created_at_start="+this.created_at_start+"&created_at_end="+this.created_at_end+"&cron_start_time_start="+this.cron_start_time_start+"&cron_start_time_end="+this.cron_start_time_end+"&sender_mails="+r+"&reciever_mails="+n,t},apiEndpoint:function(t,e){return t}},components:{"data-table":a(14)}}},2912:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-md-12"},[""!==this.apiEndpoint?e("data-table",{attrs:{id:"logs_table",url:this.apiEndpoint,dataColumns:this.columns,option:this.options,scroll_to:this.id,componentTitle:this.componentTitle}}):this._e()],1)},staticRenderFns:[]}},2913:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("faveo-box",{attrs:{title:t.lang("exception_logs")}},[a("div",{staticClass:"card-tools",staticStyle:{cursor:"pointer"},attrs:{slot:"headerMenu"},slot:"headerMenu"},[a("span",[a("i",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.lang("refresh"),expression:"lang('refresh')"}],staticClass:"fas fa-sync-alt",attrs:{"aria-hidden":"true"},on:{click:function(e){t.refreshTable()}}})])]),t._v(" "),a("div",{staticClass:"row"},[a("dynamic-select",{attrs:{label:t.lang("category"),multiple:!0,name:"category_ids",required:!1,prePopulate:!1,classname:"col-sm-6",apiEndpoint:"/api/log-category-list",value:t.category_ids,onChange:t.onChange}}),t._v(" "),a("date-time-field",{attrs:{label:t.lang("created_date"),value:t.created_date,type:"datetime","time-picker-options":t.timeOptions,name:"created_date",required:!1,onChange:t.onChange,range:"",currentYearDate:!1,format:"YYYY-MM-DD HH:mm:ss",classname:"col-sm-6",clearable:!0,editable:!0,disabled:!1}})],1),t._v(" "),a("div",{staticClass:"row"},[t.options.length?t._e():a("logs-table",{attrs:{id:"exception_logs_title",category_ids:t.category_ids,created_at_end:t.created_at_end,created_at_start:t.created_at_start,columns:t.columns,options:t.options,apiUrl:t.apiUrl,componentTitle:"exceptionLogs"}})],1)])},staticRenderFns:[]}},2914:function(t,e,a){var r=a(0)(a(2917),a(2927),!1,function(t){a(2915)},null,null);t.exports=r.exports},2915:function(t,e,a){var r=a(2916);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("867fbfcc",r,!0,{})},2916:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".cron-command,.cron-created,.cron-desc,.cron-duration,.cron-status{max-width:250px;word-break:break-all}#cron_logs_title .VueTables .table-responsive{overflow-x:auto}#cron_logs_title .VueTables .table-responsive>table{width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:100%;max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content;overflow:auto!important}",""])},2917:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(3),n=(a.n(r),a(19)),s=a.n(n),i=a(7),o=a(17),l=a.n(o),c=a(15),d=a.n(c),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t};d.a.component("log-status",a(246)),e.default={data:function(){return{apiUrl:"/api/logs/cron",columns:["command","description","duration","created_at","status"],options:{},cron_start_time_start:"",cron_start_time_end:"",moment:s.a,timeOptions:{start:"00:00",step:"00:30",end:"23:30"},created_date:"",created_at_start:"",created_at_end:""}},beforeMount:function(){var t=this;this.options={headings:{duration:this.trans("duration_in_seconds"),command:this.trans("command"),description:this.trans("description"),created_at:this.trans("created_at"),status:this.trans("status")},columnsClasses:{command:"cron-command",description:"cron-desc",duration:"cron-duration",created_at:"cron-created",status:"cron-status"},texts:{filter:"",limit:""},sortIcon:{base:"glyphicon",up:"glyphicon-chevron-down",down:"glyphicon-chevron-up"},templates:{created_at:function(e,a){return t.formattedTime(a.created_at)},status:"log-status"},sortable:["command","description","duration","created_at","status"],filterable:["category","start_time","end_time","message","created_at"],pagination:{chunk:5,nav:"fixed",edge:!0},requestAdapter:function(t){return{sort_field:t.orderBy,sort_order:t.ascending?"desc":"asc","search-query":t.query.trim(),page:t.page,limit:t.limit}},responseAdapter:function(t){var e=t.data;return{data:e.data.data,count:e.data.total}}}},computed:u({},Object(i.b)(["formattedTime","formattedDate"])),methods:{onChange:function(t,e){this[e]=t,"created_date"===e&&(this.created_at_start=null!==t[0]?s()(t[0]).format("YYYY-MM-DD+HH:mm:ss"):"",this.created_at_end=null!==t[1]?s()(t[1]).format("YYYY-MM-DD+HH:mm:ss"):""),this.cron_start_time_start=null!==t[0]?s()(t[0]).format("YYYY-MM-DD+HH:mm:ss"):"",this.cron_start_time_end=null!==t[1]?s()(t[1]).format("YYYY-MM-DD+HH:mm:ss"):""},refreshTable:function(){window.eventHub.$emit("cronLogsrefreshData")}},components:{"logs-table":a(127),"date-time-field":a(28),"faveo-box":l.a}}},2918:function(t,e,a){var r=a(2919);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("76fa03da",r,!0,{})},2919:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".log-status{min-width:65px}",""])},2920:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(3);a.n(r);e.default={name:"log-status",description:"status of the log",components:{"exception-detail-modal":a(2921)},props:{data:{type:Object,required:!0}},data:function(){return{showModal:!1}},computed:{badgeClass:function(){switch(this.data.status){case"sent":case"accepted":case"completed":return"btn-success";case"queued":case"running":case"pending":return"btn-warning";case"rejected":case"failed":case"blocked":return"btn-danger";default:return"btn-default"}},getStatusTitle:function(){return Boolean(this.data.exception)?this.data.status+": Click to view exception details.":this.data.status}},methods:{onClose:function(){this.showModal=!1}}}},2921:function(t,e,a){var r=a(0)(a(2924),a(2925),!1,function(t){a(2922)},"data-v-fa42eace",null);t.exports=r.exports},2922:function(t,e,a){var r=a(2923);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("6c31bed4",r,!0,{})},2923:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".trace[data-v-fa42eace]{padding:1rem;color:#fff;background-color:#000;height:35vh;overflow:auto!important;line-height:1.5!important;white-space:nowrap!important}",""])},2924:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(10),n=a.n(r);e.default={name:"exception-detail-modal",description:"Logs exception detail component",props:{showModal:{type:Boolean,default:!1},onClose:{type:Function,required:!0},data:{type:Object,required:!0}},data:function(){return{containerStyle:{width:"800px"}}},components:{modal:n.a}}},2925:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.showModal?a("modal",{attrs:{showModal:t.showModal,onClose:t.onClose,containerStyle:t.containerStyle},on:{close:function(e){t.showModal=!1}}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("h4",{staticClass:"modal-title"},[t._v(t._s(t.lang("exception_details")))])]),t._v(" "),a("div",{attrs:{slot:"fields"},slot:"fields"},[a("samp",{staticStyle:{"font-size":"small"}},[a("strong",[t._v(t._s(t.lang("message"))+":")]),t._v(" "),a("span",[t._v(t._s(t.data.message))]),a("br"),t._v(" "),a("br"),t._v(" "),a("strong",[t._v(t._s(t.lang("file"))+":")]),t._v(" "),a("span",[t._v(t._s(t.data.file)+"("+t._s(t.data.line)+")")]),a("br"),t._v(" "),a("br"),t._v(" "),a("strong",[t._v(t._s(t.lang("trace"))+":")]),t._v(" "),a("p",{staticClass:"trace",domProps:{innerHTML:t._s(t.data.trace)}})])])]):t._e()],1)},staticRenderFns:[]}},2926:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.getStatusTitle,expression:"getStatusTitle"}],class:["badge",t.badgeClass,"log-status","text-uppercase"],style:t.data.exception?{cursor:"pointer"}:{},attrs:{id:"log-status-"+t.data.id},on:{click:function(e){t.showModal=Boolean(t.data.exception)}}},[t._v("\n    "+t._s(t.lang(t.data.status))+"\n  ")]),t._v(" "),a("transition",{attrs:{name:"modal"}},[t.showModal?a("exception-detail-modal",{attrs:{onClose:t.onClose,showModal:t.showModal,data:t.data.exception}}):t._e()],1)],1)},staticRenderFns:[]}},2927:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("faveo-box",{attrs:{title:t.lang("cron_logs")}},[a("div",{staticClass:"card-tools",staticStyle:{cursor:"pointer"},attrs:{slot:"headerMenu"},slot:"headerMenu"},[a("span",[a("i",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.lang("refresh"),expression:"lang('refresh')"}],staticClass:"fas fa-sync-alt",attrs:{"aria-hidden":"true"},on:{click:function(e){t.refreshTable()}}})])]),t._v(" "),a("div",{staticClass:"row"},[a("date-time-field",{attrs:{label:t.lang("created_date"),value:t.created_date,type:"datetime","time-picker-options":t.timeOptions,name:"created_date",required:!1,onChange:t.onChange,range:"",currentYearDate:!1,format:"YYYY-MM-DD HH:mm:ss",classname:"col-sm-6",clearable:!0,editable:!0,disabled:!1}})],1),t._v(" "),a("div",{staticClass:"row"},[t.options.length?t._e():a("logs-table",{attrs:{id:"cron_logs_title",created_at_start:t.created_at_start,created_at_end:t.created_at_end,cron_start_time_start:t.cron_start_time_start,cron_start_time_end:t.cron_start_time_end,columns:t.columns,options:t.options,apiUrl:t.apiUrl,componentTitle:"cronLogs"}})],1)])},staticRenderFns:[]}},2928:function(t,e,a){var r=a(0)(a(2931),a(2947),!1,function(t){a(2929)},null,null);t.exports=r.exports},2929:function(t,e,a){var r=a(2930);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("2bf323a8",r,!0,{})},2930:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".mail-category{min-width:110px;word-break:break-all}.mail-subject{width:300px;word-break:break-all}.mail-receiver,.mail-sender{max-width:200px;word-break:break-all}.mail-refree-type{width:120px}.mail-created,.mail-refree,.mail-refree-type{word-break:break-all}.mail-refree{max-width:250px}.log-status{word-break:break-all}.mail-log-table #logs_table .VueTables .table-responsive{overflow-x:scroll}.mail-log-table #logs_table .VueTables .table-responsive>table{width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:100%;max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content}",""])},2931:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(15),n=a.n(r),s=a(7),i=a(17),o=a.n(i),l=a(19),c=a.n(l),d=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t};function u(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}n.a.component("mail-hover",a(2932)),n.a.component("referee-id",a(2937)),n.a.component("mail-subject",a(2942)),n.a.component("log-status",a(246)),e.default={data:function(){var t;return u(t={columns:[],options:{},apiUrl:"/api/logs/mail"},"columns",["category","sender_mail","reciever_mail","collaborators","subject","referee_id","referee_type","created_at","updated_at","status"]),u(t,"options",{}),u(t,"reciever_mails",[]),u(t,"sender_mails",[]),u(t,"category_ids",[]),u(t,"timeOptions",{start:"00:00",step:"00:30",end:"23:30"}),u(t,"created_date",""),u(t,"created_at_start",""),u(t,"created_at_end",""),u(t,"moment",c.a),t},beforeMount:function(){this.declareMailComponent("sender","sender_mail"),this.declareMailComponent("receiver","reciever_mail"),this.declareMailComponent("collaborators","collaborators");var t=this;this.options={headings:{category:"Category",subject:"Subject",sender_mail:"Sender mail",reciever_mail:"Reciever mail",collaborators:"Collaborators",referee_id:"Referee id",referee_type:"Referee type",created_at:"Created At",updated_at:"Updated At",status:"Status"},perPageValues:[10,25,50,100,200,500,1e3,2e3],sortIcon:{base:"glyphicon",up:"glyphicon-chevron-down",down:"glyphicon-chevron-up"},headingTooltips:{category:"Category"},columnsClasses:{category:"mail-category",subject:"mail-subject",sender_mail:"mail-sender",reciever_mail:"mail-receiver",referee_id:"mail-refree",referee_type:"mail-refree-type",created_at:"mail-created",updated_at:"mail-updated",status:"log-status"},texts:{filter:"",limit:""},templates:{category:function(t,e){return e.category.name},created_at:function(e,a){return t.formattedTime(a.created_at)},updated_at:function(e,a){return t.formattedTime(a.updated_at)},sender_mail:"sender",reciever_mail:"receiver",referee_id:"referee-id",status:"log-status",subject:"mail-subject",collaborators:"collaborators"},sortable:["category","referee_id","referee_type","sender_mail","reciever_mail","subject","source","created_at","updated_at","status"],filterable:["category","referee_id",,"referee_type","sender_mail","reciever_mail","subject","source","created_at"],pagination:{chunk:5,nav:"fixed",edge:!0},requestAdapter:function(t){return{sort_field:t.orderBy,sort_order:t.ascending?"desc":"asc","search-query":t.query.trim(),page:t.page,limit:t.limit}},responseAdapter:function(t){var e=t.data;return{data:e.data.data,count:e.data.total}}}},computed:d({},Object(s.b)(["formattedTime","formattedDate"])),methods:{onChange:function(t,e){this[e]=t,"created_date"===e&&(this.created_at_start=null!==t[0]?c()(t[0]).format("YYYY-MM-DD+HH:mm:ss"):"",this.created_at_end=null!==t[1]?c()(t[1]).format("YYYY-MM-DD+HH:mm:ss"):"")},declareMailComponent:function(t,e){return n.a.component(t,{props:["data"],template:'<mail-hover :data="data" objectKey='+e+"></mail-hover>"})},refreshTable:function(){window.eventHub.$emit("mailLogsrefreshData")}},components:{"logs-table":a(127),"dynamic-select":a(13),"date-time-field":a(28),"faveo-box":o.a}}},2932:function(t,e,a){var r=a(0)(a(2935),a(2936),!1,function(t){a(2933)},null,null);t.exports=r.exports},2933:function(t,e,a){var r=a(2934);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("f64ff168",r,!0,{})},2934:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".user-img{margin:auto;border:1px solid #d2d6de;border-radius:50px;width:40px!important;height:40px!important}.custom-head{padding:7px!important;min-height:12vh!important}.custom-name{margin-top:11px!important;margin-left:45px!important;font-size:15px!important}.cus-icon{color:#fff!important}.w-40{width:40px!important}.info-body{padding:15px!important;padding-left:7px!important}.vue-popover{padding:1px!important}",""])},2935:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(3),n=a.n(r),s=a(4),i=a(15),o=a.n(i),l=a(117),c=a.n(l),d=a(7),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t};o.a.use(c.a),e.default={name:"mail-hover",description:"Mail hover component",props:{data:{type:Object,required:!0},objectKey:{type:String,required:!0}},data:function(){return{popId:"",user_data:{},base:"",loading:!0,hasDataPopulated:!1,showAlert:!1,err_message:""}},computed:u({},Object(d.b)(["getUserData"]),{formattedData:function(){if(!Array.isArray(this.data[this.objectKey])){var t=Object.assign({},this.data);return t[this.objectKey]=[this.data[this.objectKey]],t}return this.data}}),watch:{popId:function(t,e){return t},getUserData:function(t,e){return this.base=t.system_url,t}},beforeMount:function(){this.getUserData.system_url&&(this.base=this.getUserData.system_url)},methods:{popOver:function(t){this.popId=t},getData:function(t,e){var a=this;this.user_data="",this.showAlert=!1,this.loading=!0,this.popId=e,n.a.get("/api/get-user-by-email?email="+t).then(function(t){a.showAlert=!1,a.user_data=t.data.data.user,a.loading=!1,a.hasDataPopulated=!0}).catch(function(t){a.loading=!1,a.showAlert=!0,a.err_message=t.response.data.message})},subString:function(t){return Object(s.q)(t,30)}},components:{loader:a(8),"faveo-image-element":a(22)}}},2936:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"main"},on:{mouseenter:function(e){t.popOver(t.data.id)},mouseleave:function(e){t.popOver(null)}}},t._l(t.formattedData[t.objectKey],function(e){return a("a",{directives:[{name:"popover",rawName:"v-popover:right",arg:"right"}],attrs:{id:"action_mail",href:"javascript:;"},on:{click:function(a){t.getData(e,t.formattedData.id)}}},[t._v(t._s(e)+"  \n\n        "),t.popId==t.data.id?a("popover",{staticStyle:{top:"!42px",left:"!927px",width:"289px"},attrs:{id:"action_mail_popover",event:"click",name:"right"}},[!0===t.showAlert&&!1===t.loading?a("div",[a("p",{staticClass:"text-muted"},[t._v(t._s(t.err_message))])]):t._e(),t._v(" "),!0===t.loading?a("div",[a("loader",{attrs:{"animation-duration":4e3,color:"#1d78ff",size:30}})],1):t._e(),t._v(" "),!0===t.hasDataPopulated&&!1===t.loading&&!1===t.showAlert?a("div",{staticClass:"box-widget widget-user-2 cus-container"},[a("div",{staticClass:"widget-user-header bg-info custom-head"},[a("div",{staticClass:"widget-user-image"},[a("faveo-image-element",{attrs:{id:"user_img","source-url":t.user_data.profile_pic,classes:["img-circle w-40","img-responsive"],"alternative-text":"User Image","img-width":40,"img-height":40}}),t._v(" "),a("a",{attrs:{href:t.user_data.profile_link,target:"_blank"}},[a("i",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.lang("view"),expression:"lang('view')"}],staticClass:"fas fa-eye float-right cus-icon"})])],1),t._v(" "),a("h3",{staticClass:"widget-user-username custom-name"},[a("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.user_data.name,expression:"user_data.name"}]},[t._v(t._s(t.subString(t.user_data.name)))])])]),t._v(" "),a("div",{staticClass:"card-footer p-0"},[a("ul",{staticClass:"nav flex-column"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link text-dark",attrs:{href:"javascript:;"}},[t._v("\n                          "+t._s(t.lang("email"))+" "),a("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.user_data.email,expression:"user_data.email"}],staticClass:"float-right"},[t._v(t._s(t.subString(t.user_data.email)))])])]),t._v(" "),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link text-dark",attrs:{href:"javascript:;"}},[t._v("\n                          "+t._s(t.lang("Role"))+" "),a("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.user_data.role,expression:"user_data.role"}],staticClass:"float-right"},[t._v(t._s(t.subString(t.user_data.role)))])])])])])]):t._e()]):t._e()],1)}))},staticRenderFns:[]}},2937:function(t,e,a){var r=a(0)(a(2940),a(2941),!1,function(t){a(2938)},null,null);t.exports=r.exports},2938:function(t,e,a){var r=a(2939);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("9ce93c76",r,!0,{})},2939:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".log-mail-referee-id{max-width:300px}",""])},2940:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(3);a.n(r);e.default={name:"referee-id",description:"Referee id component",props:{data:{type:Object,required:!0}},data:function(){return{showModal:!1}},methods:{refereeParser:function(t){return t.replace(this.basePath(),this.basePath()+"/panel")}}}},2941:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"log-mail-referee-id",attrs:{id:"referee_id"},domProps:{innerHTML:this._s(this.refereeParser(this.data.referee_id))}})},staticRenderFns:[]}},2942:function(t,e,a){var r=a(0)(a(2945),a(2946),!1,function(t){a(2943)},null,null);t.exports=r.exports},2943:function(t,e,a){var r=a(2944);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(2)("854c796c",r,!0,{})},2944:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,"",""])},2945:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(126),n=a.n(r);e.default={name:"mail-subject",description:"shows mail subject as a clickable link which gives mail body on click",props:{data:{type:Object,required:!0}},data:function(){return{showModal:!1}},methods:{onClose:function(){this.showModal=!1,this.$store.dispatch("unsetValidationError")},getMailBody:function(){this.showModal=!0}},components:{"logs-modal":n.a}}},2946:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a",{attrs:{href:"javascript:;",id:"log-mail-subject"},on:{click:t.getMailBody}},[t._v(t._s(t.data.subject))]),t._v(" "),a("transition",{attrs:{name:"modal"}},[t.showModal?a("logs-modal",{attrs:{onClose:t.onClose,showModal:t.showModal,data:t.data,title:"logs_content"}}):t._e()],1)],1)},staticRenderFns:[]}},2947:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("faveo-box",{attrs:{title:t.lang("mail_logs")}},[a("div",{staticClass:"card-tools",staticStyle:{cursor:"pointer"},attrs:{slot:"headerMenu",id:"mail_logs_table"},slot:"headerMenu"},[a("span",[a("i",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.lang("refresh"),expression:"lang('refresh')"}],staticClass:"fas fa-sync-alt",attrs:{"aria-hidden":"true"},on:{click:function(e){t.refreshTable()}}})])]),t._v(" "),a("div",{staticClass:"row"},[a("dynamic-select",{attrs:{label:t.lang("sender"),id:"sender-select-box",multiple:!0,name:"sender_mails",required:!1,prePopulate:!1,classname:"col-sm-6",apiEndpoint:"/api/dependency/users?meta=true&supplements=true",value:t.sender_mails,onChange:t.onChange}}),t._v(" "),a("dynamic-select",{attrs:{label:t.lang("receiver"),id:"reciever-select-box",multiple:!0,name:"reciever_mails",required:!1,prePopulate:!1,classname:"col-sm-6",apiEndpoint:"/api/dependency/users?meta=true&supplements=true",value:t.reciever_mails,onChange:t.onChange}}),t._v(" "),a("dynamic-select",{attrs:{label:t.lang("category"),multiple:!0,name:"category_ids",required:!1,prePopulate:!1,classname:"col-sm-6",apiEndpoint:"/api/log-category-list",value:t.category_ids,onChange:t.onChange}}),t._v(" "),a("date-time-field",{attrs:{label:t.lang("created_date"),value:t.created_date,type:"datetime","time-picker-options":t.timeOptions,name:"created_date",required:!1,onChange:t.onChange,range:"",currentYearDate:!1,format:"YYYY-MM-DD HH:mm:ss",classname:"col-sm-6",clearable:!0,editable:!0,disabled:!1}})],1),t._v(" "),a("div",{staticClass:"row mail-log-table"},[t.options.length?t._e():a("logs-table",{attrs:{id:"mail_logs_table",category_ids:t.category_ids,created_at_start:t.created_at_start,created_at_end:t.created_at_end,sender_mails:t.sender_mails,reciever_mails:t.reciever_mails,columns:t.columns,options:t.options,apiUrl:t.apiUrl,componentTitle:"mailLogs"}})],1)])},staticRenderFns:[]}},2948:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("alert",{attrs:{componentName:"dataTableModal"}}),t._v(" "),a("faveo-box",{attrs:{title:t.lang("logs")}},[a("div",{staticClass:"card-tools",attrs:{slot:"headerMenu"},slot:"headerMenu"},[a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.lang("delete_logs"),expression:"lang('delete_logs')"}],staticClass:"btn btn-tool",attrs:{type:"button"},on:{click:function(e){t.showModal=!0}}},[a("i",{staticClass:"fas fa-trash"})])]),t._v(" "),a("cron-logs"),t._v(" "),a("mail-logs"),t._v(" "),a("exception-logs")],1),t._v(" "),a("transition",{attrs:{name:"modal"}},[t.showModal?a("logs-modal",{attrs:{title:"delete_logs",onClose:t.onClose,showModal:t.showModal}}):t._e()],1)],1)},staticRenderFns:[]}}},[2892]);