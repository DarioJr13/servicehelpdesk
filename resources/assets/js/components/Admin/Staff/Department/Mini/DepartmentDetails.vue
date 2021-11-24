<template>
	
	<div class="card card-light card-outline">

		<div class="card-body box-profile">
			
			<div class="text-center">
				
				<faveo-image-element id="deptimg" :source-url="basePath()+'/themes/default/admin/images/department.jpg'" 
					:classes="['profile-user-img img-fluid img-circle']" alternative-text="Department Image"/>
			</div>

			<h3 class="profile-username text-center" v-tooltip="deptData.name">{{subString(deptData.name)}}</h3>

			<p class="text-muted text-center">{{trans('department')}}</p>

			<ul class="list-group list-group-unbordered mb-3">
				
				<li class="list-group-item">
					
					<b>{{trans('department_size')}}</b> <a class="float-right badge badge-info text-white">{{deptData.size}}</a>
				</li>
				
				<li class="list-group-item">
					
					<b>{{trans('business_hour')}}</b> 

					<a class="float-right" v-tooltip="deptData.business_hour ? deptData.business_hour.name : ''">
						{{deptData.business_hour ? subString(deptData.business_hour.name) : '--'}}
					</a>
				</li>
			</ul>

			<a :href="basePath() + '/department/'+deptData.id+'/edit'" class="btn btn-primary btn-block">

				<b> <i class="fas fa-edit"> </i>	{{trans('edit')}} </b>
			</a>
		</div>
	</div>
</template>

<script>

	import { getSubStringValue } from 'helpers/extraLogics';

	export default {

		name : 'dept-details',

		description : 'Department details  page',

		props : { 

			deptData : { type : Object , default : () => {} }
		},

		methods :{
		
			subString(name){

				return getSubStringValue(name,20)
			}
		},

		components : {

			'faveo-image-element': require('components/Common/FaveoImageElement')
		}
	};
</script>