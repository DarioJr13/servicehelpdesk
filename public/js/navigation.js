webpackJsonp([20],{2664:function(n,a,t){n.exports=t(2665)},2665:function(n,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=t(33),i=(t.n(e),t(11)),o=t(62);t(24),Vue.component("admin-navigation-bar",t(2666)),Vue.component("agent-navigation-bar",t(139)),Vue.use(o.a),new Vue({el:"#navigation-container",store:i.a})},2666:function(n,a,t){var e=t(0)(t(2669),t(2670),!1,function(n){t(2667)},null,null);n.exports=e.exports},2667:function(n,a,t){var e=t(2668);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);t(2)("73fe7d70",e,!0,{})},2668:function(n,a,t){(n.exports=t(1)(!1)).push([n.i,".admin-navigation{margin-top:200px!important}",""])},2669:function(n,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=t(3),i=t.n(e),o=t(6),r=t(140),s=t.n(r);a.default={name:"admin-navigation-bar",description:"Admin Navigation Bar on admin panel",props:{auth:{type:Object,default:function(){}},from:{type:String,default:""}},data:function(){return{navigationArray:[],loading:!0}},created:function(){window.eventHub.$on("update-sidebar",this.refreshSidebar)},beforeMount:function(){this.getDataFromServer()},methods:{refreshSidebar:function(){this.getDataFromServer()},getDataFromServer:function(){var n=this;i.a.get("/api/admin/navigation").then(function(a){n.loading=!1,n.navigationArray=a.data.data}).catch(function(a){n.loading=!1,Object(o.a)(a)})}},components:{navigation:t(141),"navigation-layout":s.a,loader:t(8)}}},2670:function(n,a){n.exports={render:function(){var n=this,a=n.$createElement,t=n._self._c||a;return t("navigation-layout",{attrs:{auth:n.auth,from:n.from}},[t("nav",{staticClass:"mt-2"},[n.loading?t("div",{staticClass:"admin-navigation"},[t("loader",{attrs:{size:40}})],1):n._e(),n._v(" "),t("ul",{staticClass:"nav nav-pills nav-sidebar flex-column nav-child-indent",attrs:{"data-widget":"treeview",role:"menu","data-accordion":"false"}},[n._l(n.navigationArray,function(a,e){return[t("li",{staticClass:"nav-header"},[n._v(n._s(a.name.toUpperCase()))]),n._v(" "),n._l(a.navigations,function(a,e){return[a.name?t("navigation",{key:a.name,attrs:{navigation:a,from:n.from}}):n._e()]})]})],2)])])},staticRenderFns:[]}}},[2664]);