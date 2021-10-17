import { Component, OnInit, Input } from '@angular/core';
import { License } from 'src/app/_interfaces/license';

@Component({
  selector: 'app-license-data',
  templateUrl: './license-data.component.html',
  styleUrls: ['./license-data.component.css']
})
export class LicenseDataComponent implements OnInit {
  @Input()
  public licenses!: License[];

  constructor() { }

  ngOnInit() {
  }

}