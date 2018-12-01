import React from 'react';
import { db } from '../../firebase/firebase.js';

/**
 * the matches method is a weak form of validation
 * 
 */


class CommunityRating extends React.Component {
    constructor() {
        super();
        
        this.state = {
            averageVRating: null,
            enteredVRating: null,
        };

        this.submitted = false;
    }

    componentWillMount(){
        console.log("Debug: com-rating start mount");
        var postKey = window.location.pathname.replace('/post/','');
        var comdiffRef = db.ref('posts/' + postKey + '/comdiff');

        comdiffRef.once('value').then(snapshot =>{
            if(snapshot.val() != null){
                let values = Object.values(snapshot.val());
                let sum = 0;
                let average = 0;
                
                console.log("comdiff test: " + snapshot.val());
                console.log("comdiff test2: " + Object.values(snapshot.val()));
                console.log("comdiff object test: " + values[0]);
                console.log("comdiff value in object test: " + values[0].comdiff);
                console.log("comdiff object length test: " + values.length);

                values.forEach(element => {
                    sum += parseInt(element.comdiff);
                });
                
                console.log("sum is...: " + sum)

                average = sum / values.length;

                console.log("comdiff average is :" + average);
                this.setState({
                    averageVRating: average
                })
            }
        })
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState(
            { [e.target.id]: e.target.value, },
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Debug: start of comdiff handleSubmit")

        let isValid = false;
        let regex = /^([1-9]|[0-1]?[0-5])$/

        console.log("value before regex: " + this.state.enteredVRating)
        isValid = regex.test(this.state.enteredVRating)
        console.log("Value of isValid: " + isValid)

        if(isValid){
            console.log("community rating mounting start")
            var postKey = window.location.pathname.replace('/post/','');
            var comdiffRef = db.ref('posts/' + postKey + '/comdiff');
        
            //alert("Community Rating submitted: "
                //+ this.state.enteredVRating);
        
            comdiffRef.push({
                comdiff: this.state.enteredVRating,
            })
            alert("Thanks For The Feedback! Press OK To Continue");
            window.location.reload();
        }
    }
 
    render() {
        let averageVRating = Math.round(this.state.averageVRating);

        return (
            <div className="community_difficulty">
                <div className="comdiff_avg_rating">
                    <p>Community Difficulty: V{averageVRating}</p>
                </div>

                <form name="community_difficulty_form">
                    <div className="form-group">
                        <label className="control-label" htmlFor="comdiff_post">Enter V Rating (0 - 15):</label>
                        <div>
                            <input type="text"
                                    id="enteredVRating"
                                    value={this.state.enteredVRating}
                                    onChange={this.handleChange}
                                    className="form-control"/>           
                        </div>
                        
                        <div>
                            <button 
                                type="submit"
                                id="enteredVRating"
                                className="btn-default btn"
                                onClick={this.handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>

                
            </div>
            
        );
    }
}

 
export default CommunityRating