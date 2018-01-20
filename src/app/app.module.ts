import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
// <<<<<<< HEAD
import { GameModeComponent } from './game-mode/game-mode.component';
// =======
import { TestComponent } from './test/test.component';
// >>>>>>> 0b8964c6fab98e3f7ce36657deb267d9661cb819
const appRoutes: Routes = [
    {path: '', component: MainMenuComponent, pathMatch: 'full'},
    {path: 'Play', component: GameModeComponent, pathMatch: 'full'}
    //{path: '**', redirectTo: 'Page-Not-Found'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
// <<<<<<< HEAD
    GameModeComponent,
// =======
    TestComponent
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
