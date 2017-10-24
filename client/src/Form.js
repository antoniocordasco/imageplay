import React, { Component } from 'react';

class ImageUploadForm extends Component {
  render() {
    return (
      <form
        action="http://localhost:5000/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <input type="file" name="fileToUpload" id="fileToUpload" />
        <input type="submit" value="Upload Image" name="submit" />
      </form>
    );
  }
}

export default ImageUploadForm;
