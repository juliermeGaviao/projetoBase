import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, SecurityContext } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BreadcrumbComponent } from './home/layout/breadcrumb/breadcrumb.component'
import { CustomValueAccessorDirective } from './directives/CustomValueAccessor.directives'
import { FooterComponent } from './home/layout/footer/footer.component'
import { HeaderComponent } from './home/layout/header/header.component'
import { HomeComponent } from './home/home.component'
import { MenuComponent } from './home/layout/menu/menu.component'
import { MessageComponent } from './shared/component/message/message.component'
import { HttpRequestInterceptor } from 'src/interceptor/HttpRequestInterceptor'
import { AuthService } from './services/auth.service'
import { DynamicTableComponent } from './shared/component/dynamic-table/dynamic-table.component'
import { WelcomeComponent } from './home/layout/welcome/welcome.component'

import { ListSectorComponent } from './home/component/management/sector/list-sector.component'
import { SectorComponent } from './home/component/management/sector/sector.component'
import { ListProductComponent } from './home/component/management/product/list-product.component'
import { ProductComponent } from './home/component/management/product/product.component'

@NgModule({
  declarations: [
    AppComponent,
    CustomValueAccessorDirective,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    MessageComponent,
    DynamicTableComponent,
    WelcomeComponent,
    ListSectorComponent,
    SectorComponent,
    ListProductComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          breaks: true,
          smartLists: true,
          smartypants: true,
          tables: true,
        },
      },
      sanitize: SecurityContext.NONE,
    })
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
