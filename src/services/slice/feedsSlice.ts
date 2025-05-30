import { getFeedsApi, getOrderByNumberApi, TOrderResponse } from '@api';
import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export type FeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  orderByNumber: TOrderResponse | null;
  error: string | null;
};

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  orderByNumber: null,
  error: null
};

export const fetchFeeds = createAsyncThunk('feeds/all', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderById',
  async (currentNumber: number) =>
    getOrderByNumberApi(currentNumber).then((data) => data)
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderByNumber = action.payload;
      });
  }
});

export default feedsSlice.reducer;
export const getFeeds = (state: RootState): FeedsState => state.feeds;
export const getOrderByNumberSelector = createSelector(
  [getFeeds],
  (state) => state.orderByNumber?.orders[0]
);
