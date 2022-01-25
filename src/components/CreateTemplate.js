import React, { useEffect } from 'react';
import { useState } from 'react';
import { useUser } from '../providers/UserProvider';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';
import UploadImageToS3WithReactS3 from '../components/UploadImageToS3WithReactS3';
import {
  Divider,
  Header,
  Button,
  Container,
  Form,
  TextArea,
  Select,
} from 'semantic-ui-react';

export default function CreateTemplate({ onCreatedHandler }) {
  const { creator } = useUser();
  const { createTemplate } = useCreatorTemplates();
  const [templateName, setTemplateName] = useState('NFT name');
  const [totalSupply, setTotalSupply] = useState(1);
  const [description, setDescription] = useState(
    'Short introduction for your NFT'
  );
  const [imageUrl, setImageUrl] = useState('fdfdfdffd');
  const [siteId, setSiteId] = useState('1');
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
      imageUrl,
      siteId
    );

    onCreatedHandler();
  };

  const onFileUploadedListener = (data) => {
    console.log(data);
    setImageUrl(data.location);
  };

  useEffect(() => {
    if (creator) {
      setCreatorName(creator.name);
    }
  }, [creator]);

  const collectionOptions = [
    { key: '1', value: '1', text: 'Mazu' },
    { key: '2', value: '2', text: 'Hiking' },
    { key: '3', value: '3', text: 'Plant' },
    { key: '4', value: '4', text: 'People' },
  ];

  const handleOnChange = (e, data) => {
    setSiteId(data.value);
  };

  const copyUrl = (e) => {
    e.preventDefault();
    var textBox = document.getElementById('url');
    textBox.select();
    //alert(textBox.value);
    document.execCommand('copy');
  };

  return (
    <Container textAlign="left">
      <Header inverted size="huge">
        Create New Template
      </Header>
      <Divider />
      <Header inverted size="large">
        Metadata
      </Header>
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

        <Form.Group widths="equal">
          <Form.Input
            fluid
            id="url"
            action={{ icon: 'copy', onClick: (e) => copyUrl(e) }}
            label="URL of the uploaded image"
            value={imageUrl}
            readonly
          />
        </Form.Group>

        <Form.Field>
          <label>Collection</label>
          <Select
            placeholder="Select Collection"
            options={collectionOptions}
            onChange={handleOnChange}
          ></Select>
        </Form.Field>

        <Divider hidden />
        <Button inverted type="submit">
          Submit
        </Button>
      </Form>

      <Divider />
      <Header inverted size="large">
        Image Upload
      </Header>
      <UploadImageToS3WithReactS3
        fileUploadedListener={onFileUploadedListener}
      />
    </Container>
  );
}
