import React, { Component } from 'react';

class MergedImage extends Component {


    render() {
      return (
        <div>            
            <img src={this.props.imagePath} />
        </div>
      );
    }
  }
  
  export default MergedImage;
  