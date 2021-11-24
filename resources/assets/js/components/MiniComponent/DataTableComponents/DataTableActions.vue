<template>

	<div class="actions-row">

		<a v-if="data.edit_url && panel != 'agent'" class="btn btn-primary" :href="data.edit_url" v-tooltip="trans('edit')"
			:target="data.tableName ? '_blank' : '' ">

			<i class="fas fa-edit"></i>
		</a>

		<router-link v-if="data.edit_url && panel == 'agent'" class="btn btn-primary" :to="data.edit_url" v-tooltip="trans('edit')">

			<i class="fas fa-edit"></i>
		</router-link>

		<a v-if="data.settings_url && panel != 'agent'" class="btn btn-primary" :href="data.settings_url" target="_blank" 
			rel="noopener noreferrer" v-tooltip="trans('settings')">

			<i class="fas fa-cogs"></i>
		</a>

		<router-link v-if="data.settings_url && panel == 'agent'" class="btn btn-primary" :to="data.settings_url"
			rel="noopener noreferrer" v-tooltip="trans('settings')">

			<i class="fas fa-cogs"></i>
		</router-link>

		<a v-if="data.edit_modal" class="btn btn-primary" @click="showEditModalMethod" href="javascript:;" 
			v-tooltip="disabled ? trans('default_field_is_not_editable') : trans('edit')" :disabled="disabled">

			<i class="fas fa-edit"></i>
		</a>

		<a v-if="data.download_url" class="btn btn-primary" :href="data.download_url" v-tooltip="trans('download')">

			<i class="fas fa-download"></i>
		</a>

		<a v-if="data.filter_toggle_url" class="btn btn-primary" href="javascript:;" v-tooltip="trans('edit')" @click="onToggle">

			<i class="fas fa-edit"></i>
		</a>

		<a v-if="data.view_url && panel != 'agent'" class="btn btn-primary" :href="data.view_url"
			:target="data.tableName ? '_blank' : '' " v-tooltip="trans('view')">
	
			<i class="fas fa-eye"></i>
		</a>

		<router-link v-if="data.view_url && panel == 'agent'" class="btn btn-primary cc" :to="data.view_url" v-tooltip="trans('view')">
	
			<i class="fas fa-eye"></i>
		</router-link>

		<!-- Enable/Disale -->
		<span v-if="data.status_toggle_url">
			<button v-if="!data.active_status" class="btn btn-primary" @click="showActivateModalMethod" v-tooltip="trans('activate')">
				<i class="fas fa-check-circle"></i>
			</button>
			<button v-else class="btn btn-danger" :disabled="disabled" @click="showActivateModalMethod" v-tooltip="disabled ? trans('default_field_is_not_deactivatable') : trans('deactivate')">
				<i class="fas fa-times-circle"></i>
			</button>
		</span>
		<!-- <span v-tooltip="disabled ? trans('default_field_is_not_deletable') : trans('delete')">

			<button v-if="data.status_toggle_url" class="btn btn-danger" @click="showModalMethod"
				:disabled="disabled">
				<div v-if=data.active_status>
					
				</div>
				<div v-else>
					
				</div>
			</button>
		</span> -->
		<!-- Enable/Disale -->

		<a v-if="data.client_view_url" class="btn btn-primary" :href="data.client_view_url"
			:target="data.tableName ? '_blank' : '' " v-tooltip="trans('view')">
	
			<i class="fas fa-eye"></i>
		</a>

		<span v-tooltip="disabled ? trans('default_field_is_not_deletable') : trans('delete')">

			<button v-if="data.delete_url" class="btn btn-danger" @click="showModalMethod"
				:disabled="disabled">

				 <i class="fas fa-trash"></i>
			</button>
		</span>

		<transition name="modal">

		 	<delete-modal v-if="showModal" :onClose="onClose" :showModal="showModal" :deleteUrl="data.delete_url" :replace="data.replace" :title="data.title" 
		 		:dependency="data.dependency" :alertComponentName="alert" :isLinked="boolean(data.is_linked)" :dependencyId="data.id">
		 		
		 	</delete-modal>
		</transition>

		<transition name="modal">

		 	<data-table-modal v-if="showEditModal" title="edit" :onClose="onClose" :showModal="showEditModal"
		 		:data="data" :apiUrl="data.edit_modal">
		 	</data-table-modal>
		</transition>

		<transition name="modal">

		 	<data-table-activate-modal v-if="showActiveModal" title="toggle_status" :onClose="onClose" :showModal="showActiveModal"
		 		:data="data" :apiUrl="data.status_toggle_url">
		 	</data-table-activate-modal>
		</transition> 
	</div>

</template>

<script type="text/javascript">
	import axios from 'axios';
	import {boolean} from 'helpers/extraLogics'
	export default {
		name:"data-table-actions",
		description: "Contains edit, delete and view buttons as group which can be used as a component as whole. It is built basically for displaying edit, delete and view button in a datable.",
		props: {
			data : { type : Object, required : true },
		},
		data(){
			return{
				showModal : false,
				showEditModal : false,
				showActiveModal : false,
				location: this.data.delete_url,
				alert : '',
				panel : ''
			}
		},

		computed : {

			disabled() {

				return boolean(this.data.is_default)
			}
		},

		created() {
			
			this.updateAlert()
		},

		methods:{

			onToggle() {

				window.eventHub.$emit('filterToggleClicked',this.data)
			},

			updateAlert() {

				this.alert = this.data.alertComponentName ? this.data.alertComponentName : 'dataTableModal'; 

				this.panel = this.data.from ? this.data.from : 'admin'; 
			},

			showModalMethod(){
				if(this.data.is_default){
					this.showModal = false
				} else {
					this.showModal = true
				}
			},
			showEditModalMethod(){
				if(this.data.is_default){
					this.showEditModal = false
				} else {
					this.showEditModal = true
				}
			},

			showActivateModalMethod()
			{
				if(this.data.is_default && this.data.active_status){
					this.showActiveModal = false
				} else {
					this.showActiveModal = true
				}
			},

			onClose(){
		    this.showModal = false;
		    this.showEditModal = false;
		    this.showActiveModal = false;
		    this.$store.dispatch('unsetValidationError');
		  },
		},
		components:{
			'delete-modal': require('components/MiniComponent/DataTableComponents/DeleteModal'),
			'data-table-modal': require('components/MiniComponent/DataTableComponents/DataTableModal'),
			'data-table-activate-modal': require('components/MiniComponent/DataTableComponents/DataTableActivateModal')
		}
	};
</script>

<style scoped>
	
	.actions-row a { padding-right: 10px;
    padding-left: 10px; }
</style>

