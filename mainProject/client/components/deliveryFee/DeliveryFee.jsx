import React from 'react';
import './deliveryFee.module.scss';

// deliveryFee component to displays the delivery fee for the order
export default function DeliveryFee(props) {
  return (
    <div className="deliveryFee">
      <p>
        <strong>{props.deliveryFee}</strong> {' Delivery fee'}
      </p>
    </div>
  );
}
