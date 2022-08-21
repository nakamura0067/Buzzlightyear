import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Buzz } from '../model/buzz';

@Component({
  selector: 'app-buzz-dialog',
  templateUrl: './buzz-dialog.component.html',
  styleUrls: ['./buzz-dialog.component.css']
})
export class BuzzDialogComponent {

  apiUrl = "http://localhost:1598/buzz";
  updateBuzz:Buzz;
  
  constructor(private httpclient: HttpClient,public dialogRef: MatDialogRef<BuzzDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Buzz) {
      this.updateBuzz = JSON.parse(JSON.stringify(data));
    }
  
  update(): void {
    if(this.updateBuzz.ranking && this.updateBuzz.title && this.updateBuzz.description){
      console.log("HTTP Put Buzz");
      console.log("id:"+this.updateBuzz.id,",ranking:"+this.updateBuzz.ranking+",title:"+this.updateBuzz.title);
      this.httpclient.put(this.apiUrl, this.updateBuzz).subscribe(()=>{
        this.close();
      });
    }
  }

  delete(): void {
    const options = { params: new HttpParams().set('id', String(this.updateBuzz.id)) };
      console.log("HTTP Delete Buzz");
      console.log("id:"+this.updateBuzz.id,",ranking:"+this.updateBuzz.ranking+",title:"+this.updateBuzz.title);
    this.httpclient.delete(this.apiUrl, options).subscribe(()=>{
      this.dialogRef.close();
    });
  }

  close(){
    this.dialogRef.close(this.updateBuzz);
  }
}

