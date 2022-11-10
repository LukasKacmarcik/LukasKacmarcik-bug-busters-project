import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchMealsOfRestaurant } from '@redux/slices/meals';
import { Container, Row, Col } from 'reactstrap';
import MealCardCustomer from '../admin/meals/mealCardCustomer/MealCardCustomer';
import style from './RestaurantMainCustomer.module.scss';

export default function RestaurantMainOwner(props) {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.meals);
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const mealStatus = useSelector((state) => state.meals.status);

  const allMeals = meals.map((meal) => {
    return (
      <Col sm="2" key={meal.meal_id} id={meal.meal_id}>
        <MealCardCustomer {...meal} />
      </Col>
    );
  });

  useEffect(() => {
    dispatch(fetchMealsOfRestaurant(urlParams.id));
  }, [dispatch, urlParams]);

  return (
    mealStatus === 'succeeded' && (
      <div className={style.restaurantView}>
        <h1>{name}</h1>
        <div className="mealList">
          <Container fluid>
            <Row>{allMeals}</Row>
          </Container>
        </div>
      </div>
    )
  );
}
