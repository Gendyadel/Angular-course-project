import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() index!: number;
  
  constructor() {}

  ngOnInit() {}
}
