import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common';

import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { User } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public errorMessage: string = '';
  public user!: User;
  public userForm!: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  
    this.getUserById();
  }
  
  private getUserById = () => {
    let userId: string = this.activeRoute.snapshot.params['id'];
      
    let userByIdUrl: string = `api/user/${userId}`;
  
    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
        this.userForm.patchValue(this.user);
        $('#dateOfBirth').val(this.datePipe.transform(this.user.dateOfBirth, 'MM/dd/yyyy'));
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public validateControl = (controlName: string) => {
    if (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched)
      return true;
    return false;
  }
  public hasError = (controlName: string, errorName: string)  => {
    if (this.userForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

  public executeDatePicker = (event: any) => {
    this.userForm.patchValue({ 'dateOfBirth': event });
  }

  public redirectToUserList = () => {
    this.router.navigate(['/user/list']);
  }

  public updateUser = (userFormValue: any) => {
    if (this.userForm.valid) {
      this.executeUserUpdate(userFormValue);
    }
  }
  
  private executeUserUpdate = (userFormValue: { dateOfBirth: string; name: string; address: string; }) => {
    const date = new Date(userFormValue.dateOfBirth);
    this.user.name = userFormValue.name;
    this.user.dateOfBirth = this.datePipe.transform(date, "yyyy-MM-dd")||"";
    this.user.address = userFormValue.address;
  
    let apiUrl = `api/user/${this.user.id}`;
    this.repository.update(apiUrl, this.user)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

}