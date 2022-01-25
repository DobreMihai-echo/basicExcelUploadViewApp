import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { RowDetailsComponent } from './components/row-details/row-details.component';
const routes: Routes = [
  {path:'home',component:UploadFileComponent},
  {path:'table',component:TableDataComponent},
  {path:'details/:id' ,component:RowDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
