import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Buzz} from 'src/app/model/buzz';
import { BuzzDialogComponent } from '../buzz-dialog/buzz-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { BuzzResponse } from '../interface/BuzzResponse';
import { LittleBuzzDialogComponent } from '../little-buzz-dialog/little-buzz-dialog.component';

@Component({
  selector: 'app-buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.css']
})
export class BuzzComponent implements OnInit {

  buzzList:Buzz[] = [];
  littleBuzzList:Buzz[] = [];
  apiUrl = "http://localhost:1598/buzz";
  nowDate:Date;
  ranking: string = "";
  title: string = "";
  description: string = "";

  constructor(private httpclient: HttpClient,public dialog: MatDialog, public changeDetectorRef: ChangeDetectorRef) {
    for(let i:number=1; i <= 3; i++) {
      this.buzzList.push(
        this.convertBuzz({
          id: null,
          ranking: String(i),
          title: "未定",
          description: "まだバズられておりません"
        })
      );
    }
  }

  ngOnInit(): void { 
    this.nowDate = new Date();
    console.log("HTTP GET Buzz")
    this.httpclient.get(this.apiUrl).subscribe((res: BuzzResponse[])=>{
      res.forEach((buzz) => {
        console.log("id:"+buzz.id,",ranking:"+buzz.ranking+",title:"+buzz.title);
        if(Number(buzz.ranking) <= 3) {
          this.buzzList.shift();
          this.buzzList.push(this.convertBuzz(buzz));
        } else {
          this.littleBuzzList.push(this.convertBuzz(buzz));
        }
      });
    },
    (error: any)=>{
   });
  }

  addBuzz(): void {
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {ranking:'', title:'', description:''},
      width: "250px"
    }); 
    dialogRef.afterClosed().subscribe(async(result: Buzz) => {
      if (!result) return;
      if (this.buzzList.length < 3){
        this.buzzList.push(result);
      } else {
        this.littleBuzzList.push(result);
      }
    });
  }

  showLittleBuzz(): void {
    const dialogRef = this.dialog.open(LittleBuzzDialogComponent,{
      data: this.littleBuzzList,
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(async(result:Buzz[])=>{
      if (!result) return;
      this.littleBuzzList = result;
    });
  }

  private convertBuzz(buzzResponse:BuzzResponse):Buzz {
    let buzz:Buzz = new Buzz();
    buzz.id = buzzResponse.id;
    buzz.ranking = buzzResponse.ranking;
    buzz.title = buzzResponse.title;
    buzz.description = buzzResponse.description;
    return buzz;
  }

  click(buzz:Buzz){
    const dialogRef = this.dialog.open(BuzzDialogComponent,{
      data: buzz,
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(async(result:Buzz[])=>{
      if (!result) return;
      this.buzzList = result;
    });
  }
}
