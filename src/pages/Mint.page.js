import React, { Component } from 'react';
import UploadImageToS3WithReactS3 from '../components/UploadImageToS3WithReactS3';

class Mint extends Component {
  onFileUploadedListener = (data) => {
    console.log(data);
  };

  render() {
    return (
      <UploadImageToS3WithReactS3
        fileUploadedListener={this.onFileUploadedListener}
      />
    );
  }
}

export default Mint;
