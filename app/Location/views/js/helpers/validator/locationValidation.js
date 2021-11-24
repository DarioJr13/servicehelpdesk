import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function validateLocationSettings(data){

    const { title, phone, address, pincode, city } = data;

    let validatingData = {

        title: [title, 'isRequired', { 'max(50)' : 'The title should be less than 50 characters.'}],

        phone: [phone, { 'max(15)' : 'The phone should be less than 15 characters.'}],

        pincode: [pincode, { 'max(15)' : 'The pincode should be less than 15 characters.'}],

        address: [address, { 'max(50)' : 'The address should be less than 50 characters.'}],

        city: [city, { 'max(50)' : 'The city should be less than 50 characters.'}],
    };
    
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    store.dispatch('setValidationError', errors);
  
    return {errors, isValid};
};