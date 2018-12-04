import React, { Component } from 'react';

import * as firebase from '../firebase/firebase.js';
import PostMap from './PostMap';
import './css/Post.css';
import StarRating from './forms/StarRatingComponent.js';
import CommunityRating from './forms/CommunityRating.js';
import CommentForm from './forms/CommentForm.js';




class PostPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: null,
			comments: null,
		};
	}

	componentWillMount() {
		var postRef = firebase.db.ref('posts');
		//getting key from url
		var postKey = window.location.pathname.replace('/post/', '');
		console.log('postKey=' + postKey)

		postRef.orderByKey().equalTo(postKey).on("child_added", data => {
			console.log('dataKey=' + data.key)
			var p = data.val();
			console.log("found" + data.key);
			console.log("title: " + p.title);

			this.setState({
				post: data.val()
			})
		});

		var commentRef = firebase.db.ref('posts/' + postKey + '/comments/');
		commentRef.once('value').then(snapshot => {
			console.log('comments snapshot: ' + snapshot.val())

			this.setState({
				comments: snapshot.val(),
			})
		})
	}

	render() {
		const { post } = this.state;
		const { comments } = this.state;
		console.log(post)
		return (
			<div>
				{!!post && <PostDisplay post={post} />}
				{!!comments && <CommentsDisplay comments={comments} />}
				{<CommentSubmit />}
			</div>
		);
	}
}


const PostDisplay = ({ post }) =>
	<div className='postpage'>

		<div className='route-climber-names'>
			<div className='route'>{post.title}</div>
			<div className='climber'>First Ascent: {post.poster}</div>
		</div>

		<div className='pic-map'>
			<div className='pic'>
				{post.imageURL && <img src={post.imageURL} alt="mountain pic"/>}
			</div>
			<div className='map'><PostMap title={post.title} 
										GpsCoordsLat={post.GpsCoordsLat}
										GpsCoordsLng={post.GpsCoordsLng}/></div>
		</div>


		<div className='diff-star-comm_diff'>
			<div className='diff'><span className='underline_titles'>Difficulty</span>
				<div className='dsc_content'>{post.difficulty}</div>
			</div>
			<div className='star'><span className='underline_titles'>Star Rating</span>
				<div className='dsc_content'><StarRating /></div>
			</div>
			<div className='comm_diff'><span className='underline_titles'>Community Difficulty</span>
				<div className='dsc_content'><CommunityRating /></div>
			</div>
		</div>

		<div className='text-boxes'>
			<div className='description'><span className='underline_titles'>Description</span>
				<div className='textbox_content'>- {post.description}</div>
			</div>
			<div className='location'><span className='underline_titles'>Location / Directions</span>
				<div className='textbox_content'>- {post.location}</div>
				<div className='textbox_content'>- {post.directions}</div>
			</div>
		</div>

		<div className='comment_title'>Comments</div>
	</div>

	/**
	<div className='pic-map'>
		<div className='pic'>
			{post.imageURL && <img src={post.imageURL} />}
		</div>
		<div className='map'><PostMap title={post.title} GpsCoords={post.GpsCoords} /></div>
	</div>
	*/

const CommentsDisplay = ({ comments }) =>
	<div className='comment_box'>
		<div className='comments'>

			<div className='textbox_content'>
				<div className='commentlist'>
					{Object.keys(comments).map(key =>
						<div className='comment_text' key={key}>
							- {comments[key].comment}
							<br />
							<span className='comment_author'>~* {comments[key].poster} *~</span>
							<br />

						</div>
					)}
				</div>
			</div>
		</div>
	</div>

const CommentSubmit = () =>
	<div className="new_comment_box" >
		<div className='new_comment_wrapper'>

			<div className='new_comment_title'>
				Submit your own comment!
            </div>

		</div>
		<div className='comment_textarea'>
			<div><CommentForm /></div>
		</div>
	</div>





export default PostPage;