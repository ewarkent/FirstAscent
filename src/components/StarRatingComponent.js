import React from 'react';
import { db } from '../firebase/firebase.js';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends React.Component {
    constructor() {
        super();
 
        this.state = {
            rating: 0
        };
    }
 
    onStarClick(nextValue, prevValue, name) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        var postKey = window.location.pathname.replace('/post/','');

        this.setState({rating: nextValue});
        
        console.log("Debug: Star rating is.... : " + nextValue);
        db.ref('posts/' + postKey + '/stars').push({
            rating: nextValue,
        })
        alert("Rating submission posted to database with value: "
            + nextValue);
    }
 
    render() {
        const { rating } = this.state;
        
    
        return (                
            <div>
                <h2>Rate this post!</h2>
                <StarRatingComponent
                    name="rate1" 
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}

 
export default StarRating
