import React from 'react';
import { db } from '../firebase/firebase.js';
import StarRatingComponent from 'react-star-rating-component';

class StarRatingCommunity extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            averageRating: null,
        };
    }
    componentWillMount(){
        //getting key from url
        console.log("community rating mounting start")
        var postKey = window.location.pathname.replace('/post/','');
        var starRef = db.ref('posts/' + postKey + '/stars');

        starRef.once('value').then(snapshot=>{
            let values = Object.values(snapshot.val())
            let sum = 0;
            let average = 0;

            console.log("test " + snapshot.val());
            console.log(Object.values(snapshot.val()));
            console.log("object test: " + values[0]);
            console.log("value in object test: " + values[0].rating);
            console.log("object length test: " + values.length);

            values.forEach(element => {
                sum += element.rating
            });

            average = sum / values.length;

            console.log("this is average: " + average);
            this.setState({
                averageRating: average
            })
        })
    }


    render() {
        console.log("average rating");
        const averageRating = this.state.averageRating;
        console.log("average rating 2:" + averageRating);
        
        return (                
            <div>
                <h2>Average rating {averageRating}</h2>
                <StarRatingComponent
                    name="rate1" 
                    starCount={10}
                    value={averageRating}
                />
            </div>
        );
    }
}

 
export default StarRatingCommunity
