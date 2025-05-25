import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css',
})
export class CustomerAccountComponent implements OnInit {
  customer: Customer | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const customerId = params['id'];
      if (customerId) {
        this.loadCustomerData(customerId);
      }
    });
  }

  private loadCustomerData(customerId: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.customerService.getCustomerById(Number(customerId)).subscribe({
      next: (data) => {
        this.customer = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }
}
