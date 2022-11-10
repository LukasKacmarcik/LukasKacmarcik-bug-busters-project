import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem, resetMessages } from "../../../Redux/slices/items";

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img_url, setImg_url] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    addItemNameError,
    addItemDescriptionError,
    addItemImageUrlError,
    addItemPriceError,
  } = useSelector((state) => state.items.messages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      description: description,
      img_url: img_url,
      price: price,
    };

    try {
      await dispatch(addNewItem(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to save the item: ", error);
    }
  };

  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  return (
    <div className={styles.addItemForm}>
      <h2>AddItem</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name" className={styles.requiredField} tag="h4">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Please enter your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {addItemNameError &&
            addItemNameError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </FormGroup>
        <FormGroup>
          <Label for="description" className={styles.requiredField} tag="h4">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            placeholder="Please enter your description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {addItemDescriptionError &&
            addItemDescriptionError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </FormGroup>
        <FormGroup>
          <Label for="img_url" className={styles.requiredField} tag="h4">
            Image Url
          </Label>
          <Input
            id="img_url"
            name="img_url"
            placeholder="Please enter your img_url"
            type="text"
            value={img_url}
            onChange={(e) => setImg_url(e.target.value)}
          />
          {addItemImageUrlError &&
            addItemImageUrlError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </FormGroup>
        <FormGroup>
          <Label for="price" className={styles.requiredField} tag="h4">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            placeholder="Please enter your price"
            type="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {addItemPriceError &&
            addItemPriceError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </FormGroup>
        <p>Fields marked with * are mandatory to fill out.</p>
        <Button color="primary">SUBMIT</Button>
      </Form>
    </div>
  );
}
