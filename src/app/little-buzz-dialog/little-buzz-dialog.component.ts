import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BuzzResponse } from '../interface/BuzzResponse';
import { Buzz } from '../model/buzz';

@Component({
  selector: 'app-little-buzz-dialog',
  templateUrl: './little-buzz-dialog.component.html',
  styleUrls: ['./little-buzz-dialog.component.css']
})
export class LittleBuzzDialogComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'title', 'description'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<Buzz>(true, []);
  apiUrl = "http://localhost:1598/buzz/delete-all-byid";

  constructor(private httpclient: HttpClient,public dialogRef: MatDialogRef<LittleBuzzDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Buzz[]) {
    this.dataSource = new MatTableDataSource<Buzz>(this.data);
  }

  ngOnInit(): void {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
  
  this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Buzz): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.ranking) + 1}`;
  }

  delete(){
    let ids:Array<Number> = new Array;
    console.log("HTTP Post Buzzes");
    this.dataSource.data.forEach(buzz => {
      if (this.selection.isSelected(buzz)){
        ids.push(buzz.id);
        console.log("id:"+buzz.id,",ranking:"+buzz.ranking+",title:"+buzz.title);
      }
    });
    this.httpclient.post(this.apiUrl,ids).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter(buzz => !ids.includes(buzz.id));
    });
  }

  close(){
    this.dialogRef.close(this.dataSource.data);
  }
}
