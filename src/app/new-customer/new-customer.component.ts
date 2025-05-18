import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../model/customer.model';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css',
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  handleAddCustomer() {
    let customer: Customer = this.newCustomerFormGroup?.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: (data: Customer) => {
        this.router.navigateByUrl('/customers');
      },
      error: (err) => {
        console.error(err);
        throw err;
      },
    });
  }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
    });
  }
}
