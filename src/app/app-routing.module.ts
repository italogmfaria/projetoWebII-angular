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
import { AuthGuard } from './guard/auth.guard';
import { LocacoesComponent } from './locacoes/locacoes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'painel', component: PainelComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' }},
  { path: 'sedes', component: SedesComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' }},
  { path: 'carros', component: CarrosComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' }},
  { path: 'aluguel-carro/:id', component: AluguelCarroComponent, canActivate: [AuthGuard]},
  { path: 'modelos', component: ModelosComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' }},
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' }},
  { path: 'histcarro', component: HistcarroComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' }},
  { path: 'locacoes', component: LocacoesComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' }},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

export const appRoutes = provideRouter(routes);
