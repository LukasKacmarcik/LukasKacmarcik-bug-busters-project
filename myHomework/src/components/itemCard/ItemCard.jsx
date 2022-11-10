import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import styles from "./ItemCard.module.scss";

export default function ItemCard(props) {
  const navigate = useNavigate();

  const shortendName = props.name.slice(0, 19) + " ...";

  return (
    <div className={styles.card} onClick={() => navigate(`/item/${props.id}`)}>
      <Card>
        <img
          alt={props.name.length < 19 ? props.name : shortendName}
          src={`${props.img_url}`}
          height={240}
          width="100%"
          style={{
            objectFit: "cover",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        />
        <CardBody>
          <CardTitle className={styles.cardTitle} tag="h5">
            {props.name.length < 19 ? props.name : shortendName}
          </CardTitle>
          <CardText className={styles.cardDesc} tag="h6">
            {`${props.price} €`}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}
