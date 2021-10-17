import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialogs/success-dialog/success-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { UserForCreation } from 'src/app/_interfaces/user-for-creation';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public userForm!: FormGroup;
  public dialogConfig!: MatDialogConfig;
  

  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createUser = (userFormValue: { name: any; dateOfBirth: any; address: any; }) => {
    if (this.userForm.valid) {
      this.executeUserCreation(userFormValue);
    }
  }

  private executeUserCreation = (userFormValue: { name: any; dateOfBirth: any; address: any; }) => {
    let user: UserForCreation = {
      name: userFormValue.name,
      dateOfBirth: userFormValue.dateOfBirth,
      address: userFormValue.address
    }
 
    let apiUrl = 'api/user';
    this.repository.create(apiUrl, user)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      )
  }

}