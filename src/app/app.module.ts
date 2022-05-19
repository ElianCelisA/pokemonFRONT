import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { PokemonCreateComponent } from './components/pokemon-create/pokemon-create.component';
import { PokemonUpdateComponent } from './components/pokemon-update/pokemon-update.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PokemonUploadComponent } from './components/pokemon-upload/pokemon-upload.component';
import { FooterComponent } from './components/footer/footer.component';


const routes:Routes = [
  {path: '', component:PokemonListComponent},
  {path: 'pokemon-create', component:PokemonCreateComponent},
  {path: 'pokemon-update/:id', component:PokemonUpdateComponent},
  {path: 'pokemon-detail/:id', component:PokemonDetailComponent},
  {path: 'pokemon-upload/:id', component:PokemonUploadComponent},
  {path: '**', component:NotfoundComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    HeaderComponent,
    MainComponent,
    PokemonCreateComponent,
    PokemonUpdateComponent,
    PokemonDetailComponent,
    NotfoundComponent,
    PokemonUploadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
