import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { GameModeComponent } from './game-mode/game-mode.component';
import {TestComponent} from './game-mode/test/test.component';

// Directives
import {AnimateHitObjectDirective} from './game-mode/animate-hit-object.directive';

const appRoutes: Routes = [
    {path: '', component: MainMenuComponent, pathMatch: 'full'},
    {path: 'Play', component: GameModeComponent, pathMatch: 'full'},
    {path: 'Page-Not-Found', component: PageNotFoundComponent},
    {path: '**', redirectTo: 'Page-Not-Found'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    GameModeComponent,
    PageNotFoundComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
