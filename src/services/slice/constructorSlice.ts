import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

type TConstructorSlice = {
  constructorBun: TConstructorIngredient | null;
  constructorIngredients: TConstructorIngredient[];
};

export const initialState: TConstructorSlice = {
  constructorBun: null,
  constructorIngredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...item } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorBun = action.payload)
          : state.constructorIngredients.push(action.payload);
        console.log(action.payload._id);
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.id !== action.payload
      );
    },
    upOfIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.constructorIngredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.constructorIngredients.splice(
        ingredientIndex,
        1
      );

      state.constructorIngredients.splice(ingredientIndex - 1, 0, ingredient);
    },
    downOfIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.constructorIngredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.constructorIngredients.splice(
        ingredientIndex,
        1
      );

      state.constructorIngredients.splice(ingredientIndex + 1, 0, ingredient);
    },
    resetConstructor: (state: TConstructorSlice) => {
      state.constructorIngredients = [];
      state.constructorBun = null;
    }
  }
});

const constructorSliceSelectors = (state: RootState) => state.constructorItems;

export const getConstructorIngredients = createSelector(
  [constructorSliceSelectors],
  (state) => state.constructorIngredients
);
export const getConstructorBun = createSelector(
  [constructorSliceSelectors],
  (state) => state.constructorBun
);

export const {
  addIngredient,
  removeIngredient,
  upOfIngredient,
  downOfIngredient,
  resetConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
