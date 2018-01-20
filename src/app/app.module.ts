import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
// <<<<<<< HEAD
import { GameModeComponent } from './game-mode/game-mode.component';
// =======
// >>>>>>> 0b8964c6fab98e3f7ce36657deb267d9661cb819
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
// <<<<<<< HEAD
    GameModeComponent,
    PageNotFoundComponent
// =======
// >>>>>>> 0b8964c6fab98e3f7ce36657deb267d9661cb819
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
