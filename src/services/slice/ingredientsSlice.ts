// slices/ingredientsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { RootState } from '../store';

export type IngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIsLoading: (state) => state.isLoading,
    getItems: (state: IngredientsState) => state.items,
    getBuns: (state: IngredientsState) => state.items.filter(item => item.type === 'bun'),
    getMains: (state: IngredientsState) => state.items.filter(item => item.type === 'main'),
    getSauces: (state: IngredientsState) => state.items.filter(item => item.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        console.log('Loaded ingredients:', action.payload);
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default ingredientsSlice.reducer;
export const getState = (state: RootState): IngredientsState => state.ingredients;
export const { getIsLoading, getBuns, getMains, getSauces, getItems } = ingredientsSlice.selectors;
console.log('ingredientsReducer:', getState);