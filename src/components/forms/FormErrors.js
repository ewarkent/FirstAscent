//Failed attempt at abstraction. Just throw everything inside of Form.js

class FormErrors{
    constructor(){
        this.setState = {
            
                poster: '',
                title: '',
                difficulty: '',
                location: '',
                GpsCoords: '',
                directions: '',
                description: '',
        }
    }
}

export default FormErrors;

/**
 * 
 * Some legacy stuff that didn't work out
 * Below is from https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs
 * Demo is from https://github.com/learnetto/react-form-validation-demo
 * 
import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
</div>
 * 
 */