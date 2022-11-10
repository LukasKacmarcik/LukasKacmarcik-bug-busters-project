import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";
import styles from "./ItemMain.module.scss";
import {
  fetchCurrentUser,
  fetchUsernamesByIds,
} from "../../../Redux/slices/session";
import { buyItem, resetMessages } from "../../../Redux/slices/items";
import { toast } from "react-toastify";

export default function ItemMain() {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const currentItem = useSelector((state) => state.items.items).find(
    (i) => i.id === urlParams.id
  );
  const userId = useSelector((state) => state.session.id);
  const { buyItemErrors } = useSelector((state) => state.items.messages);
  const sellerName = useSelector((state) => state.session.sellerName);
  const buyerName = useSelector((state) => state.session.buyerName);

  const handleBuy = async () => {
    if (userId) {
      try {
        await dispatch(buyItem(currentItem.id)).unwrap();
        await dispatch(fetchCurrentUser()).unwrap();
      } catch (err) {
        console.error("Failed to buy the item: ", err);
      }
    } else {
      toast.error(`Log in before purchasing.`, {
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    dispatch(resetMessages());
    if (currentItem) {
      dispatch(
        fetchUsernamesByIds([currentItem.owner_id, currentItem.buyer_id])
      );
    }
  }, [dispatch, currentItem]);

  return currentItem ? (
    <div className={styles.itemMain}>
      <div className={styles.imageContainer}>
        <img
          height={240}
          width="100%"
          style={{
            objectFit: "cover",
            borderRadius: "5px",
          }}
          src={currentItem.img_url}
          alt="item"
        />
      </div>
      <div className={styles.itemInfo}>
        <h2>Name: {currentItem.name}</h2>
        <p>Description: {currentItem.description}</p>
        <h4>Price: {currentItem.price}</h4>
        <h4>Sellername: {sellerName}</h4>
        {buyerName && <h4>Buyername: {buyerName}</h4>}
      </div>
      <Button size="lg" color="success" outline onClick={handleBuy}>
        BUY
      </Button>
      {buyItemErrors && <h5 style={{ color: "red" }}>{buyItemErrors}</h5>}
    </div>
  ) : (
    <h1>Item not found</h1>
  );
}
