import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantOrders } from '@redux/slices/restaurants';
import { useParams } from 'react-router-dom';

const ListOfOrders = () => {
  const urlParams = useParams();
  const restaurantOrders = useSelector((state) => state.restaurants.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurantOrders(urlParams.id));
  }, [dispatch, urlParams]);

  return (
    restaurantOrders && (
      <>
        <h3>List of restaurants orders</h3>
        <Table hover>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER ID</th>
            </tr>
          </thead>
          <tbody className="restaurant-list">
            {restaurantOrders.map((order) => (
              <tr className="rows" key={order.orders_id}>
                <td>{order.orders_id}</td>
                <td>{order.user_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  );
};

export default ListOfOrders;
