<template>
  <div>
    <alert componentName="dataTableModal"></alert>
    <div class="card card-light">
      <div class="card-header">
        <h3 id="breakline-index" class="card-title">
          {{ trans("List of Breaklines") }}
        </h3>
        <div class="card-tools">
          <a
            class="btn btn-tool"
            :href="basePath() + '/breaklines/create'"
            v-tooltip="trans('Create Breakline')"
          >
            <i class="glyphicon glyphicon-plus"></i>
          </a>
          <a v-if="showTable && total_records > 1" class="btn btn-tool" href="javascript:;" @click="reorderMethod"
							v-tooltip="lang('reorder')">
							<span class="fas fa-bars"> </span></a>
        </div>
      </div>

      <div class="card-body" id="breakline_index">
        <data-table v-if="apiUrl !== '' && showTable"
          :url="apiUrl"
          :dataColumns="columns"
          :option="options"
          scroll_to="breakline-index"
        ></data-table>

        	<breakline-reorder v-if="!showTable" :onClose="onClose" :url="apiUrl+'?type=breakline&meta=true&sort=display_order&sort_order=asc'" reorder_type="breakline">

				</breakline-reorder>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from "axios";
import Vue from "vue";
Vue.component(
  "table-actions",
  require("components/MiniComponent/DataTableComponents/DataTableActions.vue")
);

export default {
  name: "breakline-index",
  description: "Breakline table component",
  data() {
    return {
      columns: ["breakline", "order", "is_active", "actions"],
      options: {},
      apiUrl: "/api/breakline-list",
      	total_records : 0,
			showTable: true,
    };
  },

  beforeMount() {
    const self = this;

    this.options = {
      sortIcon: {
        base: "glyphicon",
        down: "glyphicon-chevron-up",
        up: "glyphicon-chevron-down",
      },
      columnsClasses: {
        breakline: "name-breakline",
        display_order: "displayOrder-breakline",
        is_active: "isActive-breakline",
        actions: "breakline-action",
      },
      headings: {
        breakline: "Breakline",
        display_order: "Display Order",
        is_active: "Status",
        actions: "Action",
      },

      texts: { filter: "", limit: "" },

      templates: {
        is_active: function (createElement, row) {
          let span = createElement('span', {
             attrs: {
               'class' : row.is_active ? 'btn btn-success btn-xs' : 'btn btn-danger btn-xs'
             }
          }, row.is_active ? 'Active' : 'Inactive');
          return createElement('a',{

          },[span]);
        },
        breakline: function (createElement, row) {
          let style = createElement("span", {
            attrs: {
              style: "min-width : 100%;width: min-content;overflow: hidden; display: inline-block; white-space: word-wrap;",
            }
          }, [row.breakline]);
          return style;
        },

        actions: "table-actions",
      },
      filterable: ["breakline"],
      sortable: ["breakline", "display_order", "is_active"],
      pagination: { chunk: 5, nav: "fixed", edge: true },

      requestAdapter(data) {
        return {
          "sort-field": data.orderBy,

          "sort-order": data.ascending ? "asc" : "desc",

          "search-query": data.query.trim(),
          page: data.page,
          limit: data.limit,
        };
      },

      responseAdapter({ data }) {
           self.total_records = data.message.total;

        return {
          data: data.message.breakline.map((data) => {
            data.edit_url =
              self.basePath() + "/breaklines/" + data.id + "/edit";
            data.delete_url = self.basePath() + "/api/delete-breakline/" + data.id;
            return data;
          }),
          count: data.message.total,
        };
      },

    };
  },

  methods : {
    		reorderMethod() {
	      this.showTable = false;
	      this.title = "reorder";
	    },
          onClose() {
	      this.showTable = true;
	      this.title = "list_of_breaklines";
	    }
  },
  components: {
    "data-table": require("components/Extra/DataTable"),
    "breakline-reorder": require("components/Admin/Emails/Breaklines/Reorder.vue"),
    alert: require("components/MiniComponent/Alert"),
  },
};
</script>

<style  type="text/css">
.breakline-action,
.displayOrder-breakline,
.isActive-breakline {
  max-width: 250px;
  word-break: break-all;
}
#breakline_index .VueTables .table-responsive {
  overflow-x: auto;
}

#breakline_index .VueTables .table-responsive > table {
  width: max-content;
  min-width: 100%;
  max-width: max-content;
  overflow: auto !important;
}
</style>
