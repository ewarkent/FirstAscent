import React, { Component } from 'react';

// Form to submit a climb/boulder problem?

class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            poster: '',
            title: '',
            location: '',
            description: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    /* general puspose onChange() */
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        //don't actually submit something yet
        //this.props.onSubmit(this.state);
    }

    //poster, title, location, description
    render() {
        return (
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
 */
