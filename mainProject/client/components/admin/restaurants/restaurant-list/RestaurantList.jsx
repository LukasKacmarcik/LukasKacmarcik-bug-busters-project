import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { deleteRestaurant } from '@redux/slices/restaurants';
import { useNavigate } from 'react-router-dom';
import styles from './restaurantsList.module.scss';

const RestaurantList = ({ restaurants }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePreviewClick = (item) => {
    navigate(`/owner/restaurant/${item.id}/?name=${item.name}`);
  };

  const handleEditClick = (id) => {
    navigate(`/owner/restaurant/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRestaurant(id));
    } catch (error) {
      console.error('Failed to delete restaurant: ', error);
    }
  };

  return (
    <tbody className="restaurant-list">
      {restaurants.map((item) => (
        <tr className={styles.rows} key={item.id}>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.email}</td>
          <td>{item.phone_number}</td>
          <td>
            <Button onClick={() => handlePreviewClick(item)} color="success" outline size="sm">
              <i className="fas fa-eye" />
              &nbsp; View meals
            </Button>
            <Button onClick={() => handleEditClick(item.id)} color="success" outline size="sm">
              <i className="fas fa-pencil-alt" />
              &nbsp; Edit restaurant
            </Button>
            <Button onClick={() => handleDelete(item.id)} color="danger" outline size="sm">
              <i className="fas fa-trash-alt" />
              &nbsp; Delete restaurant
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default RestaurantList;
