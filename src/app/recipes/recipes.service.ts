import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A test recipe',
            'this is a test',
            'https://images.media-allrecipes.com/images/56589.png',
            [
                new Ingredients('Meat', 1),
                new Ingredients('French Fries', 20)
            ]),
        new Recipe(
            'Another test recipe',
            'this is a test',
            'https://images.media-allrecipes.com/images/56589.png',
            [
                new Ingredients('Buns', 2),
                new Ingredients('Meat', 20)
            ])
      ];

      constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
      return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredients[  ]) {
        this.slService.addIngredients(ingredients);
    }
}
