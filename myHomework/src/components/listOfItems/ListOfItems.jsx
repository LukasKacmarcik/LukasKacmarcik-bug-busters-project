import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import ItemCard from "../itemCard/ItemCard";

export default function ListOfItems() {
  const itemsForSale = useSelector((state) => state.items.items)
    .filter((i) => i.buyer_id === null)
    .map((item) => (
      <Col sm="2" key={item.id}>
        <ItemCard {...item} />
      </Col>
    ));
  return (
    <>
      <Container fluid>
        <Row>{itemsForSale && itemsForSale}</Row>
      </Container>
    </>
  );
}
