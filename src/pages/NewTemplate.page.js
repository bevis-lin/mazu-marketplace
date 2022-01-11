import React from 'react';
import CreateTemplate from '../components/CreateTemplate';
import { useNavigate } from 'react-router-dom';

export default function NewTemplate() {
  const history = useNavigate();

  const onTemplateCreated = () => {
    alert('template created');

    history('/creator/templates');
  };

  return <CreateTemplate onCreatedHandler={onTemplateCreated} />;
}
