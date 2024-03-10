import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ApiService } from './app/services/api.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), ApiService,  provideAnimations(), provideToastr(), importProvidersFrom(HttpClientModule, FormsModule, ReactiveFormsModule), importProvidersFrom([BrowserAnimationsModule])]
}).catch(err => console.error(err));