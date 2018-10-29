import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import * as firebase from '../firebase/firebase.js';
import { db } from '../firebase';

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
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }
        { !!posts && <PostList posts={posts} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

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

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);