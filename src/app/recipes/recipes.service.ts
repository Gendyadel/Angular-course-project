import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Schnitzel',
      'Super tasty - just awsome',
      'https://media.istockphoto.com/photos/schnitzel-and-fried-potatoes-picture-id603258520?s=612x612',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 25)]
    ),
    new Recipe(
      'Burger',
      'Juicy Burger',
      'https://st4.depositphotos.com/16846226/20843/i/950/depositphotos_208430430-stock-photo-fresh-burger-isolated.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Oninon rings', 2),
      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.slice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }
}
