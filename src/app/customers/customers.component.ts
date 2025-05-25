import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;
  isAdmin: boolean = false;
  errorMessage: string = '';

  constructor(private customerService: CustomerService) {
    // Initialize the customers$ Observable
    this.customers$ = this.customerService.findCustomers('');
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin = payload.scope === 'ROLE_ADMIN';
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  }

  handleDeleteCustomer(customerId: number) {
    if (!confirm('Are you sure?')) return;

    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        // Refresh the customers list after deletion
        this.customers$ = this.customerService.findCustomers('');
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to delete customer';
      },
    });
  }
}
