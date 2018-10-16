import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';


@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

    storeRecipes() {
      const token = this.authService.getToken();
      const uid = this.authService.getUid();

      return this.httpClient.put(`https://recipes-98a88.firebaseio.com/${uid}/recipes.json?auth=` + token, this.recipeService.getRecipes());
    }

    getRecipes() {
      const token = this.authService.getToken();
      const uid = this.authService.getUid();

      this.httpClient.get<Recipe[]>(`https://recipes-98a88.firebaseio.com/${uid}/recipes.json?auth=` + token)
        .map(
          (recipes) => {
            for (let recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
          }
        );
    }

    storeIngredients() {
      const token = this.authService.getToken();
      const uid = this.authService.getUid();

      return this.httpClient.put(`https://recipes-98a88.firebaseio.com/${uid}/recipes.ingredients.json?auth=` + token, this.recipeService.getRecipes());
    }
}
