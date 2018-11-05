import React, {Component} from 'react';

import * as firebase from '../firebase/firebase.js';
import { DataSnapshot } from '@firebase/database';
import { db } from '../firebase';

import './css/Post.css';

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
    <h1>Post Page</h1>

    <div className='route-climber-names'>
      <div className='route'>{post.title}</div>
      <div className='climber'>FA: Ethan</div>
    </div>

    <div className='pic-map'>
      <div className='pic'>Picture Goes Here</div>
      <div className='map'>Google Maps Goes Here</div>
    </div>
    

    <div className='diff-star-comm_diff'>
      <div className='diff'>Difficulty</div>
      <div className='star'>Star Rating</div>
      <div className='comm_diff'>Community Difficulty</div>
    </div>

    <div className='text-boxes'>
      <div className='description'>{post.description}</div>
      <div className='location'>{post.location}</div>
      <div className='comments'>Comments</div>
    </div>
  </div>
  

export default PostPage;