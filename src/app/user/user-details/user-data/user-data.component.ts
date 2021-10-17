
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input()
  public user!: User;
  public selectOptions = [{name:'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onChange = (event: { value: any; }) => {
    this.selectEmitt.emit(event.value);
  }

}