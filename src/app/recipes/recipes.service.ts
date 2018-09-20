import { Recipe } from './recipes.model';
import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

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

setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
      return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredients[  ]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
