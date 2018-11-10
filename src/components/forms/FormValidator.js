import React, { Component } from 'react';

//Failed attempt at abstraction. Just throw everything inside of Form.js
// Some examples to look at, currently using the first link:
    // https://github.com/learnetto/react-form-validation-demo
    // https://github.com/mikeries/react-validation-tutorial

class FormValidator extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Let these contain the errors found in the form
            FormErrors: {
                poster: '',
                title: '',
                difficulty: '',
                location: '',
                GpsCoords: '',
                directions: '',
                description: '',
            },
        

            // Let these validate the content inside Form.js's states
            posterValid: false,
            titleValid: false,
            difficultyValid: false,
            locationValid: false,
            GpsCoordsValid: false,
            directionsValid: false,
            descriptionValid: false,

            formIsValid: false,
        }
    }

    validateField(id, value) {
        let formErrors = this.state.FormErrors;
        let pV = this.state.posterValid;
        let tV = this.state.titleValid;
        let diffV = this.state.difficultyValid;
        let locV = this.state.locationValid;
        let gpsV = this.state.GpsCoordsValid;
        let direcV = this.state.directionsValid;
        let descV = this.state.descriptionValid;
    
        /**
         * Input regexs here
         */
        let regexAny = /[A-Z][a-z]*/;
    
        /**
         * A really shitty way to handle validation using a switch statement
         *  Not scalable. Need to come up with a generalized way of handling validation.
         *  
         */
        switch(id) {
            case 'poster':
                pV = value.match(regexAny);
                formErrors.poster = pV ? '' : ' is invalid';
                break;
            case 'title':
                tV = value.length >= 1;
                formErrors.title = tV ? '': ' is too short';
                break;
            case 'difficulty':
                diffV = value.match(regexAny);
                formErrors.difficulty = diffV? '' : ' is invalid';
                break;
            case 'location':
                locV = value.match(regexAny);
                formErrors.location = locV ? '' : ' is invalid';
                break;
            case 'GpsCoords':
                gpsV = value.match(regexAny);
                formErrors.GpsCoords = gpsV ? '' : ' is invalid';
                break;
            case 'directions':
                direcV = value.match(regexAny);
                formErrors.directions = direcV ? '' : ' is invalid';
                break;
            case 'description':
                descV = value.match(regexAny);
                formErrors.description = descV ? '' : ' is invalid';
                break;
            default:
                break;
        }

        // Set states to what was discovered.
            this.setState(
                {   [this.posterValid]: pV,
                    [this.titleValid]: tV,
                    [this.difficultyValid]: diffV,
                    [this.locationValid]: locV,
                    [this.GpsCoordsValid]: gpsV,
                    [this.directionsValid]: direcV,
                    [this.descriptionValid]: descV,
                },
                    
                this.validateForm)
        
    }

    validateForm() {
        this.setState({[this.formIsValid]: 
                                    this.state.emailValid 
                                &&  this.state.passwordValid
                                &&  this.state.posterValid
                                &&  this.state.titleValid
                                &&  this.state.difficultyValid
                                &&  this.state.locationValid
                                &&  this.state.GpsCoordsValid
                                &&  this.state.directionsValid
                                &&  this.state.descriptionValid
                    });
    }
}

export default FormValidator