import { createLocalVue,  mount } from '@vue/test-utils'

import Vue from 'vue'

import BillOptions from 'components/Billing/BillOptions'

import moxios from 'moxios';

import * as validation from "helpers/validator/billOptionsRules";

jest.mock('helpers/responseHandler')

describe('BillOptions',() => {

	let wrapper;

	const updateWrapper = () =>{
		
			wrapper = mount(BillOptions,{
			
			stubs: ['status-switch','faveo-box','number-field','custom-loader','alert', 'loader'],
			
			mocks:{

				trans:(string)=>string
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

		wrapper.vm.getInitialValues();
			
			mockGetRequest();

			setTimeout(()=>{

				expect(wrapper.vm.loading).toBe(false)

				expect(wrapper.vm.hasDataPopulated).toBe(true)
			
				expect(moxios.requests.mostRecent().url).toBe('/bill/api/get-billing-options')
			
				done();
			},50)
		})


	it('updates `loading` value as false if api returns error response',(done)=>{

		updateWrapper()

		wrapper.vm.getInitialValues()

		expect(wrapper.vm.loading).toBe(true)

		mockGetRequest(400);

		setTimeout(()=>{

				expect(wrapper.vm.loading).toBe(false)

				done();
		},1);
	});

	it('updates `invoice_due` value when onChange method is called',()=>{
		
		wrapper.vm.onChange(15, 'invoice_due');
			
		expect(wrapper.vm.invoice_due).toBe(15);
	})

	it('isValid - should return false ', done => {
				
		validation.billOptionsValidation = () =>{return {errors : [], isValid : false}}
			
		expect(wrapper.vm.isValid()).toBe(false)
			
		done()
	})

	it('isValid - should return true ', done => {
			 
		validation.billOptionsValidation = () =>{return {errors : [], isValid : true}}
			
		expect(wrapper.vm.isValid()).toBe(true)
			
		done()
	})

  it('makes an AJAX call when onSubmit method is called',(done)=>{

		updateWrapper();

		wrapper.vm.getInitialValues = jest.fn();

		wrapper.setData({ loading : false, hasDataPopulated : true, invoice_due : 1 })

		wrapper.vm.isValid = () =>{return true}

		wrapper.vm.onSubmit()

		expect(wrapper.vm.pageLoad).toBe(true)

		mockSubmitRequest();

		setTimeout(()=>{
				
				expect(moxios.requests.mostRecent().url).toBe('/bill/api/update-billing-options')

				expect(wrapper.vm.pageLoad).toBe(false);

				expect(wrapper.vm.getInitialValues).toHaveBeenCalled();

				done();
		},1);
	});

	it('updates `loading` value as false if api returns error response',(done)=>{

		updateWrapper()

		wrapper.setData({ loading : false, hasDataPopulated : true, invoice_due : 1 })
		
		wrapper.vm.isValid = () =>{return true}

		wrapper.vm.onSubmit()

		expect(wrapper.vm.pageLoad).toBe(true)

		mockSubmitRequest(400);

		setTimeout(()=>{

				expect(wrapper.vm.pageLoad).toBe(false)

				done();
		},1);
	});

  function mockSubmitRequest(status = 200,url = '/bill/api/update-billing-options'){
	
		moxios.uninstall();
	
		moxios.install();
	
		moxios.stubRequest(url,{
	
			status: status,
	
			response: {}
		})
	}

	function mockGetRequest(status = 200,url = '/bill/api/get-billing-options'){
	
		moxios.uninstall();
	
		moxios.install();
	
		moxios.stubRequest(url,{
	
			status: status,
	
			response: {
				data : {
					id:1,
					backlist_threshold:5,
					lockout_period:1,
					lockout_message:'test'
				}
			}
		})
	}
})