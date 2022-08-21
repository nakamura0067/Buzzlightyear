import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuzzResponse } from '../interface/BuzzResponse';
import { Buzz } from '../model/buzz';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  apiUrl = "http://localhost:1598/buzz";
  
  constructor(private httpclient: HttpClient,public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Buzz) {
    }

  onSubmit(): void {
    if(this.data.ranking && this.data.title && this.data.description){
      console.log("HTTP Post Buzz");
      console.log("id:"+this.data.id,",ranking:"+this.data.ranking+",title:"+this.data.title);
      this.httpclient.post(this.apiUrl, this.data).subscribe((id:Number)=>{
        this.data.id = id;
        this.dialogRef.close(this.data);
      });
    }
  }
}
