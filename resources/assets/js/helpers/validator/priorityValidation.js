import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function validatePrioritySettings(data){

    const { priority, priority_desc, priority_color } = data;

    let validatingData = {

        priority: [priority, 'isRequired', { 'max(50)' : 'The priority should be less than 50 characters.'}],
        
        priority_desc: [priority_desc, 'isRequired', { 'max(255)' : 'The priority description should be less than 255 characters.'}],

        priority_color: [priority_color, 'isRequired'],
    };
    
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    store.dispatch('setValidationError', errors);
  
    return {errors, isValid};
};