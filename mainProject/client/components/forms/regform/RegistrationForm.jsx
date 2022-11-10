import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './registrationForm.module.scss';
import NewsletterForm from '../newsletterForm/NewsletterForm';
import { useDispatch } from 'react-redux';
import { registerUser } from '@redux/slices/session';
import AlertMessages from '../../alertMessages/AlertMessages';

const RegistrationForm = () => {
  const [emailAddress, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Owner');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, emailAddress, address, password, role };

    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.registrationForm}>
      <h2>Registration</h2>
      <AlertMessages slice="session" />
      <Form encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email_address" className={styles.requiredField} tag="h4">
            Email
          </Label>
          <Input
            id="email_address"
            name="email_address"
            placeholder="Please enter your email"
            type="text"
            value={emailAddress}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="username" className={styles.requiredField} tag="h4">
            Username:
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="Please enter your username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="address" className={styles.requiredField} tag="h4">
            Address:
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="Please enter your address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className={styles.requiredField} tag="h4">
            Password:
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label className={styles.requiredField} for="select" tag="h4">
            Please select
          </Label>
          <Input type="select" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Owner</option>
            <option>Customer</option>
          </Input>
        </FormGroup>
        <p>Fields marked with * are mandatory to fill out.</p>
        <Button color="primary">SUBMIT</Button>
      </Form>
      <NewsletterForm />
    </div>
  );
};

export default RegistrationForm;
