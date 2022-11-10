import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { addNewMeal } from '@redux/slices/meals';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './addMeal.module.scss';

const AddMeal = () => {
  const dispatch = useDispatch();
  const mealStatus = useSelector((state) => state.meals.status);
  const navigate = useNavigate();
  const urlParams = useParams();
  const errorMessage = useSelector((state) => state.meals.error);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('restaurant_id', `${urlParams.restaurantId}`);

    try {
      await dispatch(addNewMeal(formData)).unwrap();
      navigate(-1);
    } catch (error) {
      console.error('Failed to save the meal: ', error);
    }
  };

  return (
    <div className={styles.addMeal}>
      <h2>Add a new meal</h2>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <Form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="meal_name" className={styles.requiredField} tag="h4">
            Meal name
          </Label>
          <Input id="meal_name" name="meal_name" placeholder="Enter meal name" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="price" className={styles.requiredField} tag="h4">
            Price
          </Label>
          <Input id="price" name="price" placeholder="Enter price" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="image" className={styles.requiredField} tag="h4">
            Img
          </Label>
          <Input id="image" name="image" type="file" />
        </FormGroup>
        <p>Fields marked with * are mandatory to fill out.</p>
        <Button color="primary" disabled={mealStatus === 'loading'}>
          SUBMIT
        </Button>
      </Form>
    </div>
  );
};

export default AddMeal;
