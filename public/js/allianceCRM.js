webpackJsonp([15],{3867:function(t,a,e){t.exports=e(3868)},3868:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(11);e(24).injectComponentIntoView("alliance-customer-timeline",e(3869),"ticket-timeline-boxes-mounted","timeline-boxes");new Vue({el:"#alliance-crm-settings",store:s.a,components:{"crm-settings":e(3874)}})},3869:function(t,a,e){var s=e(0)(e(3872),e(3873),!1,function(t){e(3870)},"data-v-ac8a7d18",null);t.exports=s.exports},3870:function(t,a,e){var s=e(3871);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(2)("7073b190",s,!0,{})},3871:function(t,a,e){(t.exports=e(1)(!1)).push([t.i,".info-row[data-v-ac8a7d18]{border-bottom:1px solid #d8d8d8;padding:10px}.fs-25[data-v-ac8a7d18]{font-size:25px}.w_80[data-v-ac8a7d18]{width:80%}",""])},3872:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(3),n=e.n(s);a.default={name:"alliance-customer-timeline",props:{data:{type:String,required:!0}},data:function(){return{showUserData:!1,customerDataFields:{},loading:!0,userData:null,cardOpen:!1}},beforeMount:function(){this.userData=JSON.parse(this.data)},created:function(){window.eventHub.$on("ticket-timeline-boxes-mounted",this.updateUserData)},methods:{toggleCard:function(){this.cardOpen=!this.cardOpen,this.cardOpen&&this.getCustomerFromCRM()},updateUserData:function(t){this.userData.user.user_name!=t.user.user_name&&(this.userData=t,this.getCustomerFromCRM())},getCustomerFromCRM:function(){var t=this,a=this.userData.id;this.showUserData=!1,this.loading=!0,n.a.get("/alliance-crm/api/search-ticket-customer/"+a).then(function(a){t.showUserData=!0,t.customerDataFields=a.data.data,t.loading=!1}).catch(function(a){t.loading=!1})},ucfirst:function(t){return t.charAt(0).toUpperCase()+t.slice(1)}},components:{"faveo-box":e(17),loader:e(8)}}},3873:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card card-light"},[e("div",{staticClass:"card-header pointer"},[e("h3",{staticClass:"card-title w_80",on:{click:t.toggleCard}},[t._v(t._s(t.trans("alliance_crm_infomation")))]),t._v(" "),e("div",{staticClass:"card-tools"},[t.cardOpen?e("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.trans("refresh"),expression:"trans('refresh')"}],staticClass:"btn btn-tool",attrs:{href:"javascript:;"},on:{click:t.getCustomerFromCRM}},[e("i",{staticClass:"fas fa-sync-alt"})]):t._e(),t._v(" "),e("button",{staticClass:"btn btn-tool",attrs:{type:"button"},on:{click:t.toggleCard}},[e("i",{staticClass:"fs-25",class:{"fas fa-angle-up":t.cardOpen,"fas fa-angle-down":!t.cardOpen}})])])]),t._v(" "),t.cardOpen?e("div",{staticClass:"card-body"},[t.loading?e("div",{staticClass:"row"},[e("loader",{attrs:{"animation-duration":4e3,size:60}})],1):e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[t.showUserData?e("div",{staticClass:"row"},t._l(t.customerDataFields,function(a,s){return e("div",{staticClass:"col-md-6 info-row"},[e("div",{staticClass:"col-md-6"},[e("label",[t._v(t._s(t.ucfirst(s)))])]),t._v(" "),e("div",{staticClass:"col-md-6"},[t._v("\n                                    "+t._s(a)+"\n                                ")])])})):e("div",[t._v("\n                            User not found on CRM or system is unable to load data at the moment\n                        ")])])])])]):t._e()])},staticRenderFns:[]}},3874:function(t,a,e){var s=e(0)(e(3877),e(3878),!1,function(t){e(3875)},"data-v-7e52336f",null);t.exports=s.exports},3875:function(t,a,e){var s=e(3876);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(2)("45ca247a",s,!0,{})},3876:function(t,a,e){(t.exports=e(1)(!1)).push([t.i,".ml_10[data-v-7e52336f]{margin-left:-10px!important}",""])},3877:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(3),n=e.n(s),i=e(6),r=e(11),o=e(16),l=e(4);a.default={name:"crm-settings",description:"Alliance CRM Settings page",data:function(){return{loading:!0,hasDataPopulated:!1,username:"",password:"",source:"",app_id:"",app_secret:"",radioOptions:[{name:"yes",value:1},{name:"no",value:0}],required_for_agents:1,required_for_clients:1}},beforeMount:function(){this.getInitialValues()},methods:{getInitialValues:function(){var t=this;this.loading=!0,n.a.get("/alliance-crm/api/settings").then(function(a){t.loading=!1,t.hasDataPopulated=!0,t.updatesStateWithData(a.data.data)}).catch(function(a){t.loading=!1,t.hasDataPopulated=!0})},updatesStateWithData:function(t){var a=this,e=this.$data;Object.keys(t).map(function(s){e.hasOwnProperty(s)&&(a[s]=t[s])})},isValid:function(){var t=function(t){var a={username:[t.username,"isRequired"],password:[t.password,"isRequired"],source:[t.source,"isRequired"]},e=new o.Validator(l.s).validate(a),s=e.errors,n=e.isValid;return r.a.dispatch("setValidationError",s),{errors:s,isValid:n}}(this.$data),a=(t.errors,t.isValid);return a},onChange:function(t,a){this[a]=t},onSubmit:function(){var t=this;if(this.isValid()){this.loading=!0;var a={};a.username=this.username,a.password=this.password,a.source=this.source,a.app_id=this.app_id||null,a.app_secret=this.app_secret||null,a.required_for_agents=this.required_for_agents,a.required_for_clients=this.required_for_clients,n.a.post("/alliance-crm/api/settings",a).then(function(a){t.loading=!1,t.hasDataPopulated=!0,Object(i.b)(a,"crm-settings"),t.getInitialValues()}).catch(function(a){t.loading=!1,t.hasDataPopulated=!0,Object(i.a)(a,"crm-settings")})}}},components:{"text-field":e(12),"faveo-box":e(17),alert:e(5),"custom-loader":e(9),"radio-button":e(20)}}},3878:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("alert",{attrs:{componentName:"crm-settings"}}),t._v(" "),t.loading?e("div",[e("custom-loader",{attrs:{loadingSpeed:4e3}})],1):t._e(),t._v(" "),t.hasDataPopulated?e("faveo-box",{attrs:{title:t.trans("alliance_crm_integration")}},[e("div",{staticClass:"row"},[e("text-field",{staticClass:"col-sm-6",attrs:{label:t.trans("user_name"),type:"text",value:t.username,name:"username",required:!0,onChange:t.onChange}}),t._v(" "),e("text-field",{attrs:{label:t.trans("password"),type:"password",name:"password",value:t.password,classname:"col-sm-6",required:!0,onChange:t.onChange}})],1),t._v(" "),e("div",{staticClass:"row"},[e("text-field",{staticClass:"col-sm-6",attrs:{label:t.trans("source"),type:"text",value:t.source,name:"source",required:!0,onChange:t.onChange}}),t._v(" "),e("text-field",{attrs:{label:t.trans("app_id"),type:"text",name:"app_id",value:t.app_id,classname:"col-sm-6",required:!1,onChange:t.onChange}})],1),t._v(" "),e("div",{staticClass:"row"},[e("text-field",{staticClass:"col-sm-6",attrs:{label:t.trans("app_secret"),type:"text",value:t.app_secret,name:"app_secret",required:!1,onChange:t.onChange}}),t._v(" "),e("radio-button",{attrs:{options:t.radioOptions,label:t.trans("required_for_agents"),name:"required_for_agents",value:t.required_for_agents,onChange:t.onChange,classname:"form-group col-sm-6"}}),t._v(" "),e("radio-button",{attrs:{options:t.radioOptions,label:t.trans("required_for_clients"),name:"required_for_clients",value:t.required_for_clients,onChange:t.onChange,classname:"form-group col-sm-6"}})],1),t._v(" "),e("div",{staticClass:"card-footer",attrs:{slot:"actions"},slot:"actions"},[e("button",{staticClass:"btn btn-primary",attrs:{slot:"actions",type:"button",disabled:t.loading},on:{click:function(a){t.onSubmit()}},slot:"actions"},[e("i",{staticClass:"fa fa-save"}),t._v(" "+t._s(t.trans("save"))+"\n\t\t\t")])])]):t._e()],1)},staticRenderFns:[]}}},[3867]);