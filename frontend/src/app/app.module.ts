import { HttpClient, HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, SecurityContext } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BreadcrumbComponent } from './home/layout/breadcrumb/breadcrumb.component'
import { CookiebarComponent } from './shared/component/cookiebar/cookiebar.component'
import { CustomValueAccessorDirective } from './directives/CustomValueAccessor.directives'
import { FooterComponent } from './home/layout/footer/footer.component'
import { FormComponent } from './shared/component/form/form.component'
import { HeaderComponent } from './home/layout/header/header.component'
import { HomeComponent } from './home/home.component'
import { MenuComponent } from './home/layout/menu/menu.component'
import { MessageComponent } from './shared/component/message/message.component'
import { SignInComponent } from './shared/component/sign-in/sign-in.component'

@NgModule({
  declarations: [
    AppComponent,
    CookiebarComponent,
    CustomValueAccessorDirective,
    BreadcrumbComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    MessageComponent,
    SignInComponent,
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
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
