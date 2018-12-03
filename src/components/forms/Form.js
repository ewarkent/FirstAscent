import React, { Component } from 'react';
import { db } from '../../firebase/firebase.js';
import firebase from 'firebase';
import FormValidator from './FormValidator';
import FileUploader from "react-firebase-file-uploader"; //in bash: $ npm i react-firebase-file-uploader
import FormMap from './FormMap';
import CanvasBox from '../drawline.js';

import '../css/Form.css';


// Form to submit a climb/boulder problem
class Form extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.validator = new FormValidator([
			{
				field: 'poster',
				method: 'isEmpty',
				validWhen: false,
				message: 'Field is empty!'
			},
			{
				field: 'title',
				method: 'isEmpty',
				validWhen: false,
				message: 'Field is empty!'
			}, {
				field: 'difficulty',
				method: 'isEmpty',
				validWhen: false,
				message: 'Field is empty!'
			},
			/** 
			{
					field: 'location',
					method: 'isEmpty',
					validWhen: false,
					message: 'Field is empty!'
			},
			{
					field: 'GpsCoords',
					method: 'isEmpty',
					validWhen: false,
					message: 'Field is empty!'
			},
			*/
			{
				field: 'directions',
				method: 'isEmpty',
				validWhen: false,
				message: 'Field is empty!'
			},
			{
				field: 'description',
				method: 'isEmpty',
				validWhen: false,
				message: 'Field is empty!'
			},
			{
				field: 'description',
				method: 'isLength',
				args: [10, 5000],
				validWhen: true,
				message: 'Must be greater than or equal to 10 characters'
			},

		])

		this.state = {

			postKey: '',

			// basic form information
			poster: '',
			title: '',
			difficulty: '',
			location: '',
			GpsCoordsLat: '',
			GpsCoordsLng: '',
			directions: '',
			description: '',

			// image uploading
			image: '',
			isUploading: false,
			progress: 0,
			imageURL: '',

			// form validation
			validation: this.validator.valid(),

		}

		this.submitted = false;

	}

	componentWillMount() {
		var newPostKey = firebase.database().ref().child('post').push().key;
		console.log('newPostKey=' + newPostKey);
		this.setState({ postKey: newPostKey });
	}

	/**
	componentDidMount() {
		var location = this.foo.returnLoc();
		var GpsCoords = this.foo.returnGPS();

		this.setState({
			location: location,
			GpsCoords: GpsCoords
		});
	}
	*/

	/* general puspose onChange()
	*/
	handleChange = (e) => {
		e.preventDefault();

		this.setState(
			{ [e.target.id]: e.target.value, },
		);

		var location = this.foo.returnLoc();
		var GpsCoordsLat = this.foo.returnGPSLat();
		var GpsCoordsLng = this.foo.returnGPSLng();

		this.setState({
			location: location,
			GpsCoordsLat: GpsCoordsLat,
			GpsCoordsLng: GpsCoordsLng
		});
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

		const validation = this.validator.validate(this.state);
		this.setState({ validation });
		this.submitted = true;

		if (validation.isValid) {
			/*
			alert("Submission was pressed with the following attributes:\n"
					+ "Poster: " + this.state.poster + "\n" 
					+ "Title: " + this.state.title + "\n"
					+ "Difficulty: " + this.state.difficulty + "\n"
					//+ "Location: " + this.state.location + "\n"
					//+ "GpsCoords: " + this.state.GpsCoords + "\n"
					+ "Directions: " + this.state.directions + "\n"
					+ "Description: " + this.state.description + "\n"
					+ "Image: " + this.state.image + "\n"
					+ "ImageURL: " + this.state.imageURL + "\n");
			*/
			alert("Post Created! Press OK To Continue")

			//console.log('form location='+this.state.location);
			//console.log('form GPS='+this.state.GpsCoords);

			var postData = {
				poster: this.state.poster,
				title: this.state.title,
				difficulty: this.state.difficulty,
				location: this.state.location,
				GpsCoordsLat: this.state.GpsCoordsLat,
				GpsCoordsLng: this.state.GpsCoordsLng,
				directions: this.state.directions,
				description: this.state.description,
				image: this.state.image,
				imageURL: this.state.imageURL
			}

			var updates = {};

			updates['posts/' + this.state.postKey] = postData;
			//updates['/user-posts/' + uid + '/' + newPostKey] = postData;

			db.ref().update(updates);

			window.location = '/';
		}
	}


	//poster, title, location, gpscoords, directions, description
	render() {
		const postKey = this.state.postKey;
		//<span className="help-block">{validation.description.message}</span>
		let validation = this.submitted ?                         // if the form has been submitted at least once
			this.validator.validate(this.state) :   // then check validity every time we render
			this.state.validation                   // otherwise just use what's in state

		return (
			<div className='main'>
				<div className='drawing_box'>
					<CanvasBox className='canvas_div'></CanvasBox>
					<div className='upload_preview'>
					</div>
				</div>
				<form name="climb_post" className="form-horizontal" onSubmit={this.handleSubmit}>
					<div id="climb_post_box">
						<div className='climb_info'>
							<div className="form-group">
								<div className={validation.poster.isInvalid && 'has-error'}>
									<label className="control-label" htmlFor="climb_post_Poster">Climbed By:</label>
									<div>
										<input type="text"
											id="poster"
											value={this.state.poster}
											onChange={this.handleChange}
											className="form-control" />
									</div>
									<span className="help-block">{validation.poster.message}</span>
								</div>

								<div className={validation.title.isInvalid && 'has-error'}>
									<label className="control-label" htmlFor="climb_post_title">Route Name:</label>
									<div>
										<input type="text"
											id="title"
											value={this.state.title}
											onChange={this.handleChange}
											className="form-control" />
									</div>
									<span className="help-block">{validation.title.message}</span>
								</div>

								<div className={validation.difficulty.isInvalid && 'has-error'}>
									<label className="control-label" htmlFor="climb_post_difficulty">Route Difficulty:</label>
									<div>
										<input type="text"
											id="difficulty"
											value={this.state.difficulty}
											onChange={this.handleChange}
											className="form-control" />

									</div>
									<span className="help-block">{validation.difficulty.message}</span>
								</div>

								<div className='form-map'>
									<FormMap postKey={postKey}
										ref={foo => { this.foo = foo; }} />
								</div>

								<div className={validation.directions.isInvalid && 'has-error'}>
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
										<br /><span className="help-block">{validation.directions.message}</span>
										<br />
									</div>
								</div>

								<div className={validation.description.isInvalid && 'has-error'}>
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
										<br /><span className="help-block">{validation.description.message}</span>
										<br />
									</div>
								</div>


								<label className="control-label" htmlFor="climb_post_image">Image: </label>
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
								<br /><br />

								<div>
									<button
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

			</div>
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



                                <div className={validation.location.isInvalid && 'has-error'}>
                                    <label className="control-label" htmlFor="climb_post_loca">Location:</label>
                                    <div>
                                        <input type="text"
                                            id="location"
                                            value={this.state.location}
                                            onChange={this.handleChange}
                                            className="form-control"/>
                                            
                                    </div>
                                    <span className="help-block">{validation.location.message}</span>
                                </div>
                                    
                                <div className={validation.GpsCoords.isInvalid && 'has-error'}>
                                    <label className="control-label" htmlFor="climb_post_gps">GPS Coordinates:</label>
                                    <div>
                                        <input type="text"
                                            id="GpsCoords"
                                            value={this.state.GpsCoords}
                                            onChange={this.handleChange}
                                            className="form-control"/>
                                    </div>
                                    <span className="help-block">{validation.GpsCoords.message}</span>
                                    <br/>
                                </div>
*/