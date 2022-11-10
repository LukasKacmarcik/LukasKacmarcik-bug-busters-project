import { Form, FormGroup, Label, Input, Button, NavLink } from "reactstrap";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./loginForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Redux/slices/session";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUsernameError, loginPasswordError } = useSelector(
    (state) => state.session.messages
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, password };
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>Log in</h2>
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
          {loginUsernameError &&
            loginUsernameError.split("\n").map((message, index) => (
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
          {loginPasswordError &&
            loginPasswordError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </FormGroup>
        <p>Fields marked with * are mandatory to fill out.</p>
        <Button color="primary">SUBMIT</Button>
        <NavLink to="/signup" tag={Link}>
          Register here
        </NavLink>
      </Form>
    </div>
  );
};

export default LoginForm;
