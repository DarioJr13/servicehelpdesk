<template>
  <div>
    <!--loader-->
    <div class="row" v-if="hasDataPopulated === false || loading === true">
      <custom-loader></custom-loader>
    </div>

    <alert/>

    <faveo-box :title="lang('third_party_app')" v-if="hasDataPopulated">

      <status-switch slot="headerMenu" name="status" :value="status" :onChange="onChange"
                     classname="pull-right" :bold="true">
      </status-switch>

      <div class="row">

        <!-- Name -->
        <text-field :label="trans('name')" :onChange="onChange" :required="true" :value="name"
                    classname="col-lg-4" name="name"></text-field>

        <!-- App Id -->
        <text-field :label="trans('app_id')" :onChange="onChange" :required="true" :value="app_id"
                    classname="col-lg-4" name="app_id"></text-field>

        <!-- App Secret -->
        <text-field :label="trans('app_secret')" :onChange="onChange" :required="true" :value="app_secret"
                    classname="col-lg-4"
                    name="app_secret"></text-field>
      </div>

      <div class="row">

        <!-- Authentication Endpoint-->
        <text-field :label="trans('authentication_endpoint')" :onChange="onChange"
                    :required="true" :hint="lang('authentication_tooltip')"
                    :value="authentication_endpoint" classname="col-lg-4" name="authentication_endpoint"></text-field>

        <!-- Token Endpoint-->
        <text-field :label="trans('token_endpoint')" :onChange="onChange" :required="true" :value="token_endpoint" 
        :hint="trans('token_tooltip')" classname="col-lg-4" name="token_endpoint"></text-field>

        <!-- Token Endpoint-->
        <text-field :label="trans('identity_endpoint')" :onChange="onChange" :required="true" :value="identity_endpoint" 
        :hint="trans('identity_tooltip')" classname="col-lg-4" name="identity_endpoint"></text-field>
      </div>

      <div class="row">

        <!-- Scopes Endpoint-->
        <text-field :label="trans('scopes')" :onChange="onChange" :required="true"
          :hint="lang('scope_tooltip')" :value="scopes" classname="col-lg-4" name="scopes"></text-field>

        <div class="col-sm-4">
                    <label>Redirect URL</label>
                     <div class="input-group">
                  <input type="text" class="form-control" v-model="app_url" name="app_url" disabled>
                  <div class="input-group-append" v-tooltip="copied ? lang('clipboard-copy-message') : lang('click-url-copy')" @click.prevent="copyToClipboard">
                    <span class="input-group-text">
                      <i :class="copied ? 'glyphicon glyphicon-ok text-green' : 'fa fa-clipboard'"></i></span>
                  </div>
                </div>  
                  </div>
        

      </div>

      <table id="faveo-attribute-list" class="faveo-table table">
        <thead class="thead-default">
        <tr>
          <th>
            {{trans('faveo_attributes')}}&nbsp;
            <tool-tip :message="lang('faveo_attributes-tooltip')" size="small"></tool-tip>
          </th>
          <th>
            {{trans('third_party_attributes')}}&nbsp;
            <tool-tip :message="lang('third_party_attributes-tooltip')" size="small"></tool-tip>
          </th>

        </tr>
        </thead>

        <tbody v-for="(element, index) in user_map" class="faveo-attribute-elements">
        <tr>
          <td class="padding-top-12">
            <span :id="'faveo-attribute-label-'+index">{{trans(element.faveo_attribute_label)}}</span>
            <span v-if="element.required" class="text-red">* </span>
          <tool-tip :message="lang('third-party-'+element.faveo_attribute_label)" size="small"></tool-tip>

          </td>

          <td>
            <input type="text" class="form-control col col-lg-4" v-model="element.third_party_attribute"/>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="card-footer" slot="actions">
        <button :disabled="loading" class="btn btn-primary" type="button" v-on:click="onSubmit">
          <span class="fa fa-save"></span>&nbsp;{{trans('save')}}
        </button>
      </div>

    </faveo-box>
  </div>
</template>


<script type="text/javascript">
import axios from "axios";
import {errorHandler, successHandler} from "helpers/responseHandler";
import {getIdFromUrl} from 'helpers/extraLogics';
import FaveoBox from 'components/MiniComponent/FaveoBox';
import copy from 'clipboard-copy';

export default {
  name: "third-party-app",

  beforeMount() {
    this.setMode();
    this.getInitialValues();
  },

  data: () => ({
    id: null,
    name: '',
    app_id: '',
    app_secret: '',
    authentication_endpoint: '',
    token_endpoint: '',
    identity_endpoint: '',
    scopes: '',
    login_label: '',
    status: 1,
    loading: true,
    hasDataPopulated: false,
    mode: "create",
    user_map: [],
    app_url: '',
    app_url_bkp :'',
    copied : false
  }),

  methods: {

    copyToClipboard() {
        copy(this.app_url);
        this.copied = true;
        this.showCopyIconAfterCopying()
    },

    showCopyIconAfterCopying() {
        //for showing copy icon after 5 seconds.
        setTimeout(() => {
            this.copied = false;
        }, 5000)
    },

    setMode() {
      const path = window.location.pathname;
      this.mode = path.indexOf("edit") >= 0 ? "edit" : "create";
    },

    /**
     * gets initial state of states defined in this component
     * @return {void}
     */
    getInitialValues() {
      this.loading = true;

      if (this.mode === "edit") {

        //match from the end
        const path = window.location.pathname;
        const id = getIdFromUrl(path);

        axios
            .get(`/api/admin/third-party-apps/${id}`)
            .then(res => {
              this.updateStatesWithData(res.data.data.formattedElement);
              this.app_url_bkp = res.data.data.url + '/';
              this.hasDataPopulated = true;
              this.loading = false;
            })
            .catch(err => {
              errorHandler(err)
              this.hasDataPopulated = true;
              this.loading = false;
            });

      } else {

        axios.get('/api/admin/faveo-attributes').then(res => {
          this.user_map = res.data.data.formattedElement;
          this.app_url = res.data.data.url;
          this.app_url_bkp = res.data.data.url + '/';
          // for creating a new email
          this.hasDataPopulated = true;
          this.loading = false;
        });
      }
    },

    /**
     * updates state data for this component
     * @param {Object} data    settings data object (from backend)
     * */
    updateStatesWithData(data) {
      this.id = data.id;
      this.name = data.name;
      this.app_id = data.app_id;
      this.app_secret = '';
      this.authentication_endpoint = data.authentication_endpoint;
      this.token_endpoint = data.token_endpoint;
      this.identity_endpoint = data.identity_endpoint;
      this.login_label = data.login_label;
      this.scopes = data.scopes;
      this.status = data.status;
      this.user_map = data.user_map;
      this.app_url = data.app_url;
    },

    /**
     * sends an ajax request to server after validating it
     * */
    onSubmit() {
      this.loading = true;
      axios
          .post("/api/admin/third-party-apps", {
            id: this.id,
            name: this.name,
            app_id: this.app_id,
            app_url: this.app_url,
            app_secret: this.app_secret,
            authentication_endpoint: this.authentication_endpoint,
            token_endpoint: this.token_endpoint,
            identity_endpoint: this.identity_endpoint,
            login_label: this.login_label,
            scopes: this.scopes,
            status: this.status,
            user_map: this.user_map,
          })
          .then(res => {
            this.loading = false;
            successHandler(res);
            this.redirectIfNeeded();
            this.$store.dispatch('unsetValidationError');
          })
          .catch(err => {
            this.loading = false;
            errorHandler(err);
          });
    },

    /**
     * redirects to index page, if needed
     */
    redirectIfNeeded() {
      if (this.mode === "create") {
        setTimeout(() => {
          this.redirect("/admin/third-party-apps")
        }, 2000)
      } else {
        this.getInitialValues();
      }
    },

    /**
     * populates the states corresponding to 'name' with 'value'
     * @param  {string} value
     * @param  {[type]} name
     * @return {void}
     */
    onChange(value, name) {
      this[name] = value;
      if(name == 'name') {
        this.app_url = this.app_url_bkp + value
      }
    }
  },

  components: {
    "text-field": require("components/MiniComponent/FormField/TextField"),
    alert: require("components/MiniComponent/Alert"),
    'faveo-box': FaveoBox,
    "status-switch": require("components/MiniComponent/FormField/Switch"),
    "tool-tip": require('components/MiniComponent/ToolTip'),
  }
};
</script>
<style type="text/css">
input .form-control {
  border-radius: 30px !important;
}

.with-switch {
  padding-bottom: 0px !important;
  margin-bottom: -3px;
}

.with-switch > h3 {
  margin-top: 2px !important;
}

.pointer-none {
  pointer-events: none;
}
</style>
