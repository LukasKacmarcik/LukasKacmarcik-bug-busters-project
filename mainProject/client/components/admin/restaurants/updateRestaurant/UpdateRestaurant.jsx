import { useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateRestaurant, fetchOwnersRestaurants } from '@redux/slices/restaurants';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './updateRestaurants.module.scss';

const UpdateRestaurant = () => {
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const restaurant = restaurants.filter((restaurant) => restaurant.id === params.id)[0];

  useEffect(() => {
    if (restaurantStatus === 'idle') {
      dispatch(fetchOwnersRestaurants());
    }
  }, [restaurantStatus, dispatch]);

  const errorMessage = useSelector((state) => state.restaurants.error);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('id', params.id);
    try {
      await dispatch(updateRestaurant(formData)).unwrap();
      navigate('/owner/home');
    } catch (error) {
      console.error('Failed to save the post: ', error);
    }
  };

  return (
    <>
      {restaurant && (
        <div className={styles.updateRestaurant}>
          <h2>Update your restaurant</h2>
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
              <Input
                id="name"
                name="name"
                placeholder="Enter restaurant name"
                type="text"
                defaultValue={restaurant.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address" className={styles.requiredField} tag="h4">
                Address:
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter restaurant address"
                type="text"
                defaultValue={restaurant.address}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.requiredField} tag="h4">
                Email
              </Label>
              <Input id="email" name="email" placeholder="Enter email" type="text" defaultValue={restaurant.email} />
            </FormGroup>
            <FormGroup>
              <Label for="phone_number" className={styles.requiredField} tag="h4">
                Phone number
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                placeholder="Enter phone number"
                type="text"
                defaultValue={restaurant.phone_number}
              />
            </FormGroup>
            <FormGroup>
              <Label for="delivery_fee" className={styles.requiredField} tag="h4">
                Delivery fee
              </Label>
              <Input
                id="delivery_fee"
                name="delivery_fee"
                placeholder="Enter delivery fee"
                type="text"
                defaultValue={restaurant.delivery_fee}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" tag="h4">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter description"
                type="text"
                defaultValue={restaurant.description}
              />
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
      )}
    </>
  );
};

export default UpdateRestaurant;
