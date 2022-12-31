import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-added.component.html',
  styleUrls: ['./recipe-added.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private roouter: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngriedient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        recipe.ingredients.forEach((element) => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(element.name, Validators.required),
              amount: new FormControl(element.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
  onCancel() {
    this.roouter.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
