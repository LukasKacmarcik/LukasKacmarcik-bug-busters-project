import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from './loginFrom.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@redux/slices/session';
import AlertMessages from '../alertMessages/AlertMessages';

function LoginForm() {
  const location = useLocation();
  const { status, username } = useSelector((state) => state.session);
  const defaultOpenModal = !!(
    status === 'failed' &&
    (location.pathname === '/owner/home' || location.pathname === '/customer/home')
  );

  const [modal, setModal] = useState(defaultOpenModal);

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const loginBody = { emailAddress, password };

    try {
      await dispatch(loginUser(loginBody)).unwrap();
      if (status !== 'failed') {
        toggle();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button color="success" onClick={toggle} outline size="md">
        <i className="fas fa-user-alt" />
        {username && ` ${username}`}
      </Button>
      <Modal isOpen={modal} centered size="md">
        <ModalHeader
          style={{
            borderBottom: '0 none',
          }}
          toggle={toggle}
        />
        <ModalBody className={styles.modalbody}>
          <h2>Login</h2>
          <AlertMessages slice="session" />
          <Form onSubmit={handleFormSubmit}>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label for="examplePassword">Password</Label>
            </FormGroup>
            <Button block color="primary" size="lg">
              Login
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter className={styles.modalfooter}>
          <p>
            Not registered yet?{' '}
            <Link to="/signup" onClick={toggle}>
              Sign up
            </Link>
            .
          </p>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginForm;
