import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AccountOperation } from '../model/account.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-operation',
  imports: [ReactiveFormsModule, NgIf],

  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css'],
})
export class NewOperationComponent implements OnInit {
  newOperationForm!: FormGroup;
  operationTypes = ['CREDIT', 'DEBIT'];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newOperationForm = this.fb.group({
      accountId: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      type: [null, Validators.required],
      operationDate: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  handleAddOperation() {
    const formValue = this.newOperationForm.value;
    const operation: AccountOperation = {
      id: 0,
      operationDate: new Date().toISOString(),
      amount: formValue.amount,
      type: formValue.type,
      description: formValue.description,
    };

    this.accountService
      .saveOperation(formValue.accountId, operation)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/accounts');
        },
        error: (err) => {
          console.error('Failed to save operation:', err);
          alert('Error saving operation. Please try again.');
        },
      });
  }
}
