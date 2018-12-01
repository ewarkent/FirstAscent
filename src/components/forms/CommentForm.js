import React, { Component } from 'react';
import { db } from '../../firebase/firebase.js';
import FormValidator from './FormValidator';
import '../css/CommentForm.css'

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new FormValidator([
            {
                field: 'poster',
                method: 'isEmpty',
                validWhen: false,
                message: 'Field is empty'
            },
            {
                field: 'comment',
                method: 'isEmpty',
                validWhen: false,
                message: 'Field is empty'
            },
            
            {
                field: 'comment',
                method: 'isLength',
                args: [10,5000],
                validWhen: true,
                message: 'Must be greater than or equal to 10 characters'
            },
        ])

        this.state = {
            // content of comment submitted
            poster: '',
            comment: '',

            // form validation
            validation: this.validator.valid(),
        }

        this.submitted = false;
    }

    /* general puspose onChange()
    */
    handleChange = (e) =>{
        e.preventDefault();

        this.setState(
            { [e.target.id]: e.target.value, },
        );   
    }   

    handleSubmit = (e) => {
        // prevent default, use firebase to store posts
        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if(validation.isValid){
            var postKey = window.location.pathname.replace('/post/','');
            //alert("Comment submitted with the follow: "
            //  + this.state.comment + "\n");
        
            db.ref('posts/' + postKey + "/comments").push({
                poster: this.state.poster,
                comment: this.state.comment,
            })

            window.location.reload();
        }
    }

    render(){

        let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation                   // otherwise just use what's in state

        return(
            <div className="main">
                <form name="comment_form" onsubmit={this.handleSubmit}>
                    <div className='comment_poster'>
                        <div>
                            <input type="text"
                                id="poster"
                                placeholder='Enter Display Name'
                                value={this.state.poster}
                                onChange={this.handleChange}
                                className="form-control"/>
                            </div>
                        <span className="help-block">{validation.poster.message}</span>
                        </div>
                    <div className={validation.comment.isInvalid && 'has-error'}>                                    
                        <textarea   
                            cols="75"
                            rows="5"
                            id="comment"
                            className="materialize-textarea-comments"
                            placeholder='Enter New Comment Here!'
                            value={this.state.directions}
                            onChange={this.handleChange}>
                        </textarea>
                        <br/>
                        <span className="help-block">{validation.comment.message}</span>
                        <br/>
                    </div>

                    <div>
                        <button 
                            type="submit"
                            id="climb_post_submit"
                            className="btn-default btn"
                            onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>        
                </form>
            </div>
        );
    }

    
}


export default CommentForm;
