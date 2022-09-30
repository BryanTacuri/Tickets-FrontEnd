import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { NgZorroModule } from './ngzorro/ngzorro.module';
import { BarraModule } from './barra/barra.module';
//TODO BORRAR INNCESARIO
import {
  AccountBookFill,
  FacebookOutline,
  GoogleOutline,
  PlusOutline,
  ArrowLeftOutline,
  PlusCircleFill,
  EyeInvisibleFill,
  EyeInvisibleOutline,
  EyeInvisibleTwoTone,
  MenuFoldOutline,
  WhatsAppOutline,
  FacebookFill,
  InstagramOutline,
  MenuUnfoldOutline,
  DownloadOutline,
  ContainerOutline,
  GlobalOutline,
  TeamOutline,
  UserOutline,
  IdcardOutline,
  MailOutline,
  LockOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { registerLocaleData } from '@angular/common';


registerLocaleData(es);
const icons: IconDefinition[] = [
  AccountBookFill,
  FacebookOutline,
  GoogleOutline,
  PlusOutline,
  GlobalOutline,
  ArrowLeftOutline,
  EyeInvisibleOutline,
  DownloadOutline,
  EyeInvisibleTwoTone,
  WhatsAppOutline,
  FacebookFill,
  InstagramOutline,
  IdcardOutline,
  MailOutline,
  PlusCircleFill,
  MenuFoldOutline,
  EyeInvisibleFill,
  LockOutline,
  UserOutline,
  MenuUnfoldOutline,
  ContainerOutline,
  TeamOutline,
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    NzIconModule.forRoot(icons),
    HttpClientModule,
    NzFormModule,
    ReactiveFormsModule,
    NgZorroModule,
    BarraModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
