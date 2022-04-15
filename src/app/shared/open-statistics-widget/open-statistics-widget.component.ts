import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-statistics-widget',
  templateUrl: './open-statistics-widget.component.html',
  styleUrls: ['./open-statistics-widget.component.scss']
})
export class OpenStatisticsWidgetComponent implements OnInit {

  @Input() roomsTotal: number = 0;
  @Input() statistics = [];
  constructor() { }

  ngOnInit(): void {
  }

}
