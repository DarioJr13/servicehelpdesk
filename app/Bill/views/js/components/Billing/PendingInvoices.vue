<template>
	
	<router-link v-if="pending" id="pending-invoices" class="nav-link font-1" to="/billing/invoices?status=0">
          
    	<i class="far fa-file-pdf"></i>

    	<span class="badge badge-danger navbar-badge">{{pending}}</span>
  	</router-link>
</template>

<script>
	
	export default {

		name : 'pending-invoices',

		data() {

			return { pending : '' }
		},

		beforeMount() {

			this.getCount()
		},

		methods : {

			getCount() {

				axios.get('/bill/package/get-user-invoice?meta=true&all-users=1&status=0').then(res=> {

          		this.pending = res.data.data.total;

        		}).catch(err=>{

          		this.pending = 0;
        		})
			}
		}
	};
</script>
<style scoped>
	
	.navbar-badge { padding : 1px 4px !important; }
</style>