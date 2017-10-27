import React, { Component } from 'react';

class MergedImage extends Component {


    render() {
      return (
        <div>   
            <p><a href="/">Upload a new image</a></p>         
            <img src={this.props.imagePath} />
        </div>
      );
    }
  }
  
  export default MergedImage;
  