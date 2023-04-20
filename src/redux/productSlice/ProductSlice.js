import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../api/http";

const URL = "http://localhost:300/products";

const initialState = {
  product: [],
  reload: false,
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (product) => {
    try {
      const response = await axiosInstance.delete(`${URL}/${product}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    try {
      const response = await axiosInstance.post(`${URL}`, product);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    try {
      const response = await axiosInstance.put(`${URL}/${product.id}`, product);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
/*  EDIT PRICE & QUANTITY */
export const editPriceOrQuantity = createAsyncThunk(
  "products/editPriceOrQuantity",
  ({ id, newProduct }) => {
    return axiosInstance
      .patch(`${URL}/${id}`, {
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
      .then((res) => res.data);
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    //get data
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
    
    //delete product
    builder.addCase(deleteProduct.pending, (state) => {
      return { ...state };
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      return {
        ...state,
      };
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });

    // create product
    builder.addCase(createProduct.pending, (state) => {
      return { ...state };
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      return { ...state };
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });

    // update product
    builder.addCase(updateProduct.pending, (state) => {
      return { ...state };
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      return { ...state };
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      return { product: [], error: action.payload };
    });
  },
});
export default productSlice.reducer;
