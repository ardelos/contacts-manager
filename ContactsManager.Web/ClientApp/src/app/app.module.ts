import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailsComponent } from './components/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataviewComponent } from './components/dataview/dataview.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule, } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConnectFormDirective  } from './shared/directives/data';
import { ContactsReducer } from './shared/store/reducers/contacts.reducers';
import { ContactsEffect } from './shared/store/effects/contacts.effect';
import { ContactsService } from './shared/services/contacts-service';
const routes: Routes = [
  { path: "", redirectTo: "/clients", pathMatch: "full" },
  { path: "clients", component: DashboardComponent },
  { path: "clients/:id", component: DetailsComponent },
  { path: "clients/new", component: DetailsComponent },
  { path: "*", component: DashboardComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailsComponent,
    DashboardComponent,
    DataviewComponent,
    ConnectFormDirective
  ],
  imports: [
    [RouterModule.forRoot(routes)],
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({appstate: ContactsReducer}, {}),
    EffectsModule.forRoot([ContactsEffect])
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
