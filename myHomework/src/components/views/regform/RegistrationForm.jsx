import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./registrationForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../Redux/slices/session";

const RegistrationForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { signupUsernameError, signupPasswordError } = useSelector(
    (state) => state.session.messages
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, password };
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate(-2);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.registrationForm}>
      <h2>Registration</h2>
      <Form onSubmit={handleSubmit}>
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
          {signupUsernameError &&
            signupUsernameError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
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
          {signupPasswordError &&
            signupPasswordError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </FormGroup>
        <p>Fields marked with * are mandatory to fill out.</p>
        <Button color="primary">SUBMIT</Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
