import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Container, Row, Col } from 'reactstrap';
import { fetchMeals } from '@redux/slices/meals';
import MealCardOwner from '../mealCardOwner/MealCardOwner';

export default function ListMeals(props) {
  const dispatch = useDispatch();
  const mealStatus = useSelector((state) => state.meals.status);
  const { meals } = useSelector((state) => state.meals);

  useEffect(() => {
    if (mealStatus === 'idle') {
      dispatch(fetchMeals());
    }
  }, [mealStatus, dispatch]);

  const allMeals = meals.map((meal) => {
    return (
      <Col sm="2" key={meal.meal_id} id={meal.meal_id}>
        <MealCardOwner {...meal} />
      </Col>
    );
  });
  return (
    <div className="mealList">
      <Container fluid>
        <Row>{allMeals}</Row>
      </Container>
    </div>
  );
}
