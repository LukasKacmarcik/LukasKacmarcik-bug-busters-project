import { useDispatch } from 'react-redux';
import { fetchRestaurants } from '../../Redux/slices/restaurants';
import { useEffect } from 'react';
import PreviewOfRestaurants from '../previewOfRestaurants/PreviewOfRestaurants';
import style from './customerHome.module.scss';

const CustomerHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className={style.list}>
      <PreviewOfRestaurants />
    </div>
  );
};

export default CustomerHome;
