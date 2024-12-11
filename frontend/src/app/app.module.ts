import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { AppComponent } from './app.component'
import { CustomValueAccessorDirective } from './directives/CustomValueAccessor.directives'
import { BreadcrumbComponent } from './home/layout/breadcrumb/breadcrumb.component'
import { FooterComponent } from './home/layout/footer/footer.component'
import { MenuComponent } from './home/layout/menu/menu.component'
import { FilterPipePipe } from './pipes/FilterPipe.pipe'
import { LoginComponent } from './security/components/login/login.component'
import { PageErrorComponent } from './shared/component/page-error/page-error.component'
import { HttpRequestInterceptor } from 'src/interceptor/HttpRequestInterceptor'
import { AppRoutingModule } from './app-routing.module'
import { HeaderComponent } from './home/layout/header/header.component'
import { HomeComponent } from './home/home.component'
import { AuthService } from './services/auth.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageErrorComponent,
    BreadcrumbComponent,
    FooterComponent,
    MenuComponent,
    CustomValueAccessorDirective,
    FilterPipePipe,
    HeaderComponent,
    HomeComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
