import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RestaurantList from '../restaurant-list/RestaurantList';
import { Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '@redux/slices/restaurants';

const ListRestaurants = () => {
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const { restaurants } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantStatus === 'idle') {
      dispatch(fetchRestaurants());
    }
  }, [restaurantStatus, dispatch]);

  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate('/owner/restaurant/new');
  };

  return (
    <div className="restaurant-list">
      <div className="header">
        <h1>Restaurants</h1>
        <Button onClick={handleAddNewClick} type="button" color="primary">
          Add new
        </Button>
      </div>
      <div className="list">
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Description</th>
              <th>Delivery Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          {restaurants && <RestaurantList restaurants={restaurants} />}
        </Table>
      </div>
    </div>
  );
};

export default ListRestaurants;
