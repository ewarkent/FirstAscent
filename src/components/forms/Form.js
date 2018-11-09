import React, { Component } from 'react';
import { db } from '../../firebase/firebase.js';

import '../css/Form.css';

// Form to submit a climb/boulder problem?
class Form extends React.Component{

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
        }
    }

    /* general puspose onChange()
    *   if doesn't work, write out individually?
    */
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //don't actually submit something yet???
    //this.props.onSubmit(this.state);
    handleSubmit = (e) => {
        // prevent default, use firebase to store posts
        e.preventDefault();
        alert("Submission was pressed with the following attributes:\n"
                + "Poster: " + this.state.poster + "\n" 
                + "Title: " + this.state.title + "\n"
                + "Difficulty: " + this.state.difficulty + "\n"
                + "Location: " + this.state.location + "\n"
                + "GpsCoords: " + this.state.GpsCoords + "\n"
                + "Directions: " + this.state.directions + "\n"
                + "Description: " + this.state.description + "\n");
        
        db.ref('posts').push({
          poster: this.state.poster,
          title: this.state.title,
          difficulty : this.state.difficulty,
          location: this.state.location,
          GpsCoords: this.state.GpsCoords,
          directions: this.state.directions,
          description: this.state.description
        })
    }

    

    //poster, title, location, gpscoords, directions, description
    render() {
        return (
            <form name="climb_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="climb_post">
                    <div className='climb_info'>
                        <div className="form-group">
                            <label className="col-sm-2 control-label required" htmlFor="climb_post_Poster">Climbed By:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    id="poster"
                                    required="required"
                                    value={this.state.poster}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label required" htmlFor="climb_post_title">Route Name:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    id="title"
                                    required="required"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label required" htmlFor="climb_post_difficulty">Route Difficulty:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    id="title"
                                    required="required"
                                    value={this.state.difficulty}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label required" htmlFor="climb_post_loca">Location:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    id="location"
                                    required="required"
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label required" htmlFor="climb_post_gps">GPS Coordinates:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    id="GpsCoords"
                                    required="required"
                                    value={this.state.GpsCoords}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label required" htmlFor="climb_post_desc">Directions:</label>
                            <div className="col-sm-10">
                                <textarea   
                                            cols="50"
                                            rows="4"
                                            id="directions"
                                            className="materialize-textarea"
                                            required="required"
                                            value={this.state.directions}
                                            onChange={this.handleChange}>
                                </textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label required" htmlFor="climb_post_desc">Description:</label>
                            <div className="col-sm-10">
                                <textarea   
                                            cols="50"
                                            rows="4"
                                            id="description"
                                            className="materialize-textarea"
                                            required="required"
                                            value={this.state.description}
                                            onChange={this.handleChange}>
                                </textarea>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-10">
                                <button type="submit"
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
