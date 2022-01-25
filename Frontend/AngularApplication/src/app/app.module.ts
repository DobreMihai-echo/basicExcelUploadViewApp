import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RowDetailsComponent } from './components/row-details/row-details.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MynewcomponentComponent } from './components/mynewcomponent/mynewcomponent.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    TableDataComponent,
    RowDetailsComponent,
    MynewcomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
