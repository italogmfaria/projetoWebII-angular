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
import { ClientesComponent } from './clientes/clientes.component';
import { HistcarroComponent } from './histcarro/histcarro.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'painel', component: PainelComponent },
  { path: 'sedes', component: SedesComponent },
  { path: 'carros', component: CarrosComponent },
  { path: 'aluguel-carro', component: AluguelCarroComponent },
  { path: 'modelos', component: ModelosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'histcarro', component: HistcarroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

export const appRoutes = provideRouter(routes);
