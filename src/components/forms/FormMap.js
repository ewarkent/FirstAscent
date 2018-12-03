import React, { Component } from 'react';
//import * as keys from '../../constants/keys';
//import { db } from '../../firebase/firebase.js';

import '../css/Form.css';

class FormMap extends Component {
	static defaultProps = {
		title: 'Cool Mountain',
		initialCenter: { lat: 37.000239, lng: -122.063346 }
	}

	constructor(props) {

		super(props);

		const { lat, lng } = this.props.initialCenter;

		this.state = {
			currentLocation: {
				lat: lat,
				lng: lng
			},
			zoom: 16,
			place_name: '',
			//place_id: '',
			place_gps: '',
			place_gps_lat: '',
			place_gps_lng: ''
		}

		this.submitted = false;
	}

	/** 
	componentWillMount(){
		var postKey = window.location.pathname.replace('/post/','');
		var dbRef = db.ref('posts' + postKey);
	}
	*/

	componentDidMount() {
		//get current location --not working
		if (this.props.centerAroundCurrentLocation) {
			if (navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					const coords = pos.coords;
					this.setState({
						currentLocation: {
							lat: coords.latitude,
							lng: coords.longitude
						}
					})
				})
			}
		}

		//var postKey = window.location.pathname.replace('/post/','');
		//var dbRef = db.ref('posts' + postKey+ 'location');
		var postKey = this.props.postKey;
		console.log('postKey='+postKey);

		/** 
		db.ref('posts' + postKey+ 'location').push({
			location: '',
			GpsCoords: '',
		});
		

		var postData = {
			location: '',
			GpsCoords: '',
		}
		var updates = {};
		*/

		// load map
		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: this.state.currentLocation,
			zoom: this.state.zoom,
		});

		map.addListener('zoom_changed', () => {
			this.setState({
				zoom: map.getZoom(),
			});
		});

		// add marker to map
		let marker = new window.google.maps.Marker({
			map: map,
			position: this.state.currentLocation,
			draggable: true,
		});

		marker.addListener('dragend', () => {
			let location = marker.getPosition();
			//console.log(location.toString());
			this.setState({
				place_gps: location.toString(),
				place_gps_lat: location.lat().toString(),
				place_gps_lng: location.lng().toString(),
			});
			
			/** 
			db.ref('posts' + postKey).update({
				GpsCoords: this.state.place_gps,
			});
			
			postData = {
				GpsCoords: location
			}
			updates['posts/' + postKey] = postData;
			db.ref().update(updates);
			*/

			this.returnLoc();
			this.returnGPSLat();
			this.returnGPSLng();
		});

		// autocomplete
		let inputNode = document.getElementById('search-input');
		//map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
		let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

		autoComplete.addListener('place_changed', () => {
			let place = autoComplete.getPlace();
			let location = place.geometry.location;

			this.setState({
				place_name: place.name,
				//place_id: place.place_id,
				place_gps: location.toString(),
				place_gps_lat: location.lat().toString(),
				place_gps_lng: location.lng().toString(),
			});

			// center place on map
			map.fitBounds(place.geometry.viewport);
			map.setCenter(location);

			/** 
			marker.setPlace({
				placeId: place.place_id,
				location: location,
			});
			
			marker.setDraggable(true);
			*/

			marker = new window.google.maps.Marker({
				map: map,
				position: location,
				draggable: true,
			});

			marker.addListener('dragend', () => {
				location = marker.getPosition();
				//console.log(location.toString());
				this.setState({
					place_gps: location.toString(),
					place_gps_lat: location.lat().toString(),
					place_gps_lng: location.lng().toString(),
				});
				
				/** 
				db.ref('posts' + postKey).update({
					location: place.name,
					GpsCoords: this.state.place_gps,
				});
				
				postData = {
					location: this.state.name,
					GpsCoords: location
				}
				updates['posts/' + postKey] = postData;
				db.ref().update(updates);*/
				this.returnLoc();
				this.returnGPSLat();
				this.returnGPSLng();
			});

		});
	}

	handleChange = (e) =>{
		e.preventDefault();
		this.setState(
				{ [e.target.id]: e.target.value, },
		);
	}
	

	render() {
		//console.log('Zoom level: ' + this.state.zoom);
		//console.log('Place: ' + this.state.place_name);
		//console.log('Place ID: ' + this.state.place_id);
		//console.log('Location: ' + this.state.place_gps);
		return (
			<div id='app'>
				<div id='search-container'>
					<p id='location'>Location:</p>
					<input id='search-input'
						type='text'
						onChange={this.handleChange} />
				</div>
				<div id='map' style={{ height: '350px', width: '100%' }} />
				<div>
					<p id='gps-coords-title'>GPS Coordinates:</p>
					<p id='gps-coords'>{this.state.place_gps}</p>
				</div>
			</div>
		)
	}

	returnLoc(){
		console.log('location='+this.state.place_name);
		return this.state.place_name;
	}

	returnGPSLat(){
		console.log('GPS lat='+this.state.place_gps_lat)
		return this.state.place_gps_lat;
	}

	returnGPSLng(){
		console.log('GPS lng='+this.state.place_gps_lng)
		return this.state.place_gps_lng;
	}
}

export default (FormMap)