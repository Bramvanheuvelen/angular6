import { Recipe } from './recipes.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'this is a test', 'https://images.media-allrecipes.com/images/56589.png'),
        new Recipe('Another test recipe', 'this is a test', 'https://images.media-allrecipes.com/images/56589.png')
      ];

    getRecipes() {
        return this.recipes.slice();
    }
}
