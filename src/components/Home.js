import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import * as firebase from '../firebase/firebase.js';
import { db } from '../firebase';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

import './css/Home.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      posts: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  componentWillMount(){
    let postsRef = firebase.db.ref('posts');

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
    const { users } = this.state;
    const { posts } = this.state;
    return (
      <div>
        <h1>Home Page</h1>
        <div className='user_content'>{ !!users && <UserList users={users} /> }</div>
        <div className='post_content'>{ !!posts && <PostList posts={posts} /> }</div>
      </div>
    );
  }
}


const UserList = ({ users }) =>
  <div>
    <div className='title'>Current Members</div>
    <div className='userlist'>
      {Object.keys(users).map(key =>
        <div key={key}>{users[key].username}</div>
      )}
    </div>  
  </div>


const PostList = ({ posts }) =>
  <div>
    <div className='title'>List of Posts</div>
    <div className='how_to_post'>Click on New Post to post a new climb!</div>

    <div className='postlist'>  
      {Object.keys(posts).map(key =>
        <div key={key}>
          {posts[key].title} <br />
          {posts[key].poster} <br />
          {posts[key].location} <br />
          {/*}
          {posts[key].GpsCoords} <br />
          {posts[key].directions} <br />
          {posts[key].description}  <br />
      */}
          <div className='link_button'>-------------------------------
            <button><Link className='postlink' to={routes.POST + '/' + key}>View Post</Link></button>
            
          </div>
          <br />
          <br />
        </div>
      )}
    </div>    
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);