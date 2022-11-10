import ListOwnersRestaurants from '../listOwnersRestaurants/ListOwnersRestaurants';
import { fetchOwnersRestaurants } from '@redux/slices/restaurants';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function OwnerHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnersRestaurants());
  }, [dispatch]);

  return (
    <div>
      <ListOwnersRestaurants />
    </div>
  );
}

export default OwnerHome;
