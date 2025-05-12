import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  downOfIngredient,
  upOfIngredient,
  removeIngredient
} from '../../services/slice/constructorSlice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => dispatch(downOfIngredient(ingredient.id));
    const handleMoveUp = () => dispatch(upOfIngredient(ingredient.id));
    const handleClose = () => dispatch(removeIngredient(ingredient.id));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
