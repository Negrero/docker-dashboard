import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ApiModule} from './models-docker/api.module';
import {HttpClientModule} from '@angular/common/http';
import { environment } from '../environments/environment';
import { BASE_PATH } from './models-docker';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule,  MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    ApiModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,  MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
    FormsModule
  ],
  exports: [MatCardModule, MatCheckboxModule],
  providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }],
  bootstrap: [AppComponent]
})
export class AppModule { }
