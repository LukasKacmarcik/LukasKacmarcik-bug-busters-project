import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import styles from './restaurantCard.module.scss';
import DeliveryFee from '../deliveryFee/DeliveryFee';

export default function RestaurantCard(props) {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/restaurant/${props.id}/?name=${props.name}`);
  };

  const shortendName = props.name.slice(0, 19) + ' ...';

  return (
    <div className={styles.restaurantCard} onClick={redirect}>
      <Card className={styles.card}>
        <img alt="restaurant" src={`http://localhost:3001/restaurant/${props.img_url}`} />
        <CardBody>
          <CardTitle className={styles.cardTitle} tag="h5">
            {props.name.length < 19 ? props.name : shortendName}
          </CardTitle>
          <CardText className={styles.cardDesc}>{props.description}</CardText>
          <CardText tag={DeliveryFee} deliveryFee={`${props.delivery_fee} €`} />
        </CardBody>
      </Card>
    </div>
  );
}
