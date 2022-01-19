import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import { Container, Input, Button, Image, Divider } from 'semantic-ui-react';

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
  const [uploadedPath, setUploadedPath] = useState(null);

  const handleFileInput = (e) => {
    console.log(ACCESS_KEY);
    console.log(SECRET_ACCESS_KEY);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => {
        console.log(data);
        setUploadedPath(data.location);
        fileUploadedListener(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container textAlign="left">
      <Input type="file" fluid onChange={handleFileInput} />
      <Divider hidden />
      {uploadedPath ? <Image src={uploadedPath} size="medium" /> : ''}
      <Divider hidden />
      <Button inverted onClick={() => handleUpload(selectedFile)}>
        Upload
      </Button>
    </Container>
  );
};

export default UploadImageToS3WithReactS3;
