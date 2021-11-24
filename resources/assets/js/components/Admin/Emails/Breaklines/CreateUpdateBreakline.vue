<template>
  <div>
    <div class="row" v-if="hasDataPopulated === false || loading === true">
      <custom-loader :duration="loadingSpeed"></custom-loader>
    </div>
    <alert></alert>
    <faveo-box :title="trans(title)">
      <div class="row">
        <text-field
          label="Break line"
          :value="breakline"
          type="text"
          name="breakline"
          :onChange="onChange"
          classname="col-sm-6"
          :required="true"
          :hint="trans('breakline_note')"
        ></text-field>
       
       
      </div>
      <div class="row">
        <!-- <radio-button
          id="expression"
          name="expression"
          classname="col-sm-6"
          :options="expressionRadioOptions"
          label="Regular Expression"
          :value="expression"
          :onChange="onChange"
        ></radio-button> -->

        <div class="form-group col-sm-2">
          <label for="is_active ">Status</label>
          <status-switch
            name="is_active"
            :value="is_active"
            :onChange="onChange"
            classnane="float-left"
            :bold="true"
          >
          </status-switch>
        </div>
      </div>
      <div slot="actions" class="card-footer">
        <button
          type="button"
          v-on:click="onSubmit"
          :disabled="loading"
          class="btn btn-primary update-btn"
        >
          <span :class="iconClass"></span> &nbsp;{{ btnName }}
        </button>
      </div>
    </faveo-box>
  </div>
</template>
<script>
import axios from "axios";
import FaveoBox from "components/MiniComponent/FaveoBox";
import {
  errorHandler,
  successHandler,
} from "../../../../helpers/responseHandler";
import { validateBreaklines } from "helpers/validator/breaklinesRules";
import { getIdFromUrl } from "helpers/extraLogics";
export default {
  name: "create-upate-breakline",

  description: "breakline page",

  beforeMount() {
    this.setMode();
    this.getInitialValues();
  },
  data: function () {
    return {
      id: null,
      breakline: "",
      hasDataPopulated: false,
      loadingSpeed: 4000,
      loading: true,
      iconClass: "fas fa-save",
      expressionRadioOptions: [
        { name: "Yes", value: "yes" },
        { name: "No", value: "no" },
      ],
      expression: "yes",
      is_active: null,
      title: "Create Breakline",
      mode: "create",
      btnName: "Save",
    };
  },
  methods: {
    onChange(value, name) {
      this[name] = value;
    },
    isValid() {
      const { errors, isValid } = validateBreaklines(this.$data);
      if (!isValid) {
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.isValid()) {
        this.loadingSpeed = 8000;
        this.loading = true;

        let data = {};
        data['id'] = this.id,
        data["breakline"] = this.breakline;
        data["is_active"] = this.is_active ? 1 : 0;

        axios.post("/api/create-update-breakline", data).then((res) => {
              this.loading = false;

              successHandler(res);

              if(!this.id){

                this.redirect('/get-breaklines')

              }
          }).catch((err) => {

              this.loading = false;

              errorHandler(err);
          });
      }
    },
    setMode() {
      const path = window.location.pathname;
      this.mode = path.indexOf("edit") >= 0 ? "edit" : "create";
    },
    redirectIfNeeded() {
      if (this.mode === "create") {
        setTimeout(() => {
          this.redirect("/get-breaklines");
        }, 2000);
      }
    },
    getInitialValues() {
      this.loading = true;
      if (this.mode === "edit") {
        this.iconClass = "fas fa-sync";
        this.btnName = "Update";
        this.title = "Edit Break Line";
        const path = window.location.pathname;
        const breaklineId = getIdFromUrl(path);

        axios
          .get(`/api/edit-breakline/${breaklineId}`)
          .then((res) => {
            this.updateStatesWithData(res.data.message);
            this.hasDataPopulated = true;
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            errorHandler(err);
          });
      } else {
        this.hasDataPopulated = true;
        this.loading = false;
      }
    },

    updateStatesWithData(breaklineData) {
      const self = this;
      const stateData = this.$data;
      Object.keys(breaklineData).map((key) => {
        if (stateData.hasOwnProperty(key)) {
          self[key] = breaklineData[key];
        }
      });
      self["api_key"] = breaklineData["key"];
    },
  },
  components: {
    "text-field": require("components/MiniComponent/FormField/TextField"),
    "faveo-box": FaveoBox,
    "custom-loader": require("components/MiniComponent/Loader"),
    "radio-button": require("components/MiniComponent/FormField/RadioButton"),
    "status-switch": require("components/MiniComponent/FormField/Switch"),
    "tool-tip": require("components/MiniComponent/ToolTip"),
  },
};
</script>
