import { Action } from "@ngrx/store";

import { Ingredients } from "../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT'

const initialState = {
  ingredients: [
    new Ingredients('Appels', 5, 'stuks'),
    new Ingredients('Tomaten', 10, 'stuks')
  ]
}

export function shoppingListReducer(state, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients, action
        ]
      }
  }
  return state
}


