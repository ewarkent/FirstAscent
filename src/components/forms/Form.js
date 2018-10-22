import React, { Component } from 'react';

// Form to submit a climb/boulder problem?

class Form extends React.Component{
    constructor(props){
        super(props);
    }

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

    render() {
        return (
            <form name="climb_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="climb_post">
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
                        <label className="col-sm-2 control-label required" htmlFor="climb_post_loca">Body</label>
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