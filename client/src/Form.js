import React, { Component } from "react";

class ImageUploadForm extends Component {
  render() {
    return (
      <form
        action="http://localhost:5000/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <p>Please choose an image to upload</p>
        <div>
          <input type="file" name="fileToUpload" id="fileToUpload" />
        </div>
        <div>
          <input type="submit" value="Upload Image" name="submit" />
        </div>
      </form>
    );
  }
}

export default ImageUploadForm;
