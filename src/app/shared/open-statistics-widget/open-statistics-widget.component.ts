import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-statistics-widget',
  templateUrl: './open-statistics-widget.component.html',
  styleUrls: ['./open-statistics-widget.component.scss']
})
export class OpenStatisticsWidgetComponent implements OnInit {

  @Input() hotelsTotal: number = 0;
  @Input() roomsTotal: number = 0;
  @Input() bookingsTotal: number = 0;

  today = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
