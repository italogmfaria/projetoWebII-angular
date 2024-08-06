import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarrosComponent } from './carros/carros.component';
import { CarroService } from './services/carro.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CarrosComponent
  ],
  providers: [CarroService],
  bootstrap: []
})
export class AppModule { }
