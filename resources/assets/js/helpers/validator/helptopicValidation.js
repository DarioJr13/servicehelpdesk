import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function validateTopicSettings(data){

    const { topic, department, linked_departments } = data;

    let validatingData = {

        topic: [topic, 'isRequired', { 'max(100)' : 'The topic should be less than 100 characters.'}],
        
        linked_departments: [linked_departments, 'isRequired'],

        department: [department, 'isRequired']
    };
    
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    store.dispatch('setValidationError', errors);
  
    return {errors, isValid};
};