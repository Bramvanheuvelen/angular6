import { Ingredients } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public personen: number;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredients[];

    constructor(name: string, personen: number, desc: string, imagePath: string, ingredients: Ingredients[]) {
        this.name = name;
        this.personen = personen;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
