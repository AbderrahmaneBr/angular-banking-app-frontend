import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
  imports: [NgFor, AsyncPipe, NgIf, ReactiveFormsModule, RouterLink],
})
export class AccountsComponent {
  accounts?: Observable<AccountDetails>;
  errorMessage?: string;
  isLoading: boolean = false;
  searchFormGroup?: FormGroup;
  private currentAccountId: string = '';
  private currentPage: number = 0;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  findAccount(accountId: string, page: number = 0) {
    this.currentAccountId = accountId;
    this.currentPage = page;
    this.errorMessage = '';
    this.isLoading = true;
    this.accounts = undefined;

    this.accountService.getAccount(accountId, page).subscribe({
      next: (data: AccountDetails) => {
        this.accounts = of(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Could not load account details.';
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number) {
    if (page >= 0) {
      this.findAccount(this.currentAccountId, page);
    }
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      accountId: this.fb.control(''),
    });
  }
}
