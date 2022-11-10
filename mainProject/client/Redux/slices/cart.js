import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@axios/api';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const sendOrder = createAsyncThunk('cart/sendOrder', async (orderData) => {
  try {
    const response = await api.post('/order/new', orderData);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex((item) => item.meal_id === action.payload.meal_id);
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info(`Increased ${action.payload.meal_name} quantity`, {
          position: 'bottom-left',
        });
      } else {
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success(`${action.payload.meal_name} added to cart`, {
          position: 'bottom-left',
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.meal_id === action.payload.meal_id);

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`Decreased ${action.payload.meal_name} quantity`, {
          position: 'bottom-left',
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter((item) => item.meal_id !== action.payload.meal_id);

        state.cartItems = nextCartItems;

        toast.error(`${action.payload.meal_name} removed from cart`, {
          position: 'bottom-left',
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.meal_id === action.payload.meal_id) {
          const nextCartItems = state.cartItems.filter((item) => item.meal_id !== cartItem.meal_id);

          state.cartItems = nextCartItems;

          toast.error(`${action.payload.meal_name} removed from cart`, {
            position: 'bottom-left',
          });
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.error('Cart cleared', { position: 'bottom-left' });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.cartItems.length === action.payload.count) {
          toast.success(`Your order was sent`, {
            position: 'bottom-left',
          });
          state.cartItems = [];
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        } else {
          toast.error(`Something went wrong with your order`, {
            position: 'bottom-left',
          });
        }
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
