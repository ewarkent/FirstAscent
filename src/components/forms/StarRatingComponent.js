import React from 'react';
import { db } from '../../firebase/firebase.js';
import StarRatingComponent from 'react-star-rating-component';


class StarRating extends React.Component {
    constructor() {
        super();
 
        this.state = {
            averageRating: null,
            enteredRating:null,
        };
    }

    componentWillMount(){
      //getting key from url
      console.log("star rating mounting start")
      var postKey = window.location.pathname.replace('/post/','');
      var starRef = db.ref('posts/' + postKey + '/stars');

      starRef.once('value').then(snapshot=>{
          if(snapshot.val() != null){
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
          }
          
      })
  }
 
    onStarClick(nextValue, prevValue, name) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        var postKey = window.location.pathname.replace('/post/','');
        

        this.setState({enteredRating: nextValue});
        
        console.log("Debug: Star rating is.... : " + nextValue);
        db.ref('posts/' + postKey + '/stars').push({
            rating: nextValue,
        })
        //alert("Rating submission posted to database with value: "
          //  + nextValue);
        alert("Thanks For The Rating! Press OK To Continue");
            window.location.reload();
    }
 
    render() {
        console.log("average rating");
        let averageRating = this.state.averageRating;
        if( averageRating == null ){
            averageRating = 'No ratings found';
        }
        console.log("average rating 2:" + averageRating);
    
        return (                
            <div>
                <h4>Average rating!</h4>
                <StarRatingComponent
                    name="averageRating" 
                    starCount={5}
                    value={averageRating}
                />
                <h4>Rate This Climb!</h4>
                <StarRatingComponent
                    name="enteredRating"
                    starCount={5}
                    value={this.state.enteredRating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}

 
export default StarRating
