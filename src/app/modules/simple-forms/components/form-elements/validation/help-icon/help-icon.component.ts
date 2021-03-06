import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-icon',
  templateUrl: './help-icon.component.html',
  styleUrls: ['./help-icon.component.scss']
})
export class HelpIconComponent implements OnInit {

  @Input() iconWrapperClass: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
