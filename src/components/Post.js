import React from 'react';

import './css/Post.css';

const PostPage = () =>
  <div className='postpage'>
    <h1>Post Page</h1>

    <div className='route-climber-names'>
      <div className='route'>BIGO ROCK</div>
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
      <div className='description'>Description</div>
      <div className='location'>Location</div>
      <div className='comments'>Comments</div>
    </div>

  </div>

  

export default PostPage;