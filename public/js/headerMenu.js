webpackJsonp([14],{2671:function(t,a,e){t.exports=e(2672)},2672:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(33),n=(e.n(s),e(11)),i=e(15),o=e.n(i),r=e(70),d=e(62);e(24),o.a.component("system-updates",e(2673)),o.a.component("database-updates",e(2678)),o.a.use(d.a),o.a.use(r.a),new o.a({el:"#header-container",store:n.a})},2673:function(t,a,e){var s=e(0)(e(2676),e(2677),!1,function(t){e(2674)},"data-v-e6b0d8b0",null);t.exports=s.exports},2674:function(t,a,e){var s=e(2675);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(2)("42850abd",s,!0,{})},2675:function(t,a,e){(t.exports=e(1)(!1)).push([t.i,".update_badge[data-v-e6b0d8b0]{right:1px!important}",""])},2676:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"syatem-updates",props:{updatesCount:{type:String|Number,default:""}}}},2677:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item dropdown"},[e("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.trans("application_updates"),expression:"trans('application_updates')"}],staticClass:"nav-link",attrs:{"data-toggle":"dropdown",href:"javascript:;"}},[e("i",{staticClass:"fas fa-sync-alt"}),t._v(" "),e("span",{staticClass:"badge badge-warning navbar-badge update_badge"},[t._v(t._s(t.updatesCount))])]),t._v(" "),e("div",{staticClass:"dropdown-menu dropdown-menu-lg dropdown-menu-right"},[t.updatesCount?t._e():e("span",{staticClass:"dropdown-header"},[t._v("You have "+t._s(t.updatesCount)+" update(s)")]),t._v(" "),t.updatesCount?[e("span",{staticClass:"dropdown-header"},[t._v("New version(s) available.")]),t._v(" "),e("div",{staticClass:"dropdown-divider"}),t._v(" "),e("a",{staticClass:"dropdown-item",attrs:{href:"javascript:;"}},[t._v("\n\t\t\t\t\n\t\t\t\tPlease "),e("a",{attrs:{href:t.basePath()+"/check-updates"}},[t._v(" click here ")]),t._v(" to update your system.\n\t\t\t")])]:t._e()],2)])},staticRenderFns:[]}},2678:function(t,a,e){var s=e(0)(e(2681),e(2682),!1,function(t){e(2679)},"data-v-67afb6f7",null);t.exports=s.exports},2679:function(t,a,e){var s=e(2680);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(2)("7c0d148f",s,!0,{})},2680:function(t,a,e){(t.exports=e(1)(!1)).push([t.i,".w_100[data-v-67afb6f7]{width:200px;height:120px;-o-object-fit:contain;object-fit:contain;-o-object-position:50% 50%;object-position:50% 50%}.fs_title[data-v-67afb6f7]{font-size:1.3rem!important}.lockscreen-logo[data-v-67afb6f7]{margin-bottom:15px!important}.lockscreen-wrapper[data-v-67afb6f7]{margin-top:15%!important}",""])},2681:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});e(6);var s=e(3),n=e.n(s);a.default={name:"database-updates",data:function(){return{loading:!1,isDisabled:!1}},methods:{onClick:function(){var t=this;this.loading=!0,this.isDisabled=!0,n.a.post("/update-database").then(function(a){t.loading=!1,t.redirect("/auth/login")}).catch(function(a){t.loading=!1,t.isDisabled=!1,t.redirect("/")})}},components:{"custom-loader":e(9)}}},2682:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"lockscreen-wrapper"},[t.loading?e("div",{staticClass:"row"},[e("custom-loader",{attrs:{duration:4e3}})],1):t._e(),t._v(" "),e("div",{staticClass:"card"},[t._m(0),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"card-footer bg-white text-center"},[e("button",{staticClass:"btn btn-primary btn-block",attrs:{disabled:t.isDisabled},on:{click:t.onClick}},[e("i",{staticClass:"fas fa-sync"}),t._v(" Click here to update Database\n            \t")])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"card-header"},[a("h3",{staticClass:"card-title fs_title"},[this._v("Database Update Required")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"card-body box-profile"},[a("span",[this._v("\n        \n                \tFile system has been updated but your database is still on the older version! Before we send you on your way, we have to update your database to the latest version.\n\n                \t"),a("br"),a("br"),this._v("\n                \tThe update process may take a little while, so please be patient. We will redirect you back once your database updation is complete.\n                ")])])}]}}},[2671]);