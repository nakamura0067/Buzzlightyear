import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Buzz} from 'src/app/model/buzz';
import { BuzzResponse } from '../interface/BuzzResponse';

@Component({
  selector: 'app-buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.css']
})
export class BuzzComponent implements OnInit {

  buzzList:Buzz[] = [];
  apiUrl = "http://localhost:1598/buzz";

  constructor(private httpclient: HttpClient) {
      for(let i:number=1; i <= 3; i++) {
        this.buzzList.push(
          this.convertBuzz({
            rank: i,
            title: "未定",
            description: "まだバズられておりません"
          })
        );
      }
  }

  ngOnInit(): void { 
    this.httpclient.get(this.apiUrl).subscribe((res: BuzzResponse[])=>{
      res.forEach((buzz) => {
        this.buzzList.shift();
        this.buzzList.push(this.convertBuzz(buzz));
      });
    },
    (error: any)=>{
   });
  }

  private convertBuzz(buzzResponse:BuzzResponse):Buzz {
    let buzz:Buzz = new Buzz();
    switch(buzzResponse.rank){
      case 1:
        buzz.rank = "first";
        break;
      case 2:
        buzz.rank = "second";
        break;
      case 3:
        buzz.rank = "third";
        break;
      default:
        buzz.rank = buzzResponse.rank.toString();
        break;
    }
    buzz.title = buzzResponse.title;
    buzz.description = buzzResponse.description;
    return buzz;
  }
}
