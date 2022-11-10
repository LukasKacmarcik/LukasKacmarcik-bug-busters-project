import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RestaurantList from '../../admin/restaurants/restaurant-list/RestaurantList';
import { Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnersRestaurants } from '@redux/slices/restaurants';
import styles from './ListOwnersRestaurants.module.scss';

const ListOwnersRestaurants = () => {
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const { restaurants } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantStatus === 'idle') {
      dispatch(fetchOwnersRestaurants());
    }
  }, [restaurantStatus, dispatch]);

  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate('/owner/restaurant/new');
  };

  return (
    <div className={styles.ListOwnersRestaurants}>
      <header>
        <h2>Restaurants</h2>
        <div>
          <Button onClick={handleAddNewClick} type="button" color="success" outline>
            Add new restaurant
          </Button>
        </div>
      </header>
      <div className={styles.list}>
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th />
            </tr>
          </thead>
          {restaurants && <RestaurantList restaurants={restaurants} />}
        </Table>
      </div>
    </div>
  );
};

export default ListOwnersRestaurants;
