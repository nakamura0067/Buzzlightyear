import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'buzzlightyear';
  nowDate:Date;
  
  ngOnInit(): void {
    this.nowDate = new Date();
  }
  addBuzz(): void {
    
  }
}
