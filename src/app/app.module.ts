import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { heLocale, esLocale, ptBrLocale, enGbLocale, ruLocale, frLocale } from 'ngx-bootstrap/locale';
defineLocale('he', heLocale);
defineLocale('es', esLocale);
defineLocale('pt-br', ptBrLocale);
defineLocale('en-gb', enGbLocale);
defineLocale('ru', ruLocale);
defineLocale('fr', frLocale);
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDatepickerConfig, BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AccountModule } from './components/account/account.module'
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SongComponent } from './components/song/song.component';

import { ArtistService } from './shared/services/artist.service';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistComponent } from './components/artist/artist.component';
import { GenresComponent } from './components/genres/genres.component';
//import { LoginComponent } from './components/account/login.component';

import { HighlightDirective } from './shared/directives/highlight.directive';
//import { ListFilterPipe } from './shared/pipes/listFilter.pipe';
import { FilterPipe } from './shared/pipes/filterAll.pipe';

import { PlayDetailComponent } from './components/play-list/play-detail/play-detail.component';
import { PlayCreateComponent } from './components/play-list/play-create/play-create.component';
import { AlertComponent } from './components/alert/alert.component';

//import { ConfirmDialogService } from './components/confirm-dialog/confirm-dialog.service';

import { fakeBackendProvider } from './shared/helpers/fake-backend';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
//import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LayoutComponent } from './components/account/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuardService as AuthGuard } from "./shared/helpers/auth-guard.service";
import { SongsPlaylistComponent } from './components/songs-playlist/songs-playlist.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import { ClickColorDirective } from './shared/directives/click-color.directive';

//import { AccountModule } from './components/account/account.module'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlayListComponent,
    SongComponent,
    AlbumsComponent,
    ArtistComponent,
    GenresComponent,
    //LoginComponent,
    HighlightDirective,
    //ListFilterPipe,
    FilterPipe,
    PlayDetailComponent,
    PlayCreateComponent,
    AlertComponent,
    //HomeComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    DashboardComponent,
    SongsPlaylistComponent,
    ConfirmDialogComponent,
    ClickColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    //NgbModal,
    //AccountModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    //ConfirmDialogService,
    ArtistService,
    AuthGuard,
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SongComponent), multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
