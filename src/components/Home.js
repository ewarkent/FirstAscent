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
      <div className='main'>
        <div className='post_content'>{ !!posts && <PostList posts={posts} /> }</div>
        <div className='user_content'>{ !!users && <UserList users={users} /> }</div>
      </div>
    );
  }
}


const UserList = ({ users }) =>
  <div>
    <div className='userlist_title'>Current Members</div>
    <div className='userlist'>
      {Object.keys(users).map(key =>
        <div key={key}>- {users[key].username}</div>
      )}
    </div>  
  </div>


const PostList = ({ posts }) =>
  <div>
    <div className='title_box'>
      <div className='title'>List of Climbs</div>
      <div className='how_to_post'>Click on New Climb to post a new climb!</div>
    </div>
    <div className='postlist'>  
      {Object.keys(posts).map(key =>
        <div key={key}>
          <div className='posts'> 
              <div><span className='category'>Route:</span><span className='db_info'>{posts[key].title}</span></div>
              <div><span className='category'>Difficulty:</span><span className='db_info'>{posts[key].difficulty}</span></div>
              <div><span className='category'>First Ascent:</span><span className='db_info'>{posts[key].poster}</span></div> 
              <div><span className='category'>Location:</span><span className='db_info'>{posts[key].location}</span></div> 
            
            <div className='link_button'>
              <button><Link className='postlink' to={routes.POST + '/' + key}>See More!</Link></button> 
            </div>
          </div>  
        </div>
      )}
    </div>    
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);