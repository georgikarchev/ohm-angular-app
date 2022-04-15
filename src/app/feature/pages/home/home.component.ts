import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
    this.httpClient.get("https://ohm-angular-app-default-rtdb.europe-west1.firebasedatabase.app/")
      .subscribe(r => {
        console.log(r);
      });
  }

  ngOnInit(): void {
  }

}
