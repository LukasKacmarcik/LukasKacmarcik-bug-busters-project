import React from 'react';
import styles from './mealCardCustomer.module.scss';
import { useDispatch } from 'react-redux';
import { addToCart, getTotals } from '@redux/slices/cart';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

export default function MealCardCustomer(props) {
  const shortendName = props.meal_name.slice(0, 19) + ' ...';

  const dispatch = useDispatch();

  const handleAddToCart = (meal) => {
    dispatch(addToCart(meal));
    dispatch(getTotals());
  };

  return (
    <div className={styles.card}>
      <Card>
        <img
          alt={props.meal_name.length < 19 ? props.meal_name : shortendName}
          src={`http://localhost:3001/meals/${props.img_url}`}
          height={240}
          width="100%"
          style={{ objectFit: 'cover', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
        />
        <CardBody>
          <CardTitle className={styles.cardTitle} tag="h5">
            {props.meal_name.length < 19 ? props.meal_name : shortendName}
          </CardTitle>
          <CardText className={styles.cardDesc} tag="h6">
            {`${props.price} €`}
          </CardText>
          <Button onClick={() => handleAddToCart(props)} color="success" outline>
            Add this meal
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
