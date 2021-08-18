import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxMaskModule } from 'ngx-mask'
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChecklistModule } from 'angular-checklist';
import { NgxWebstorageModule } from 'ngx-webstorage';

//*** MATERIAL ***
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatCheckboxModule
} from "@angular/material";


//*** Components ***
import { AppComponent } from './app.component';


//*** Layout components ***
import { HeaderComponent } from './components/layouts/header/header.component';
import { TopNavigationComponent } from "./components/layouts/top-navigation/top-navigation.component";


//*** Pages components ***
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';

import { RegisterComponent } from "./components/pages/register/register.component";
import { AccountDetailsRegStepComponent } from './components/pages/register/account-details-reg-step/account-details-reg-step.component';
import { ContactAccountRegStepComponent } from './components/pages/register/account-details-reg-step/contact-account-reg-step/contact-account-reg-step.component';
import { AddressRegStepComponent } from './components/pages/register/address-reg-step/address-reg-step.component';
import { TaxDetailsRegStepComponent } from './components/pages/register/tax-details-reg-step/tax-details-reg-step.component';

import { SettingsComponent } from "./components/pages/settings/settings.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";

import { AffiliateSettingsRegStepComponent } from './components/pages/register/affiliate-settings-reg-step/affiliate-settings-reg-step.component';
import { QuoteFormCreateComponent } from './components/pages/quote/quote-form-create/quote-form-create.component';
import { QuoteFormComponent } from './components/pages/quote/quote-form/quote-form.component';
import { QuoteHeaderComponent } from './components/pages/quote/_shared/quote-header/quote-header.component';
import { LeadInfoQuoteComponent } from './components/pages/quote/quote-form/lead-info-quote/lead-info-quote.component';
import { VehicleInfoQuoteComponent } from './components/pages/quote/quote-form/vehicle-info-quote/vehicle-info-quote.component';
import { QuoteStyleBoardComponent } from './components/pages/quote/_shared/quote-style-board/quote-style-board.component';

//*** Shared components ***
import { YesNowButtonComponent } from './components/_shared/yes-no-button/yes-no-button.component';
import { AddressAutocompleteByGoogleComponent } from './components/_shared/address-autocomplete-by-google/address-autocomplete-by-google.component';

//*** Services ***
import { RegexService } from "./services/regex.service";
import { QuoteService } from "./services/quote.service";
import { VehicleDataRequestsService } from "./services/vehicle-data-requests.service";
import { RequestService } from './services/request.service';
import { ConfigService } from './services/config.service';


// notification options 
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    }
  }
}

@NgModule(({
  declarations: [
    AppComponent,
    //*** Layout components ***
    HeaderComponent,
    TopNavigationComponent,
    //*** Pages components ***
    LoginComponent,
    HomeComponent,

    RegisterComponent,
    AccountDetailsRegStepComponent,
    ContactAccountRegStepComponent,
    AddressRegStepComponent,
    AffiliateSettingsRegStepComponent,
    TaxDetailsRegStepComponent,
    QuoteStyleBoardComponent,
    DashboardComponent,
    SettingsComponent,
    //*** Shared components ***
    YesNowButtonComponent,
    QuoteFormComponent,
    QuoteHeaderComponent,
    AddressAutocompleteByGoogleComponent,
    LeadInfoQuoteComponent,
    VehicleInfoQuoteComponent,
    QuoteFormCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule,
    ChecklistModule,
    HttpClientTestingModule,
    NgxMaskModule.forRoot(),
    NgxUiLoaderModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    UcWidgetModule,
    ColorPickerModule,

    //*** MATERIAL ***
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatCheckboxModule,

    NgCircleProgressModule.forRoot({}),
    NotifierModule.withConfig(customNotifierOptions),

  ],
  providers: [
    RegexService,
    VehicleDataRequestsService,
    RequestService,
    ConfigService,
    QuoteService
  ],
  bootstrap: [AppComponent]
}) as any)

export class AppModule { }

