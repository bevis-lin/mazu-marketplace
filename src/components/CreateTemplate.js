import React from 'react';
import { useState } from 'react';
//import { useUser } from '../providers/UserProvider';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';
import UploadImageToS3WithReactS3 from '../components/UploadImageToS3WithReactS3';
import { Button, Container, Form, TextArea } from 'semantic-ui-react';

export default function CreateTemplate({ onCreatedHandler }) {
  const { createTemplate } = useCreatorTemplates();
  const [templateName, setTemplateName] = useState('NFT name');
  const [totalSupply, setTotalSupply] = useState(1);
  const [description, setDescription] = useState(
    'Short introduction for your NFT'
  );
  const [imageUrl, setImageUrl] = useState('');
  const [templateData, setTemplateData] = useState('');
  const [activity, setActivity] = useState('');
  const [creatorName, setCreatorName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createTemplate(
      templateName,
      description,
      activity,
      creatorName,
      totalSupply,
      imageUrl
    );

    onCreatedHandler();
  };

  const onFileUploadedListener = (data) => {
    console.log(data);
    setImageUrl(data.location);
  };

  return (
    <Container textAlign="left">
      <Form inverted size="tiny" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Field>
            <label>Name</label>
            <input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Total Supply</label>
            <input
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Description</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Activity</label>
          <input
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Creator</label>
          <input
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
          />
        </Form.Field>

        <Form.Input
          fluid
          label="URL of the uploaded image"
          value={imageUrl}
          readonly
        />
        <Button type="submit">Submit</Button>
      </Form>

      <UploadImageToS3WithReactS3
        fileUploadedListener={onFileUploadedListener}
      />
    </Container>
  );
}
