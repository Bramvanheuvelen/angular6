import { Action } from "@ngrx/store";

import { Ingredients } from "../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT'

const initialState = {
  ingredients: [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatoes', 10)
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


