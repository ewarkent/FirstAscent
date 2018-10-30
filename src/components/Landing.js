import React, {Component} from 'react';
import { db } from '../firebase/firebase.js';

class LandingPage extends Component{
    constructor(){
    super();

    this.state = {
      posts: null,
    };
  }

  componentWillMount(){
    let postsRef = db.ref('posts');

    postsRef.once('value').then(snapshot => {
      console.log(snapshot.val())

      this.setState({
        posts: snapshot.val()
      })
    })
  }
  
  componentWillUnmount(){
    // what to put here?
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h1>Landing Page</h1>
        <p>The Landing Page is the first thing that people will see.
          We should show some list of climbs.???
        </p>

        { !!posts && <PostList posts={posts} /> }
      </div>
    );
  }

}

const PostList = ({ posts }) =>
  <div>
    <h2>List of Posts</h2>
    <p>Posts are submitted from the link to form.</p>

    {Object.keys(posts).map(key =>
      <div key={key}>
        {posts[key].title} <br />
        {posts[key].poster} <br />
        {posts[key].location} <br />
        {posts[key].description}  <br />
        <br />
      </div>
    )}
  </div>

/*
const LandingPage = () =>
  <div>
    <div className='title'>First Ascent</div>
     
    <div className='content'>
      <div className='recent_climb'>
        
      </div>
    </div>
  </div>
*/



export default LandingPage;