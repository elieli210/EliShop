import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:300/orders";
const URL_delivered = "http://localhost:300/orders?delivered=true";
const URL_notdelivered = "http://localhost:300/orders?delivered=false";

const initialState = {
  order: [],
};

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getDeliveredOrder = createAsyncThunk(
  "order/getOrder",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(URL_delivered);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getNotDeliveredOrder = createAsyncThunk(
  "order/getOrder",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(URL_notdelivered);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    try {
      const response = await axios.post(`${URL}`, order);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    try {
      const response = await axios.patch(`${URL}/${order.id}`, order);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const addOrders = createAsyncThunk(
  "orders/addOrders",
  async (clientData) => {
    try {
      const response = await axios.post(`${URL}`, clientData);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    ///////create
    builder.addCase(createOrder.pending, (state) => {
      return { ...state };
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      return { ...state };
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    //////update
    builder.addCase(updateOrder.pending, (state) => {
      return { ...state };
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      return { ...state };
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      return { order: [], error: action.payload };
    });
    ///// add orders
    builder.addCase(addOrders.fulfilled, (state, action) => {
      state.order = action.payload;
      localStorage.clear();
      state.error = "";
    });
    builder.addCase(addOrders.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});
export default orderSlice.reducer;
