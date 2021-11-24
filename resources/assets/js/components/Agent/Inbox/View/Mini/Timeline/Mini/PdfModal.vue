<template>
	
	<modal v-if="showModal" :showModal="showModal" :onClose="onClose" :containerStyle="containerStyle">
	
		<div slot="title">
		
			<h4 class="modal-title">{{trans('generate_pdf')}}</h4>
		</div>
		
		<div v-if="!loading" slot="fields" class="row">

			<radio-button :options="radioOptions" :label="trans('select_an_action')" name="pdf" :value="pdf"
				:onChange="onChange" classname="form-group col-sm-12" optionClass="col-sm-4"></radio-button>

		</div> 
		
		<div v-if="loading" class="row" slot="fields" >
			
			<loader :animation-duration="4000" color="#1d78ff" :size="size" />
		</div>
					
		<button slot="controls" type="button" @click="generatePdf" class="btn btn-primary" id="submit_btn">

			<i class="fas fa-check"></i> {{trans('generate_pdf')}}
		</button>

	</modal>
</template>

<script type="text/javascript">
	
	export default {
		
		name : 'generate-pdf-modal',

		props:{
			
			showModal:{type:Boolean,default:false},

			ticket : { type : Object, default : ()=>{} },

			onClose:{type: Function, default : ()=>{} }
		},

		data:()=>({
			
			containerStyle:{ width:'860px' },

			loading:false,

			pdf : 'default',

			radioOptions:[{name:'ticket_conversations',value:'default'},{name:'ticket_conversation_with_notes',value:'threads'},{name:'ticket_conversation_with_details',value:'details'}],
		}),


		methods:{

		onChange(value, name){
			
			this[name]= value;
		},

		generatePdf(){

			let link = this.pdf == 'details' ? '?allTicketDetails=true&internalNote=false' : this.pdf == 'threads' ? '?allTicketDetails=false&internalNote=true'  : '';
    	
    		this.redirect('/ticket/print/'+this.ticket.id+link)
    	}
	},

	components:{
		
		'modal':require('components/Common/Modal.vue'),
		
		'alert' : require('components/MiniComponent/Alert'),
		
		'loader':require('components/Client/Pages/ReusableComponents/Loader'),

		'radio-button':require('components/MiniComponent/FormField/RadioButton'),
	}
};
</script>