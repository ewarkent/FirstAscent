import React, {Component} from 'react';
import './css/drawline.css';
//import ladder from './ladder.jpg';
//import humedyno from './humedyno.jpg';
//import pano from './pano.jpg';

import ReactDOM from 'react-dom';

class CanvasBox extends Component{


    constructor(props) {
        super(props);
         
        this.state={
            isDown: false,
            previousPointX:'',
            previousPointY:'',
            file:null
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }

      handleMouseDown(event){ 
        console.log(event);    
        this.setState({
            isDown: true,
            previousPointX:event.offsetX,
            previousPointY:event.offsetY
        },()=>{    
            const canvas = ReactDOM.findDOMNode(this.refs.canvas);    
            var x = event.offsetX;
            var y = event.offsetY;
            var ctx = canvas.getContext("2d");
            console.log(x,y);
            ctx.moveTo(x,y);
            ctx.lineTo(x+1,y+1);
            ctx.stroke();
            ctx.strokeStyle="red";
            ctx.lineWidth=3;
        })
    }
    handleMouseMove(event){

    }
    handleMouseUp(event){
        this.setState({
            isDown: false
        });
        
            const canvas = ReactDOM.findDOMNode(this.refs.canvas);
            var x = event.offsetX;
            var y = event.offsetY;
            var ctx = canvas.getContext("2d");

            ctx.moveTo(this.state.previousPointX,this.state.previousPointY);
            ctx.lineTo(x,y);
            ctx.stroke();
            ctx.closePath();
        
    }
    
    //Function to load images into the canvas
    loadimage() {
        //const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        //const ctx = canvas.getContext("2d");
        //ctx.fillStyle = 'rgb(200,255,255)';
        //ctx.fillRect(0, 0, 625, 425);
        
        var myCanvas = document.getElementById('canvas');
        var ctx = myCanvas.getContext('2d');
        var img = new Image();
        //***************************************** */
        //This is where we need to upload the image
            //testing different hardcoded pics
        //img.src = ladder; 
        //img.src = humedyno;
        //img.src = pano;
        img.src = this.state.file;
        //****************************************** */

        var imageAspectRatio = img.width / img.height;
        var canvasAspectRatio = 625 / 425;
        var renderableHeight, renderableWidth, xStart, yStart;

        // If image's aspect ratio is less than canvas's we fit on height
        // and place the image centrally along width
        if(imageAspectRatio < canvasAspectRatio) {
            renderableHeight = 425;
            renderableWidth = img.width * (renderableHeight / img.height);
            xStart = (625 - renderableWidth) / 2;
            yStart = 0;
           
        }

        // If image's aspect ratio is greater than canvas's we fit on width
        // and place the image centrally along height
        else if(imageAspectRatio > canvasAspectRatio) {
            renderableWidth = 625
            renderableHeight = img.height * (renderableWidth / img.width);
            xStart = 0;
            yStart = (425 - renderableHeight) / 2;
           
        }

        // Happy path - keep aspect ratio
        else {
            renderableHeight = 425;
            renderableWidth = 625;
            xStart = 0;
            yStart = 0;
            
        }

        ctx.drawImage(img,xStart,yStart,renderableWidth,renderableHeight); 
         
    }

    
    


    render() {
        return (
            <div className='container'>
                <div className='instructions'>
                    <input type="file" onChange={this.handleChange}/>
                    <span>
                        <button className='load_button' onClick={this.loadimage.bind(this)}>Load Image</button>
                        (Press 2x)
                    </span>    
                    <div>1) Choose Your Picture <br/>2) Draw Lines By Click->Drag->Drop <br/>3) Save Image Locally and Upload Below</div>
                {//<img src={this.state.file}/>
                }
                </div>
                <div className="canvasdiv">    
                    <canvas id="canvas" ref="canvas" 
                            width={625}
                            height={425}
                            onMouseDown={
                                e => {
                                    let nativeEvent = e.nativeEvent;
                                    this.handleMouseDown(nativeEvent);
                                }}
                            onMouseMove={
                                e => {
                                    let nativeEvent = e.nativeEvent;
                                    this.handleMouseMove(nativeEvent);
                                }}    
                            onMouseUp={
                                e => {
                                    let nativeEvent = e.nativeEvent;
                                    this.handleMouseUp(nativeEvent);
                                }}
                    />
                </div>
                
            </div>    
        );
    }

}   

export default CanvasBox





    
