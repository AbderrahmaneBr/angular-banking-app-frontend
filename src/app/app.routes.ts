import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NewOperationComponent } from './new-operation/new-operation.component';

export const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  {
    path: 'customers/add',
    component: NewCustomerComponent,
  },
  {
    path: 'accounts/add-operation',
    component: NewOperationComponent,
  },
];
