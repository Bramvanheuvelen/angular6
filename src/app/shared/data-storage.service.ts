import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';
import { map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

    storeRecipes() {
      const token = this.authService.getToken();
      return this.http.put('https://recipebook-2280d.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
      const token = this.authService.getToken();
      this.http.get('https://recipebook-2280d.firebaseio.com/recipes.json?auth=' + token)
        .map(
          (response: Response) => {
            const recipes: Recipe[] = response.json();
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
