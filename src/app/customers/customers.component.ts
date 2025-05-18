import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';
import { Observable, of } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [NgFor, AsyncPipe, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  customers?: Observable<Customer[]>;
  errorMessage?: string;
  searchFormGroup?: FormGroup;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  findCustomers(keyword: string) {
    this.customerService.findCustomers(keyword).subscribe({
      next: (data: Customer[]) => {
        this.customers = of(data);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err;
        throw err;
      },
    });
  }

  handleDeleteCustomer(customerId: number) {
    if (!confirm('Are you sure?')) return;
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
        throw err;
      },
    });
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.findCustomers('');
  }
}
