import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import { Container } from 'semantic-ui-react';

const S3_BUCKET = 'mazu-nft';
const DIR_NAME = 'sentimen_photo';
const REGION = 'ap-northeast-2';
const ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_SECRET_KEY;

const config = {
  bucketName: S3_BUCKET,
  dirName: DIR_NAME,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

const UploadImageToS3WithReactS3 = ({ fileUploadedListener }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    console.log(ACCESS_KEY);
    console.log(SECRET_ACCESS_KEY);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => {
        console.log(data);
        fileUploadedListener(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <br />
      <Container>
        <input label="Select Image" type="file" onChange={handleFileInput} />
        <button onClick={() => handleUpload(selectedFile)}>Upload</button>
      </Container>
    </div>
  );
};

export default UploadImageToS3WithReactS3;
