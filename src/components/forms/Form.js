import React, { Component } from 'react';
import { db } from '../../firebase/firebase.js';
import firebase from 'firebase';
import FormValidator from './FormValidator.js';
import FileUploader from "react-firebase-file-uploader"; //in bash: $ npm i react-firebase-file-uploader

//import FormRules from './FormRules';

import '../css/Form.css';


// Form to submit a climb/boulder problem
class Form extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            poster: '',
            title: '',
            difficulty: '',
            location: '',
            GpsCoords: '',
            directions: '',
            description: '',

            
            image: '',
            isUploading: false,
            progress: 0,
            imageURL: '',

            // Let these contain the errors found in the form
            FormErrors: {
                poster: 'Field is empty!',
                title: 'Field is empty!',
                difficulty: 'Field is empty!',
                location: 'Field is empty!',
                GpsCoords: 'Field is empty!',
                directions: 'Field is empty!',
                description: 'Field is empty!',
                image: 'Choose an image!',     
            },

            // Let these validate the content inside Form.js's states
            posterValid: false,
            titleValid: false,
            difficultyValid: false,
            locationValid: false,
            GpsCoordsValid: false,
            directionsValid: false,
            descriptionValid: false,
            imageValid: false, //

            formIsValid: false,
            
        }

    }

    /* general puspose onChange()
    */
    handleChange = (e) =>{
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        this.setState(
            { [id]: value, },
            () => { this.validateField(id, value) },
        );
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
        let regexAny = /.+/;
        let isEmpty = 'Field is empty!';
    
        /**
         * A really shitty way to handle validation using a switch statement
         *  Not scalable. Need to come up with a generalized way of handling validation.
         *  
         */
        switch(id) {
            case 'poster':
                pV = regexAny.test(value)
                console.log("pv is now: " + pV);
                formErrors.poster = pV ? '' : isEmpty;
                break;
            case 'title':
                tV = value.length >= 2;
                formErrors.title = tV ? '': ' is too short';
                break;
            case 'difficulty':
                diffV = regexAny.test(value)
                formErrors.difficulty = diffV? '' : isEmpty;
                break;
            case 'location':
                locV = regexAny.test(value)
                formErrors.location = locV ? '' : isEmpty;
                break;
            case 'GpsCoords':
                gpsV = regexAny.test(value)
                formErrors.GpsCoords = gpsV ? '' : isEmpty;
                break;
            case 'directions':
                direcV = regexAny.test(value)
                formErrors.directions = direcV ? '' : isEmpty;
                break;
            case 'description':
                descV = regexAny.test(value)
                formErrors.description = descV ? '' : isEmpty;
                break;
            //add case for image.
            default:
                break;
        }

        // Do not use the format this.state.boolean : boolean
        //  It will result in the state remanining in its default value.
        this.setState(
            { 
                FormErorrs: formErrors,
                posterValid: pV,
                titleValid: tV,
                difficultyValid: diffV,
                locationValid: locV,
                GpsCoordsValid: gpsV,
                directionsValid: direcV,
                descriptionValid: descV,
            
            },
            
        );

        //console.log("States of validityA: " +  this.state.posterValid +  this.state.titleValid);
        //console.log("States of validityB: " +  pV + tV);

            this.validateForm();
        
    }

    // Do not use the form [this.state.formIsValid]
    //  It will result in the state remaining in its default value
    validateForm() {
        this.setState({
            formIsValid:  
                                    this.state.posterValid
                                &&  this.state.titleValid
                                &&  this.state.difficultyValid
                                &&  this.state.locationValid
                                &&  this.state.GpsCoordsValid
                                &&  this.state.directionsValid
                                &&  this.state.descriptionValid 
                    });
                    
        //console.log("This form is currently: " + this.state.formIsValid);
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        this.setState({ image: filename, progress: 100, isUploading: false });
        firebase
          .storage()
          .ref("boulderImages")
          .child(filename)
          .getDownloadURL()
          .then(url => this.setState({ imageURL: url }));
      };

    //don't actually submit something yet???
    //this.props.onSubmit(this.state);
    handleSubmit = (e) => {
        // prevent default, use firebase to store posts
        e.preventDefault();

        if(this.state.formIsValid){
            alert("Submission was pressed with the following attributes:\n"
                + "Poster: " + this.state.poster + "\n" 
                + "Title: " + this.state.title + "\n"
                + "Difficulty: " + this.state.difficulty + "\n"
                + "Location: " + this.state.location + "\n"
                + "GpsCoords: " + this.state.GpsCoords + "\n"
                + "Directions: " + this.state.directions + "\n"
                + "Description: " + this.state.description + "\n"
                + "Image: " + this.state.image + "\n"
                + "ImageURL: " + this.state.imageURL + "\n");
        
             db.ref('posts').push({
                poster: this.state.poster,
                title: this.state.title,
                difficulty : this.state.difficulty,
                location: this.state.location,
                GpsCoords: this.state.GpsCoords,
                directions: this.state.directions,
                description: this.state.description,
                image: this.state.image,
                imageURL: this.state.imageURL
            })

        }else{
            
        }
    }

    //poster, title, location, gpscoords, directions, description
    render() {
        //<span className="help-block">{validation.description.message}</span>
        let errors = this.state.FormErrors;

        return (
            <form name="climb_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="climb_post">
                    <div className='climb_info'>
                        <div className="form-group">
                                <label className="control-label" htmlFor="climb_post_Poster">Climbed By:</label>
                                <div>
                                    <input type="text"
                                        id="poster"
                                        value={this.state.poster}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                                        <span className="help-block">{errors.poster}</span>
                                </div>
                            
                                <label className="control-label" htmlFor="climb_post_title">Route Name:</label>
                                <div>
                                    <input type="text"
                                        id="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                                        <span className="help-block">{errors.title}</span>
                                </div>
                            
                                <label className="control-label" htmlFor="climb_post_difficulty">Route Difficulty:</label>
                                <div>
                                    <input type="text"
                                        id="difficulty"
                                        value={this.state.difficulty}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                                        <span className="help-block">{errors.difficulty}</span>
                                </div>
                            
                                <label className="control-label" htmlFor="climb_post_loca">Location:</label>
                                <div>
                                    <input type="text"
                                        id="location"
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                                        <span className="help-block">{errors.location}</span>
                                </div>
                            
                                <label className="control-label" htmlFor="climb_post_gps">GPS Coordinates:</label>
                                <div>
                                    <input type="text"
                                        id="GpsCoords"
                                        value={this.state.GpsCoords}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                                        <span className="help-block">{errors.GpsCoords}</span>
                                </div>
                            
                                <label className="control-label" htmlFor="climb_post_direc">Directions:</label>
                                <div>
                                    <textarea   
                                            cols="50"
                                            rows="4"
                                            id="directions"
                                            className="materialize-textarea"
                                            value={this.state.directions}
                                            onChange={this.handleChange}>
                                    </textarea>
                                    <span className="help-block">{errors.directions}</span>
                                </div>
                        
                                <label className="control-label" htmlFor="climb_post_desc">Description:</label>
                                <div>
                                    <textarea   
                                        cols="50"
                                        rows="4"
                                        id="description"
                                        className="materialize-textarea"
                                        value={this.state.description}
                                        onChange={this.handleChange}>
                                    </textarea>
                                    <span className="help-block">{errors.description}</span>
                                </div>

                                <label className="control-label" htmlFor="climb_post_image">Image:</label>
                                {this.state.isUploading && <p>Uploading Image: {this.state.progress}%</p>}


                                <FileUploader
                                accept="image/*"
                                name="image"
                                randomizeFilename
                                storageRef={firebase.storage().ref("boulderImages")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                />
                                
                                <div>
                                    <button 
                                            disabled = {!this.state.formIsValid}
                                            type="submit"
                                            id="climb_post_submit"
                                            className="btn-default btn"
                                            onClick={this.handleSubmit}>
                                        Submit
                                    </button>
                                </div>

                        </div>
                    </div>    
                </div>
            </form>
        );
    }



}

export default Form;



/**
 * Possible change to...
 * <h2>Enter your submissions information below.</h2>
                <label htmlFor="climb_post_Poster">
                    Posted by: 
                    <input
                        type = "poster"
                        required = "required"
                        value = {this.state.poster}
                        onChange = {this.handleChange}
                    />
                </label>
                <label htmlFor="climb_post_Title">
                    Title
                    <input
                        type = "title"
                        required = "required"
                        value = {this.state.title}
                        onChange = {this.handleChange}
                    />
                </label>
                <label htmlFor="climb_post_Location">
                    Location
                    <input
                        type = "location"
                        required = "required"
                        value = {this.state.location}
                        onChange = {this.handleChange}
                    />
                </label>
                <label htmlFor="climb_post_Description">
                    Posted by: 
                    <input
                        type = "description"
                        required = "required"
                        value = {this.state.description}
                        onChange = {this.handleChange}
                    />
                </label>
 * 
Legacy form from some tutorial I can no longer find.
            <form name="climb_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="climb_post">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="climb_post_Poster">Poster</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="climb_post_poster"
                                   required="required"
                                   value={this.state.poster}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="climb_post_title">Title</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="climb_post_title"
                                   required="required"
                                   value={this.state.title}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="climb_post_loca">Location</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="climb_post_loca"
                                   required="required"
                                   value={this.state.location}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="climb_post_desc">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="climb_post_desc"
                                   required="required"
                                   value={this.state.description}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="submit"
                                    id="climb_post_submit"
                                    className="btn-default btn">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>






 */
