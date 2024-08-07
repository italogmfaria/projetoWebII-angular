import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PainelComponent } from './painel/painel.component';
import { SedesComponent } from './sedes/sedes.component';
import { CarrosComponent } from './carros/carros.component';
import { AluguelCarroComponent } from './aluguel-carro/aluguel-carro.component';
import { ModelosComponent } from './modelos/modelos.component';
import { HistmanutComponent } from './histmanut/histmanut.component';
import { HistcarroComponent } from './histcarro/histcarro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'painel', component: PainelComponent },
  { path: 'sedes', component: SedesComponent },
  { path: 'carros', component: CarrosComponent },
  { path: 'aluguel-carro', component: AluguelCarroComponent },
  { path: 'modelos', component: ModelosComponent },
  { path: 'histmanut', component: HistmanutComponent },
  { path: 'histcarro', component: HistcarroComponent },
];

export const appRoutes = provideRouter(routes);
