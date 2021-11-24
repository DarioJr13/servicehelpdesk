webpackJsonp([17],{3904:function(t,e,a){t.exports=a(3905)},3905:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(11);a(24);new Vue({el:"#custom-js",store:n.a,components:{"custom-js-create-edit":a(3906),"custom-js-index":a(3909)}})},3906:function(t,e,a){var n=a(0)(a(3907),a(3908),!1,null,null,null);t.exports=n.exports},3907:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(34),s=a.n(n),r=a(12),i=a.n(r),o=a(17),c=a.n(o),l=a(20),u=a.n(l),d=a(3),m=a.n(d),f=a(5),p=a.n(f),h=a(9),v=a.n(h),b=a(6),g=a(25),_=a.n(g);function x(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(s,r){try{var i=e[s](r),o=i.value}catch(t){return void a(t)}if(!i.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}e.default={name:"CustomJsCreateEdit",components:{"text-field":i.a,"faveo-box":c.a,"radio-button":u.a,alert:p.a,loader:v.a,"static-select":_.a},data:function(){return{name:"",fired_at:"",firedAtElements:[{id:"adminlayout",name:this.lang("adminlayout")},{id:"agentlayout",name:this.lang("agentlayout")},{id:"clientlayout",name:this.lang("clientlayout")}],radioOptions:[{name:"Active",value:1},{name:"Inactive",value:0}],isDisabled:!1,script:"",fire:1,loading:!1,idForEdit:0,parameter:"",parameterElementsList:[]}},mounted:function(){this.idForEdit&&this.getDetailsForEdit()},beforeMount:function(){this.setparameterElementsList(),this.setDefaultProps()},computed:{componentTitle:function(){return this.idForEdit?this.lang("custom_js_edit"):this.lang("custom_js_create")},parameterElements:function(){return"adminlayout"==this.fired_at&&Object.keys(this.parameterElementsList).length?this.parameterElementsList.admin:"agentlayout"==this.fired_at&&Object.keys(this.parameterElementsList).length?this.parameterElementsList.agent:[]},disabled:function(){return"clientlayout"==this.fired_at}},methods:{onChange:function(t,e){this[e]=t,"fired_at"==e&&(this.parameter="")},submit:function(){var t=x(s.a.mark(function t(){var e,a,n,r,i=this;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.loading=!0,e=void 0,a=void 0,n={fired_at:this.fired_at,script:this.script,name:this.name,fire:this.fire,parameter:this.parameter},this.idForEdit?(e="custom-js/edit/"+this.idForEdit,a="PATCH"):(e="custom-js/create",a="POST"),t.prev=4,t.next=7,m.a.request({method:a,url:e,data:n});case 7:r=t.sent,this.$store.dispatch("unsetValidationError"),Object(b.b)(r,"customJs"),this.idForEdit||setTimeout(function(){i.redirect("/custom-js/settings")},2e3),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(4),Object(b.a)(t.t0,"customJs");case 16:return t.prev=16,this.loading=!1,t.next=20,this.getDetailsForEdit();case 20:return t.finish(16);case 21:case"end":return t.stop()}},t,this,[[4,13,16,21]])}));return function(){return t.apply(this,arguments)}}(),getDetailsForEdit:function(){var t=x(s.a.mark(function t(){var e,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get("custom-js/details/"+this.idForEdit);case 3:e=t.sent,a=e.data,this.updateStatesWithData(a.data),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(0);case 10:case"end":return t.stop()}},t,this,[[0,8]])}));return function(){return t.apply(this,arguments)}}(),updateStatesWithData:function(t){var e=this,a=this.$data;Object.keys(t).map(function(n){a.hasOwnProperty(n)&&(e[n]=t[n])})},setDefaultProps:function(){var t=location.href;if(t.includes("edit")){var e=t.split("/").length;this.idForEdit=t.split("/")[e-1]}},setparameterElementsList:function(){var t=x(s.a.mark(function t(){var e,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get("custom-js/get-routes");case 3:e=t.sent,a=e.data,this.parameterElementsList=a.data,t.next=10;break;case 8:t.prev=8,t.t0=t.catch(0);case 10:case"end":return t.stop()}},t,this,[[0,8]])}));return function(){return t.apply(this,arguments)}}()}}},3908:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"main"}},[a("alert",{attrs:{componentName:"customJs"}}),t._v(" "),t.loading?a("loader"):t._e(),t._v(" "),a("faveo-box",{attrs:{title:t.componentTitle}},[a("div",{staticClass:"row"},[a("text-field",{attrs:{name:"name",value:t.name,"on-change":t.onChange,label:t.lang("name"),type:"text",required:!0,classname:"col-sm-4"}}),t._v(" "),a("static-select",{attrs:{name:"fired_at",value:t.fired_at,"on-change":t.onChange,label:t.lang("fired_at"),elements:t.firedAtElements,required:!0,classname:"col-sm-4"}}),t._v(" "),a("static-select",{attrs:{name:"parameter",value:t.parameter,"on-change":t.onChange,label:t.lang("parameter"),elements:t.parameterElements,required:!1,classname:"col-sm-4",disabled:t.disabled,hint:t.lang("select_url_description")}})],1),t._v(" "),a("div",{staticClass:"row"},[a("radio-button",{attrs:{options:t.radioOptions,label:t.lang("fire-javascript"),name:"fire",value:t.fire,onChange:t.onChange,classname:"col-sm-4"}})],1),t._v(" "),a("div",{staticClass:"row"},[a("text-field",{attrs:{value:t.script,name:"script",type:"textarea","on-change":t.onChange,classname:"col-sm-12",label:t.lang("script"),required:!0,rows:"6",hint:t.lang("customjs_script_hint")}})],1),t._v(" "),a("div",{staticClass:"card-footer",attrs:{slot:"actions"},slot:"actions"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button",id:"submitter",disabled:t.isDisabled},on:{click:t.submit}},[a("i",{staticClass:"fas fa-save",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.lang("submit"))+"\n           ")])])])],1)},staticRenderFns:[]}},3909:function(t,e,a){var n=a(0)(a(3910),a(3911),!1,null,null,null);t.exports=n.exports},3910:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(15),s=a.n(n),r=a(17),i=a.n(r),o=a(14),c=a.n(o),l=a(21),u=a.n(l),d=a(5),m=a.n(d),f=a(7),p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t};s.a.component("table-actions",u.a),e.default={name:"CustomCssIndex",components:{FaveoBox:i.a,DataTable:c.a,Alert:m.a},computed:p({},Object(f.b)(["formattedTime","formattedDate"])),data:function(){return{apiUrl:"get-custom-js",loading:!1,columns:["name","fired_at","fire","action"],options:{}}},methods:{addPage:function(){this.redirect("/custom-js/create")}},beforeMount:function(){var t=this;this.options={headings:{name:"Name",fired_at:"Fired at",fire:"Status",action:"Actions"},sortIcon:{base:"glyphicon",up:"glyphicon-chevron-up",down:"glyphicon-chevron-down"},texts:{filter:"",limit:""},templates:{fired_at:function(t,e){return e.formatted_fired_at?e.formatted_fired_at:e.fired_at},fire:function(t,e){return t("a",{},[t("span",{attrs:{class:e.fire?"btn btn-success btn-xs":"btn btn-danger btn-xs"}},e.fire?"Active":"Inactive")])},action:"table-actions"},requestAdapter:function(t){return{"sort-field":t.orderBy?t.orderBy:"id","sort-order":t.ascending?"desc":"asc","search-query":t.query.trim(),page:t.page,limit:t.limit}},responseAdapter:function(e){var a=e.data;return{data:a.message.data.map(function(e){return e.delete_url=t.basePath()+"/custom-js/delete/"+e.id,e.edit_url=t.basePath()+"/custom-js/edit/"+e.id,e}),count:a.message.total}},sortable:["name","fired_at","fire"],filterable:["name"],pagination:{chunk:5,nav:"fixed",edge:!0}}}}},3911:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("alert",{attrs:{componentName:"dataTableModal"}}),t._v(" "),a("faveo-box",{attrs:{title:t.lang("custom-js")}},[a("div",{staticClass:"card-tools",attrs:{slot:"headerMenu"},slot:"headerMenu"},[a("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.lang("add"),expression:"lang('add')"}],staticClass:"btn btn-tool",attrs:{href:t.basePath()+"/custom-js/create"}},[a("i",{staticClass:"fas fa-plus"})])]),t._v(" "),a("div",{staticClass:"row",attrs:{id:"custom-js-view"}},[a("data-table",{staticClass:"col-sm-12",attrs:{url:t.apiUrl,dataColumns:t.columns,option:t.options,scroll_to:"custom-js-view"}})],1)])],1)},staticRenderFns:[]}}},[3904]);