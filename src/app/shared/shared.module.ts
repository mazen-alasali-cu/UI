import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessDialogComponent } from './components/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { RepositoryService } from './services/repository.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { DatepickerDirective } from './directives/datepicker.directive';

@NgModule({
  declarations: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    DatepickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    DatepickerDirective
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent
  ]
})
export class SharedModule { }
