import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { User } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public user!: User;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute) { }


  ngOnInit() {
    this.getUserById();
  }

  private getUserById = () => {
    const userId: string = this.activeRoute.snapshot.params['id'];
    const userByIdUrl: string = `api/user/${userId}`;

    this.repository.getData(userByIdUrl)
      .subscribe((res: any) => {
        this.user = res as User;
      },
        (error: any) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public redirectToUserList = () => {
    this.router.navigate(['/user/list']);
  }

  public deleteUser = () => {
    const deleteUrl: string = `api/user/${this.user.id}`;
    this.repository.delete(deleteUrl)
      .subscribe((res: any) => {
        $('#successModal').modal();
      },
        (error: any) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }
}