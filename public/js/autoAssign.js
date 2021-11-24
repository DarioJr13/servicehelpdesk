webpackJsonp([27],{3884:function(t,a,s){t.exports=s(3885)},3885:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=s(33),e=(s.n(n),s(11));s(24);Vue.component("auto-assign",s(3886)),e.a.dispatch("deleteUser"),e.a.dispatch("updateUser");new Vue({el:"#app-auto-assign",store:e.a})},3886:function(t,a,s){var n=s(0)(s(3887),s(3888),!1,null,null,null);t.exports=n.exports},3887:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=s(6),e=s(3),i=s.n(e),o=s(11),r=s(16),l=s(4);a.default={name:"auto-assign",data:function(){return{status:0,only_login:0,assign_not_accept:0,assign_with_type:0,is_location:0,assign_department_option:"all",threshold:"",department_list:[],radioOptions:[{name:"yes",value:1},{name:"no",value:0}],deptOptions:[{name:"all",value:"all"},{name:"specific",value:"specific"}],loading:!0,hasDataPopulated:!1,pageLoad:!1}},beforeMount:function(){this.getValues()},methods:{getValues:function(){var t=this;i.a.get("/api/get-auto-assign").then(function(a){t.loading=!1,t.hasDataPopulated=!0,t.updateStatesWithData(a.data.data.autoAssign)}).catch(function(a){t.loading=!1,t.hasDataPopulated=!0})},updateStatesWithData:function(t){var a=this,s=this.$data;Object.keys(t).map(function(n){s.hasOwnProperty(n)&&(a[n]="assign_department_option"!=n&&"department_list"!=n?parseInt(t[n]):t[n])}),this.threshold=this.threshold?this.threshold:""},onChange:function(t,a){this[a]=t,"all"==this.assign_department_option&&(this.department_list=[])},isValid:function(){var t=function(t){t.threshold,t.assign_department_option,t.department_list;var a={};"specific"===t.assign_department_option&&(a.department_list=[t.department_list,"isRequired"]);var s=new r.Validator(l.s).validate(a),n=s.errors,e=s.isValid;return o.a.dispatch("setValidationError",n),{errors:n,isValid:e}}(this.$data),a=(t.errors,t.isValid);return a},onSubmit:function(){var t=this;if(this.isValid()){this.pageLoad=!0;var a={};a.status=this.status,a.only_login=this.only_login,a.assign_not_accept=this.assign_not_accept,a.assign_with_type=this.assign_with_type,a.is_location=this.is_location,a.threshold=this.threshold,a.assign_department_option=this.assign_department_option,"specific"===this.assign_department_option&&(a.department_list=this.department_list.map(function(t){return t.id})),i.a.post("/api/auto-assign",a).then(function(a){t.pageLoad=!1,Object(n.b)(a,"AutoAssign"),t.getValues()}).catch(function(a){Object(n.a)(a,"AutoAssign"),t.pageLoad=!1})}}},components:{"radio-button":s(20),"number-field":s(27),"dynamic-select":s(13),loader:s(8),alert:s(5),"custom-loader":s(9)}}},3888:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("alert",{attrs:{componentName:"AutoAssign"}}),t._v(" "),s("div",{staticClass:"card card-light"},[s("div",{staticClass:"card-header"},[s("h3",{staticClass:"card-title"},[t._v(t._s(t.trans("settings")))])]),t._v(" "),s("div",{staticClass:"card-body"},[t.loading||!t.hasDataPopulated?[s("div",{staticClass:"row"},[s("loader",{attrs:{"animation-duration":4e3,size:60}})],1)]:t._e(),t._v(" "),t.hasDataPopulated?[s("div",{staticClass:"row"},[s("radio-button",{attrs:{options:t.radioOptions,label:t.trans("enable"),name:"status",value:t.status,onChange:t.onChange,classname:"form-group col-sm-6"}}),t._v(" "),s("radio-button",{attrs:{options:t.radioOptions,label:t.trans("only-login-agents"),name:"only_login",value:t.only_login,onChange:t.onChange,classname:"form-group col-sm-6"}})],1),t._v(" "),s("div",{staticClass:"row"},[s("radio-button",{attrs:{options:t.radioOptions,label:t.trans("assign-ticket-even-agent-in-non-acceptable-mode"),name:"assign_not_accept",value:t.assign_not_accept,onChange:t.onChange,classname:"form-group col-sm-6"}}),t._v(" "),s("radio-button",{attrs:{options:t.radioOptions,label:t.trans("assign-ticket-with-agent-having-type"),name:"assign_with_type",value:t.assign_with_type,onChange:t.onChange,classname:"form-group col-sm-6"}})],1),t._v(" "),s("div",{staticClass:"row"},[s("radio-button",{attrs:{options:t.radioOptions,label:t.trans("assign-ticket-with-agent-having-location"),name:"is_location",value:t.is_location,onChange:t.onChange,classname:"form-group col-sm-6"}}),t._v(" "),s("radio-button",{attrs:{options:t.deptOptions,label:t.trans("auto-assign-enabled-departments"),name:"assign_department_option",value:t.assign_department_option,onChange:t.onChange,classname:"form-group col-sm-6"}})],1),t._v(" "),s("div",{staticClass:"row"},[s("number-field",{attrs:{label:t.trans("maximum-number-of-ticket-can-assign-to-agent"),value:t.threshold,name:"threshold",onChange:t.onChange,classname:"col-sm-6",type:"number",required:!1,placeholder:"n"}}),t._v(" "),"specific"===t.assign_department_option?s("dynamic-select",{attrs:{label:t.trans("select-deparment"),multiple:!0,name:"department_list",classname:"col-sm-6",apiEndpoint:"/api/dependency/departments",value:t.department_list,onChange:t.onChange,strlength:30,required:!0}}):t._e()],1)]:t._e()],2),t._v(" "),s("div",{staticClass:"card-footer"},[s("button",{staticClass:"btn btn-primary",on:{click:t.onSubmit}},[s("i",{staticClass:"fas fa-sync"}),t._v(" "+t._s(t.trans("update"))+"\n\t\t\t")])])]),t._v(" "),t.pageLoad?s("div",{staticClass:"row"},[s("custom-loader",{attrs:{duration:4e3}})],1):t._e()],1)},staticRenderFns:[]}}},[3884]);