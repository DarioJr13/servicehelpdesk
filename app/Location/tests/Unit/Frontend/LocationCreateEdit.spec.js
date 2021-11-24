
import { shallow, createLocalVue,  mount,shallowMount } from '@vue/test-utils'

import Vue from 'vue'

import LocationCreateEdit from '../../../views/js/components/LocationCreateEdit.vue';

import moxios from 'moxios';

import * as extraLogics from "helpers/extraLogics";

import * as validation from "../../../views/js/helpers/validator/locationValidation";

jest.mock('helpers/responseHandler')

describe('LocationCreateEdit',() => {

	let wrapper;

	const updateWrapper = () =>{

		extraLogics.getIdFromUrl = () =>{return 1}

			wrapper = mount(LocationCreateEdit,{

			stubs: ['text-field','custom-loader','alert','faveo-box','number-field','dynamic-select'],

			mocks:{	trans:(string)=>string },

			methods : { 
				
				redirect : jest.fn()
			}
		})  
	}
	
	beforeEach(() => {
		 
		updateWrapper();

		moxios.install();
	})

	afterEach(() => {
		
		moxios.uninstall()
	})

	it('makes an API call', (done) => {
		
		updateWrapper();
		
		wrapper.vm.getInitialValues(1);
		
		stubRequest();
		
		setTimeout(()=>{
		
			expect(moxios.requests.mostRecent().url).toBe('/api/location/1')

			done();
		
		},50)
	});

	it('makes `loading` false when `getInitialValues` method return error', (done) => {
		
		updateWrapper();

		wrapper.vm.getInitialValues(1);
		
		stubRequest(400);
		
		setTimeout(()=>{
			
			expect(wrapper.vm.loading).toEqual(false);
			
			done();
		
		},50)
	})

	it('updates `name` of the label when onChange method is called with suitable parameters',()=>{

		wrapper.vm.onChange('test', 'title');

		expect(wrapper.vm.title).toBe('test');
	})

	it('makes an AJAX call when onSubmit method is called',(done)=>{

		updateWrapper()

		wrapper.setData({ loading : false, hasDataPopulated : true})

		wrapper.vm.isValid = () =>{return true}

		wrapper.vm.onSubmit()

		expect(wrapper.vm.loading).toBe(true)

		mockSubmitRequest();

		setTimeout(()=>{

			expect(moxios.requests.mostRecent().url).toBe('/api/location')

			expect(wrapper.vm.loading).toBe(false)

			done();
		},1);
	});

	it('makes an loading as false when onSubmit method return error',(done)=>{

		updateWrapper()

		wrapper.setData({ loading : false, hasDataPopulated : true,location_id : 1})

		wrapper.vm.isValid = () =>{return true}

		wrapper.vm.onSubmit()

		mockSubmitRequest(400);

		setTimeout(()=>{

			expect(wrapper.vm.loading).toBe(false)

			done();
		},1);
	});

	it("updates `title value when page is in edit`",()=>{
		
		updateWrapper()

		wrapper.vm.getInitialValues = jest.fn();

		wrapper.vm.getValues('/10/edit');

		expect(wrapper.vm.$data.page_title).toEqual('edit_location');

		expect(wrapper.vm.getInitialValues).toHaveBeenCalled();
	});

	it('call `isValid` method when onSubmit method is called',(done)=>{

		updateWrapper()

		wrapper.setData({ loading : false, hasDataPopulated : true})

		wrapper.vm.isValid =jest.fn()   

		wrapper.vm.onSubmit()

		expect(wrapper.vm.isValid).toHaveBeenCalled()
	 
		done();
	});

	it('isValid - should return false ', done => {
				
		validation.validateLocationSettings = () =>{return {errors : [], isValid : false}}
			
		expect(wrapper.vm.isValid()).toBe(false)
			
		done()
	})

	it('isValid - should return true ', done => {
			 
		validation.validateLocationSettings = () =>{return {errors : [], isValid : true}}
			
		expect(wrapper.vm.isValid()).toBe(true)
			
		done()
	})

	function mockSubmitRequest(status = 200,url = '/api/location'){

		moxios.uninstall();

		moxios.install();

		moxios.stubRequest(url,{

			status: status,

			response: {'success':true,'message':'successfully saved'}
		})
	}

	function stubRequest(status = 200,url = '/api/location/1'){
		
		moxios.uninstall();
		
		moxios.install();
		
		moxios.stubRequest(url,{
			
			status: status,
			
			response : {
				data : {
					location : {
						id : 1,
						title : 'test'
					}
				}
			}
		})
	}
})