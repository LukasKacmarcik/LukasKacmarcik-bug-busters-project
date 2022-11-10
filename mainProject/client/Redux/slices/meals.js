import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@axios/api';

const initialState = {
  status: 'idle',
  error: null,
  meals: [],
};

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
  const response = await api.get('/meals');
  return response.data;
});

export const fetchMealsOfRestaurant = createAsyncThunk('meals/fetchMealsOfRestaurant', async (restaurantId) => {
  const response = await api.get(`/meals/${restaurantId}`);
  return response.data;
});

export const addNewMeal = createAsyncThunk('meals/addNewMeal', async (mealData) => {
  try {
    await api.post('/meal', mealData);
    const response = await api.get('/meals');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const editMeal = createAsyncThunk('meals/editMeal', async (mealData) => {
  try {
    const mealId = mealData.get('id');
    await api.put(`/meal/${mealId}`, mealData);
    const response = await api.get('/meals');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteMeal = createAsyncThunk('meals/deleteMeal', async ([mealId, restaurantId]) => {
  const response = await api.delete(`/meal/${mealId}`);

  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  const response2 = await api.get(`/meals/${restaurantId}`);

  if (response2.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  return response2.data;
});

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMeals.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(fetchMealsOfRestaurant.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMealsOfRestaurant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meals = action.payload;
      })
      .addCase(fetchMealsOfRestaurant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(addNewMeal.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewMeal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meals = action.payload;
      })
      .addCase(addNewMeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(editMeal.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(editMeal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meals = action.payload;
      })
      .addCase(editMeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(deleteMeal.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meals = action.payload;
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mealsSlice.reducer;
