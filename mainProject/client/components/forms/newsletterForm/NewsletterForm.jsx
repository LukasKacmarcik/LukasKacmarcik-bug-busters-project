import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import React, { useState } from 'react';
import styles from './newsletterForm.module.scss';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className={styles.newsletterForm}>
      <h2>Join the newsletter!</h2>

      <Form encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email" tag="h4">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="Please enter your email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button color="primary">SUBMIT</Button>
      </Form>
    </div>
  );
};

export default NewsletterForm;
