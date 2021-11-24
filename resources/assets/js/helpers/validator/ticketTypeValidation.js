import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function validateTicketTypeSettings(data){

    const { name, type_desc } = data;

    let validatingData = {

        name: [name, 'isRequired', { 'max(50)' : 'The name should be less than 50 characters.'}],
        
        type_desc: [type_desc, 'isRequired', { 'max(50)' : 'The description should be less than 50 characters.'}]
    };
    
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    store.dispatch('setValidationError', errors);
  
    return {errors, isValid};
};