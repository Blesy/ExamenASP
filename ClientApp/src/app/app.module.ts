import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CapturaComponent } from './captura/captura.component';
import { ListaComponent } from './lista/lista.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { DocumentosComponent } from './documentos/documentos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CapturaComponent,
    ListaComponent,
    EvaluacionComponent,
    DocumentosComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CapturaComponent, pathMatch: 'full' },
      { path: 'lista', component: ListaComponent },
      { path: 'evaluacion/:id', component: EvaluacionComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
