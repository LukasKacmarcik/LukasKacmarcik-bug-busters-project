import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@axios/api';

const initialState = {
  status: 'idle',
  error: null,
  restaurants: [],
};

export const fetchRestaurants = createAsyncThunk('restaurant/fetchRestaurants', async () => {
  const response = await api.get('/restaurants');
  return response.data;
});

export const fetchOwnersRestaurants = createAsyncThunk('restaurant/fetchOwnersRestaurants', async () => {
  const response = await api.get('/owner/restaurants');
  return response.data;
});

export const addNewRestaurant = createAsyncThunk(
  'restaurants/addNewRestaurant',

  async (restaurantData) => {
    try {
      await api.post('/restaurant', restaurantData);
      const response = await api.get('/restaurants');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
);

export const updateRestaurant = createAsyncThunk(
  'restaurants/updateRestaurant',

  async (restaurantData) => {
    try {
      const id = restaurantData.get('id');
      await api.put(`/restaurant/${id}`, restaurantData);
      const response = await api.get('/restaurants');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
);

export const deleteRestaurant = createAsyncThunk('restaurants/deleteRestaurant', async (id) => {
  const response = await api.delete(`/restaurant/${id}`);

  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  const response2 = await api.get('/owner/restaurants');

  if (response2.statusText !== 'OK') {
    throw new Error(response2.data.message);
  }
  return response2.data;
});

export const fetchRestaurantOrders = createAsyncThunk('restaurants/fetchRestaurantOrders', async (restaurantId) => {
  const response = await api.get(`/restaurant/${restaurantId}/orders`);

  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  return response.data;
});

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRestaurants.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(fetchOwnersRestaurants.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchOwnersRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(fetchOwnersRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(addNewRestaurant.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewRestaurant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(addNewRestaurant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(updateRestaurant.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(deleteRestaurant.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(fetchRestaurantOrders.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurantOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchRestaurantOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default restaurantsSlice.reducer;
