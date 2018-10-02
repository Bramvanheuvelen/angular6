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

      return this.httpClient.put('https://recipes-98a88.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
      const token = this.authService.getToken();

      this.httpClient.get<Recipe[]>('https://recipes-98a88.firebaseio.com/recipes.json?auth=' + token)
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
}
