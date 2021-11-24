<template>

    <div>

        <alert componentName="template-set-list-index"/>

        <div class="card card-light ">

            <div class="card-header">

                <h3 id="template-set-index" class="card-title">{{trans('list_of_templates_sets')}}</h3>

                <div class="card-tools">

                    <a class="btn btn-tool" v-tooltip="trans('create_set')" @click="toggleModal">

                        <i class="glyphicon glyphicon-plus"> </i> 
                    </a>
                </div>
            </div>

            <div class="card-body" id="template-set-list">
                <data-table :url="apiUrl" :dataColumns="columns" :option="options" scroll_to ="template-set-index"/>
            </div>
        </div>
        <transition name="modal">
            <template-set-create-modal v-if="showModal" :showModal="showModal" :onClose="onClose" :languages="languages" :apiUrl="apiUrl"></template-set-create-modal>
        </transition>
    </div>
</template>

<script type="text/javascript">
    import Vue from 'vue';
    import axios from 'axios'
    import { mapGetters } from 'vuex';

    Vue.component('table-actions', require('components/MiniComponent/DataTableComponents/DataTableActions.vue'));

    export default {
        name : 'template-set-list-index',
        data() {
            return {
                apiUrl : '/api/template-sets',
                plugin : null,
                channel: null,
                columns: [ 'name', 'active', 'template_language', 'department', 'actions'],
                showModal : false,
                languages: [],
                options: {},
            }   
        },

        computed : {

            ...mapGetters(['formattedTime'])
        },

        beforeMount() {

            const self = this;
            let locationURL = new URL(location.href);
            this.plugin = locationURL.searchParams.get('plugin');
            this.channel = locationURL.pathname.substring(locationURL.pathname.lastIndexOf('/')+1);
            this.apiUrl = this.apiUrl+'?channel='+this.channel;
            this.getLanguagesMenu();
            this.options = {

                sortIcon: {

                    base : 'glyphicon',

                    down: 'glyphicon-chevron-up',

                    up: 'glyphicon-chevron-down'
                },

                columnsClasses : {
                    name : 'template-list-name',
                    active : 'template-list-active',
                    template_language : 'template-list-language',
                    department : 'template-list-department',
                    actions : 'template-list-actions'
                },

                texts: { filter: '', limit: ''},

                templates: {
                    active : function(createElement, row) {

                        let span = createElement('span', {
                          attrs:{
                            'class' : row.active ? 'btn btn-success btn-xs' : 'btn btn-danger btn-xs'
                          }
                        }, row.active ? 'Active' : 'Inactive');

                        return createElement('a', {

                        }, [span]);
                    },

                    department(h,row) {

                        return row.department ? row.department.name : '--' 
                    },
                    actions : 'table-actions'
                },

                sortable:  [ 'name', 'active', 'template_language'],

                filterable:  ['name', 'template_language'],

                pagination: { chunk:5,nav: 'fixed', edge:true },

                requestAdapter(data) {
                    return {

                        'sort-field' : data.orderBy ? data.orderBy : 'id',

                        'sort-order' : data.ascending ? 'desc' : 'asc',

                        'search-query' : data.query.trim(),

                        page : data.page,

                        limit : data.limit,
                    }
                },

                responseAdapter({data}) {

                    return {

                        data: data.data.data.map(data => {

                            data.status_toggle_url = self.basePath() + '/api/template-sets/change-status/' + data.id;
                            data.view_url = self.basePath() + '/templates/' + data.id +((self.plugin)?'?plugin='+self.plugin:'');
                            data.delete_url = self.basePath() + '/api/delete-template-sets/' + data.id;
                            data.active_status = data.active;
                            return data;
                        }),

                        count: data.data.total
                    }
                },
            }
        },

        methods: {
            toggleModal() {
                this.showModal = !(this.showModal);
            },

            onClose() {
                this.showModal = false;
            },

            getLanguagesMenu()
            {
                axios.get('api/dependency/languages?meta=true').then(res => {
                    this.languages = res.data.data.languages.map(function(value, index){
                        return {"name":value.name+' ('+value.translation+')', "value": value.locale};
                    });
                }).catch(err => {
                });
            },
        },

        components : {
            "data-table" : require('components/Extra/DataTable'),
            "alert": require("components/MiniComponent/Alert"),
            "template-set-create-modal" : require("./TemplateSetCreateModal")
        }
    };
</script>
