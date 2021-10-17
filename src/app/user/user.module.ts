import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { LicenseDataComponent } from './user-details/license-data/license-data.component';
import { UserDataComponent } from './user-details/user-data/user-data.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserDataComponent,
    LicenseDataComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports: [
    UserListComponent,
    UserDetailsComponent,
    UserDataComponent,
    LicenseDataComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent
  ]
})
export class UserModule { }
