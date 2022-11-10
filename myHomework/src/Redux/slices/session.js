import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";

const initialState = {
  id: null,
  status: "idle",
  username: null,
  buyerName: null,
  sellerName: null,
  messages: {},
};

export const fetchCurrentUser = createAsyncThunk(
  "session/fetchCurrentUser",
  async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
);

export const fetchMoney = createAsyncThunk("session/fetchMoney", async () => {
  try {
    const response = await api.patch("/user/addMoney");
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const fetchUsernamesByIds = createAsyncThunk(
  "session/fetchUsernameById",
  async ([sellerId, buyerId]) => {
    let usersNames = {};
    try {
      const responseSeller = await api.get(`/user/${sellerId}`);
      usersNames.sellerName = responseSeller.data.username;
    } catch (err) {
      throw new Error(err.response.data.message);
    }

    if (buyerId === null) {
      usersNames.buyerName = null;
    } else {
      try {
        const responseBuyer = await api.get(`/user/${buyerId}`);
        usersNames.buyerName = responseBuyer.data.username;
      } catch (err) {
        throw new Error(err.response.data.message);
      }
    }
    return usersNames;
  }
);

export const registerUser = createAsyncThunk(
  "session/registerUser",
  async (userData) => {
    try {
      const response = await api.post("/signup", userData);
      // if (response.statusText !== "Created") {
      //   throw new Error(response.data.message);
      // }
      window.localStorage.setItem("jwt", `${response.data.accessToken}`);
      const response2 = await api.get("/user");
      return response2.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const loginUser = createAsyncThunk(
  "session/loginUser",
  async (userData) => {
    try {
      const response = await api.post("/login", userData);
      // if (response.statusText !== "Created") {
      //   throw new Error(response.data.message);
      // }
      window.localStorage.setItem("jwt", `${response.data.accessToken}`);

      const response2 = await api.get("/user");
      return response2.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logOut(state, action) {
      localStorage.removeItem("jwt");
      state.cash = null;
      state.username = null;
      state.id = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = action.payload.username;
        state.id = action.payload.userId;
        state.cash = action.payload.cash;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.messages = [{ message: action.error.message, type: "error" }];
      });
    builder
      .addCase(fetchUsernamesByIds.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsernamesByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buyerName = action.payload.buyerName;
        state.sellerName = action.payload.sellerName;
      })
      .addCase(fetchUsernamesByIds.rejected, (state, action) => {
        state.status = "failed";
        state.messages = [{ message: action.error.message, type: "error" }];
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.userId;
        state.username = action.payload.username;
        state.cash = action.payload.cash;
        state.messages = {};
        toast.success(`You have successfully registered as ${state.username}`, {
          position: "bottom-left",
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
        toast.error(`You failed to register`, {
          position: "bottom-left",
        });
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.userId;
        state.username = action.payload.username;
        state.cash = action.payload.cash;
        state.messages = {};
        toast.success(`You have successfully logged in as ${state.username}`, {
          position: "bottom-left",
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
        toast.error(`You failed to log in`, {
          position: "bottom-left",
        });
      });
  },
});

export const { logOut } = sessionSlice.actions;

export default sessionSlice.reducer;
