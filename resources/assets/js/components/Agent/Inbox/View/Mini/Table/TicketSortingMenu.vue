<template>
	
	<div class="btn-group" id="ticket-sort">
		
		<button type="button" class="btn btn-md btn-default dropdown-toggle sortval bg-white" data-toggle="dropdown">
			<i class="fas fa-sort"></i>&nbsp;
		</button>
		
		<div class="dropdown-menu dropdown-menu-left" style="">
				
			<template v-for="(sorting,index) in sortingMenu">
				
				<a class="dropdown-item" @click="sort(sorting,index)" href="javascript:;">
					
					<i :class="sorting.class"> </i> {{sorting.name}} in {{sorting.order_name}}
				</a>
			</template>

			<template v-for="sorting in extraMenu">
				
				<a class="dropdown-item" @click="filter(sorting)" href="javascript:;">
					
					<i :class="sorting.class"> </i> {{sorting.name}}
				</a>
			</template>
		</div>
	</div>
</template>

<script>
	
	export default {
	
	props : {

		tableHeader : { type : String, default : ''},
	},

	data() {
		
		return {

			buttonStyle : { 'background-color':this.tableHeader + ' !important','color':'#fff', 'margin-top' : '2px' },

			extraMenu : [
				{
					name: "Answered",
					value: 1,
					class: "fas fa-check"
				},
				{
					name: " Unanswered",
					value: 0,
					class: "fas fa-times",
				},
				{
					name: "All",
					value: '',
					class: "fas fa-list-ul",
				}
			],

			sortingMenu: [
				{
					name: "Ticket Number",
					value: "ticket_number",
					order: "asc",
					class: "fas fa-sort-amount-down",
					order_name: "Ascending"
				},
				{
					name: "Updated Date",
					value: "updated_at",
					order: "asc",
					class: "fas fa-sort-amount-down",
					order_name: "Ascending"
				},
				{
					name: "Created Date",
					value: "created_at",
					order: "asc",
					class: "fas fa-sort-amount-down",
					order_name: "Ascending"
				}
			],
		};
	},

	methods: {

		filter(value) {

			this.$emit("filter", value);

			$(".sortval").html(
				value.name + " tickets"  + '&nbsp<span class="caret"></span>'
			);
		},

		sort(x, y) {
		
			if (x.order == "asc") {
		
				this.$emit("sort", x);
		
				$(".sortval").html(
					x.name + " in " + x.order_name + '&nbsp<span class="caret"></span>'
				);
		
				this.sortingMenu[y].order = "desc";
		
				this.sortingMenu[y].class = "fas fa-sort-amount-up";
		
				this.sortingMenu[y].order_name = "Descending";
			} else {
		
				this.$emit("sort", x);
		
				$(".sortval").html(
		
					x.name + " in " + x.order_name + '&nbsp<span class="caret"></span>'
				);
		
				this.sortingMenu[y].order = "asc";
		
				this.sortingMenu[y].class = "fas fa-sort-amount-down";
		
				this.sortingMenu[y].order_name = "Ascending";
			}
		}
	}
};
</script>