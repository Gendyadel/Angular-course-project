import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private _userSub?: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user; // !user ? true : false
        console.log(!user);
        console.log(!!user);
      }
    );
  }
  saveRecipe() {
    this.dataStorageService.storeRecipes();
  }
  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  logout() {
    this.authService.logout();
    
  }
  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
  }
}
