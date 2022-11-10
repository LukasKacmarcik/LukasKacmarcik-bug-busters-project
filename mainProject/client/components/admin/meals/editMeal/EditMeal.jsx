import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import styles from './editMeal.module.scss';
import { editMeal, fetchMealsOfRestaurant } from '@redux/slices/meals';

const EditMeal = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const dispatch = useDispatch();
  const mealStatus = useSelector((state) => state.meals.status);
  const errorMessage = useSelector((state) => state.meals.error);

  useEffect(() => {
    if (mealStatus === 'idle') {
      dispatch(fetchMealsOfRestaurant(urlParams.restaurantId));
    }
  }, [mealStatus, dispatch, urlParams]);

  const meal = useSelector((state) => state.meals.meals).filter((m) => m.meal_id === parseInt(urlParams.mealId))[0];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('id', urlParams.mealId);
    formData.append('restaurant_id', meal.restaurant_id);

    try {
      await dispatch(editMeal(formData)).unwrap();
      navigate(-1);

      // redirects back to the restaurant list
    } catch (error) {
      console.error('Failed to update meal: ', error);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {meal && (
        <div className={styles.editMeal}>
          <h2>Edit meal</h2>
          <Form encType="multipart/form-data" onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="meal_name" className={styles.requiredField} tag="h4">
                Meal name
              </Label>
              <Input
                id="meal_name"
                name="meal_name"
                placeholder="Enter meal name"
                type="text"
                defaultValue={meal.meal_name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price" className={styles.requiredField} tag="h4">
                Price
              </Label>
              <Input id="price" name="price" placeholder="Enter price" type="text" defaultValue={meal.price} />
            </FormGroup>
            <FormGroup>
              <Label for="image" className={styles.requiredField} tag="h4">
                Image
              </Label>
              <Input id="image" name="image" type="file" />
            </FormGroup>
            <p>Fields marked with * are mandatory to fill out.</p>
            <Button color="primary">SUBMIT</Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditMeal;
