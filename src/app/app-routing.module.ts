import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuOrderComponent } from './modules/menu-order/pages/menu-order/menu-order.component';

const routes: Routes = [
  { path: 'menu-order', component: MenuOrderComponent },
  { path: '', redirectTo: '/menu-order', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
