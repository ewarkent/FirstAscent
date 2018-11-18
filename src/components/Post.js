import React, {Component} from 'react';

import * as firebase from '../firebase/firebase.js';
import GoogleMapsContainer from './Maps';
import './css/Post.css';
import StarRating from './forms/StarRatingComponent.js';
import CommunityRating from './forms/CommunityRating.js';




class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
    };
  }

  componentWillMount(){
    var postRef = firebase.db.ref('posts');
    //getting key from url
    var postKey = window.location.pathname.replace('/post/','');
    console.log('postKey=' +postKey)

    postRef.orderByKey().equalTo(postKey).on("child_added", data => {
      console.log('dataKey=' + data.key)
      var p = data.val();
      console.log("found"+ data.key);
      console.log("title: "+ p.title);

      this.setState({
        post: data.val()
      })
    });
  }

  render() {
    const {post} = this.state;
    {console.log(post)}
    return (
      <div>
        {!!post && <PostDisplay post={post}/> }
      </div>
    );
  }
}

const PostDisplay = ({post}) =>
<div className='postpage'>

    <div className='route-climber-names'>
      <div className='route'>{post.title}</div>
      <div className='climber'>First Ascent: {post.poster}</div>
    </div>

    <div className='pic-map'>
      <div className='pic'>
        {post.imageURL && <img src={post.imageURL}/>}
      </div>
      <div className='map'><GoogleMapsContainer/></div>
    </div>
    

    <div className='diff-star-comm_diff'>
      <div className='diff'>Difficulty: 
        <div className='dsc_content'>{post.difficulty}</div>
      </div>
      <div className='star'>Star Rating:
        <div className='dsc_content'><StarRating/></div>
      </div>
      <div className='comm_diff'>Community Difficulty:
        <div className='dsc_content'><CommunityRating/></div>
      </div>
    </div>

    <div className='text-boxes'>
      <div className='description'>Description: 
        <div className='textbox_content'>- {post.description}</div>
      </div>
      <div className='location'>Location / Directions: 
        <div className='textbox_content'>- {post.location}</div>
        <div className='textbox_content'>- {post.directions}</div>
      </div>
      <div className='comments'>Comments:
        <div className='textbox_content'>(*COMMENT SECTION*)</div>
      </div>
    </div>
  </div>
  

export default PostPage;