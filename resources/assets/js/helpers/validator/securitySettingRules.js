import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function securitySettingsValidation(data){
    
    const { backlist_threshold, lockout_period, lockout_message } = data;
    
    let validatingData = {
       
        lockout_message : [lockout_message, 'isRequired',{'max(250)' :'The message should be less than 250 characters.'}], 

        lockout_period : [lockout_period, 'isRequired'], 

        backlist_threshold : [backlist_threshold, 'isRequired'], 
    };
    
    //creating a validator instance and pasing lang method to it
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    // write to vuex if errors
    store.dispatch('setValidationError', errors); //if component is valid, an empty state will be sent
  
    return {errors, isValid}
};


