import { Routes } from '@angular/router';
import { ClientlistComponent } from './Components/clientlist/clientlist.component';
import { ClientAddComponent } from './Components/client-add/client-add.component';
import { ClientUpdateComponent } from './Components/client-update/client-update.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home',component:ClientlistComponent,title:"Clients"},
  {path:"Clients/Add",component:ClientAddComponent},
  {path:"Clients/Update/:id",component:ClientUpdateComponent},
];
