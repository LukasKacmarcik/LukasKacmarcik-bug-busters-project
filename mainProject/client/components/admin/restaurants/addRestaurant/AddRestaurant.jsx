import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addNewRestaurant } from '@redux/slices/restaurants';
import { useNavigate } from 'react-router-dom';
import styles from './addRestaurant.module.scss';

const AddRestaurant = () => {
  const dispatch = useDispatch();
  const restaurantStatus = useSelector((state) => state.restaurants.status);

  const errorMessage = useSelector((state) => state.restaurants.error);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await dispatch(addNewRestaurant(formData)).unwrap();
      navigate('/owner/home');
    } catch (error) {
      console.error('Failed to save the restaurant: ', error);
    }
  };

  return (
    <div className={styles.addNewRestaurant}>
      <h2>Add new Restaurant</h2>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <Form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="name" className={styles.requiredField} tag="h4">
            Restaurant name:
          </Label>
          <Input id="name" name="name" placeholder="Enter restaurant name" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="address" className={styles.requiredField} tag="h4">
            Address:
          </Label>
          <Input id="address" name="address" placeholder="Enter restaurant address" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="email" className={styles.requiredField} tag="h4">
            Email
          </Label>
          <Input id="email" name="email" placeholder="Enter email" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="phone_number" className={styles.requiredField} tag="h4">
            Phone number
          </Label>
          <Input id="phone_number" name="phone_number" placeholder="Enter phone number" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="delivery_fee" className={styles.requiredField} tag="h4">
            Delivery fee
          </Label>
          <Input id="delivery_fee" name="delivery_fee" placeholder="Enter delivery fee" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="description" tag="h4">
            Description
          </Label>
          <Input id="description" name="description" placeholder="Enter description" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="image" className={styles.requiredField} tag="h4">
            Image
          </Label>
          <Input id="image" name="image" type="file" />
        </FormGroup>
        <p>Fields marked with * are mandatory to fill out.</p>
        <Button color="primary" disabled={restaurantStatus === 'loading'}>
          SUBMIT
        </Button>
      </Form>
    </div>
  );
};

export default AddRestaurant;
