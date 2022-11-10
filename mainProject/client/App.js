import CustomerHome from './components/customerHome/CustomerHome';
import { Route, Routes, Navigate } from 'react-router-dom';
import ListRestaurants from './components/admin/restaurants/listRestaurants/ListRestaurants';
import AddRestaurant from './components/admin/restaurants/addRestaurant/AddRestaurant';
import UpdateRestaurant from './components/admin/restaurants/updateRestaurant/UpdateRestaurant';
import ListMeals from './components/admin/meals/listMeals/ListMeals';
import AddMeal from './components/admin/meals/addMeal/AddMeal';
import RegistrationForm from './components/forms/regform/RegistrationForm';
import EditMeal from './components/admin/meals/editMeal/EditMeal';
import Layout from './components/layout/Layout';
import Unauthorized from './components/unauthorized/Unauthorized';
import RequireAuth from './components/requireAuth/RequireAuth';
import OwnerHome from './components/owner/ownerHome/OwnerHome';
import RestaurantMainCustomers from './components/restaurantMainCustomer/RestaurantMainCustomer';
import RestaurantMainOwner from './components/restaurantMainOwner/RestaurantMainOwner';
import Cart from './components/cart/Cart';
import { useSelector } from 'react-redux';
import React from 'react';

// main component of the app to render
function App() {
  const userRole = useSelector((state) => state.session.role);
  const sessionStatus = useSelector((state) => state.session.status);

  return (
    (sessionStatus === 'succeeded' || sessionStatus === 'failed') && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={userRole === 'Owner' ? <Navigate to="/owner/home" /> : <Navigate to="/customer/home" />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route element={<RequireAuth allowedRoles={['Customer', 'notLoggedIn']} />}>
            <Route path="/customer/home" element={<CustomerHome />} />
            <Route path="/restaurant/:id" element={<RestaurantMainCustomers />} />
            <Route path="/customer/restaurant/:id" element={<RestaurantMainOwner />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['Owner']} />}>
            <Route path="/" element={<OwnerHome />} />
            <Route path="/owner/home" element={<OwnerHome />} />
            <Route path="/owner/restaurant/:id" element={<RestaurantMainOwner />} />
            <Route path="/owner/restaurant/new" element={<AddRestaurant />} />
            <Route path="/owner/restaurant/:id/edit" element={<UpdateRestaurant />} />
            <Route path="/owner/meals/:restaurantId/new" element={<AddMeal />} />
            <Route path="/owner/meals/:mealId/:restaurantId/edit" element={<EditMeal />} />
          </Route>
          <Route path="/admin/restaurants" element={<ListRestaurants />} />
          <Route path="/admin/meals" element={<ListMeals />} />
        </Route>
      </Routes>
    )
  );
}

export default App;
