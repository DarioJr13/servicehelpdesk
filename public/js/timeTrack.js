webpackJsonp([12],{3930:function(t,e,a){t.exports=a(3931)},3931:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(33),r=(a.n(i),a(11));a(24);Vue.component("timetrack-settings",a(3932)),Vue.component("worktime-type-index",a(3935)),Vue.component("worktime-type-create-edit",a(3940)),r.a.dispatch("deleteUser"),r.a.dispatch("updateUser");new Vue({el:"#app-timetrack",store:r.a})},3932:function(t,e,a){var i=a(0)(a(3933),a(3934),!1,null,null,null);t.exports=i.exports},3933:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3),r=a.n(i),o=a(6);e.default={name:"timetrack-settings",beforeMount:function(){this.getInitialValues()},data:function(){return{additional:0,hasDataPopulated:!1,loading:!0,pageLoad:!1,radioOptions:[{name:"yes",value:1},{name:"no",value:0}],require_thread_worktime:"",require_worktime_type_field:"",show_worktime_type_field:"",typeDisable:!1}},methods:{getInitialValues:function(){var t=this;r.a.get("/time-track/get-settings").then(function(e){t.loading=!1,t.hasDataPopulated=!0,t.additional=e.data.data.additional?1:0,t.require_thread_worktime=e.data.data.require_thread_worktime?1:0,t.show_worktime_type_field=e.data.data.show_worktime_type_field?1:0,t.typeDisable=!t.show_worktime_type_field,t.require_worktime_type_field=e.data.data.require_worktime_type_field?1:0}).catch(function(e){t.loading=!1,t.hasDataPopulated=!0})},onChange:function(t,e){this[e]=t,"show_worktime_type_field"===e&&(this.require_worktime_type_field=t?this.require_worktime_type_field:0,this.typeDisable=!t)},onSubmit:function(){var t=this;this.pageLoad=!0;var e={};e.additional=this.additional?1:0,e.require_thread_worktime=this.require_thread_worktime,e.show_worktime_type_field=this.show_worktime_type_field?1:0,e.require_worktime_type_field=this.show_worktime_type_field?this.require_worktime_type_field:0,r.a.post("/time-track",e).then(function(e){t.pageLoad=!1,Object(o.b)(e),t.getInitialValues()}).catch(function(e){t.pageLoad=!1,Object(o.a)(e)})}},components:{"status-switch":a(35),loader:a(8),alert:a(5),"custom-loader":a(9),"radio-button":a(20),checkbox:a(40)}}},3934:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("alert"),t._v(" "),a("div",{staticClass:"card card-light"},[a("div",{staticClass:"card-header"},[a("h3",{staticClass:"card-title"},[t._v(t._s(t.trans("time-track-settings")))])]),t._v(" "),a("div",{staticClass:"card-body"},[!t.hasDataPopulated||t.loading?a("div",{staticClass:"row"},[a("loader",{attrs:{"animation-duration":4e3,size:60}})],1):t._e(),t._v(" "),t.hasDataPopulated?[a("div",{staticClass:"row"},[a("radio-button",{attrs:{options:t.radioOptions,label:t.trans("timetype_visible"),name:"show_worktime_type_field",value:t.show_worktime_type_field,onChange:t.onChange,classname:"form-group col-sm-4"}}),t._v(" "),a("radio-button",{attrs:{options:t.radioOptions,label:t.trans("make_timetype_required"),name:"require_worktime_type_field",value:t.require_worktime_type_field,onChange:t.onChange,classname:"form-group col-sm-4",disabled:t.typeDisable}}),t._v(" "),a("radio-button",{attrs:{options:t.radioOptions,label:t.trans("worktime_field_required"),name:"require_thread_worktime",value:t.require_thread_worktime,onChange:t.onChange,classname:"form-group col-sm-4",hint:t.trans("require_thread_worktime_tooltip")}})],1)]:t._e()],2),t._v(" "),a("div",{staticClass:"card-footer"},[t.hasDataPopulated?a("checkbox",{attrs:{name:"additional",value:t.additional,label:t.lang("timetrack_application_level"),onChange:t.onChange,classname:"col-sm-12"}}):t._e(),t._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(e){t.onSubmit()}}},[a("i",{staticClass:"fas fa-save"}),t._v(" "+t._s(t.trans("save"))+"\n\t\t\t\t")])],1)]),t._v(" "),t.pageLoad?a("div",{staticClass:"row"},[a("custom-loader",{attrs:{duration:4e3}})],1):t._e()],1)},staticRenderFns:[]}},3935:function(t,e,a){var i=a(0)(a(3938),a(3939),!1,function(t){a(3936)},null,null);t.exports=i.exports},3936:function(t,e,a){var i=a(3937);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(2)("fcd94ae6",i,!0,{})},3937:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,".worktime-type-created,.worktime-type-name,.worktime-type-updated{width:25%;word-break:break-all}",""])},3938:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3),r=(a.n(i),a(15)),o=a.n(r),n=a(7),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};o.a.component("table-actions",a(21)),e.default={name:"worktime-type-list",description:"Worktime type lists table component",data:function(){return{columns:["name","created_at","updated_at","action"],options:{},apiUrl:"/api/worktime-type-list?meta=1"}},beforeMount:function(){var t=this;this.options={sortIcon:{base:"glyphicon",up:"glyphicon-chevron-down",down:"glyphicon-chevron-up"},texts:{filter:"",limit:""},columnsClasses:{name:"worktime-type-name",created_at:"worktime-type-created",updated_at:"worktime-type-updated"},templates:{created_at:function(e,a){return t.formattedTime(a.created_at)},updated_at:function(e,a){return t.formattedTime(a.updated_at)},action:"table-actions"},sortable:["name","created_at","updated_at"],filterable:["name","created_at","updated_at"],pagination:{chunk:5,nav:"fixed",edge:!0},requestAdapter:function(t){return{"sort-field":t.orderBy?t.orderBy:"id","sort-order":t.ascending?"desc":"asc","search-query":t.query.trim(),page:t.page,limit:t.limit}},responseAdapter:function(e){var a=e.data;return{data:a.data.data.map(function(e){return e.edit_url=t.basePath()+"/worktime-type/"+e.id,e.delete_url=t.basePath()+"/api/worktime-type/"+e.id,e}),count:a.data.total}}}},computed:s({},Object(n.b)(["formattedTime"])),components:{"data-table":a(14),alert:a(5)}}},3939:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("alert",{attrs:{componentName:"dataTableModal"}}),t._v(" "),a("div",{staticClass:"card card-light worktime-type-table"},[a("div",{staticClass:"card-header"},[a("h3",{staticClass:"card-title",attrs:{id:"worktime-type-list"}},[t._v(t._s(t.trans("list_of_worktime_types")))]),t._v(" "),a("div",{staticClass:"card-tools"},[a("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.trans("add-worktime-type"),expression:"trans('add-worktime-type')"}],staticClass:"btn btn-tool",attrs:{href:t.basePath()+"/worktime-type"}},[a("span",{staticClass:"glyphicon glyphicon-plus"})])])]),t._v(" "),a("div",{staticClass:"card-body",attrs:{id:"worktime-type-table"}},[a("data-table",{attrs:{url:t.apiUrl,dataColumns:t.columns,option:t.options,scroll_to:"license-type-list"}})],1)])],1)},staticRenderFns:[]}},3940:function(t,e,a){var i=a(0)(a(3943),a(3944),!1,function(t){a(3941)},"data-v-5e985291",null);t.exports=i.exports},3941:function(t,e,a){var i=a(3942);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(2)("42d94c0e",i,!0,{})},3942:function(t,e,a){(t.exports=a(1)(!1)).push([t.i,"",""])},3943:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3),r=a.n(i),o=a(6),n=a(4),s=a(11),d=a(16);e.default={name:"worktime-type-create-edit",data:function(){return{title:"create_worktime_type",iconClass:"fas fa-save",btnName:"save",hasDataPopulated:!1,loading:!1,worktime_type_id:"",name:""}},beforeMount:function(){var t=window.location.pathname;this.getValues(t)},methods:{getValues:function(t){var e=Object(n.o)(t);e?(this.title="edit_worktime_type",this.iconClass="fas fa-sync",this.btnName="update",this.hasDataPopulated=!1,this.getInitialValues(e)):(this.loading=!1,this.hasDataPopulated=!0)},getInitialValues:function(t){var e=this;this.loading=!0,r.a.get("/api/worktime-type/"+t).then(function(t){e.loading=!1,e.hasDataPopulated=!0,e.name=t.data.data.name,e.worktime_type_id=t.data.data.id}).catch(function(t){e.loading=!1,Object(o.a)(t,"worktime-type-create-edit"),e.redirect("/worktime-type/list")})},isValid:function(){var t=function(t){var e={name:[t.name,"isRequired"]},a=new d.Validator(n.s).validate(e),i=a.errors,r=a.isValid;return s.a.dispatch("setValidationError",i),{errors:i,isValid:r}}(this.$data),e=(t.errors,t.isValid);return!!e},onChange:function(t,e){this[e]=t},onSubmit:function(){var t=this;if(this.isValid()){this.loading=!0;var e={};e.name=this.name;var a="/api/worktime-type/"+this.worktime_type_id;r.a.post(a,e).then(function(e){t.loading=!1,Object(o.b)(e,"worktime-type-create-edit"),t.worktime_type_id||t.redirect("/worktime-type/list")}).catch(function(e){t.loading=!1,Object(o.a)(e,"worktime-type-create-edit")})}}},components:{alert:a(5),"custom-loader":a(9),"text-field":a(12)}}},3944:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[!t.hasDataPopulated||t.loading?a("div",{staticClass:"row"},[a("custom-loader",{attrs:{duration:4e3}})],1):t._e(),t._v(" "),a("alert",{attrs:{componentName:"worktime-type-create-edit"}}),t._v(" "),t.hasDataPopulated?a("div",{staticClass:"card card-light"},[a("div",{staticClass:"card-header"},[a("h3",{staticClass:"card-title"},[t._v(t._s(t.trans(t.title)))])]),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("text-field",{attrs:{label:t.trans("name"),value:t.name,type:"text",name:"name",onChange:t.onChange,classname:"col-sm-6",required:!0}})],1)]),t._v(" "),a("div",{staticClass:"card-footer"},[a("button",{staticClass:"btn btn-primary",attrs:{id:"submit_btn"},on:{click:function(e){t.onSubmit()}}},[a("i",{class:t.iconClass}),t._v(" "+t._s(t.trans(t.btnName))+"\n\t\t\t")])])]):t._e()],1)},staticRenderFns:[]}}},[3930]);