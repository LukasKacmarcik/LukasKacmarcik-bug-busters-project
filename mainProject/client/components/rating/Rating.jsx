import React from 'react';
import star from '../../img/star-solid.svg';
import styles from './rating.module.scss';

// rating component to displays the rating for the order
export default function Rating(props) {
  return (
    <div className={styles.rating}>
      <img src={star} alt="star icon" />
      <p>
        <strong>{props.rating}</strong>/5 ({props.numberOfRatings}+)
      </p>
    </div>
  );
}
