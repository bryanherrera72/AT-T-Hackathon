import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
const appRoutes: Routes = [
    {path: '', component: MainMenuComponent, pathMatch: 'full'}
    //{path: '**', redirectTo: 'Page-Not-Found'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
