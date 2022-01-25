import { Component, Input, OnInit } from '@angular/core';
import { ExcelData } from 'src/app/models/excel-data.model';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-row-details',
  templateUrl: './row-details.component.html',
  styleUrls: ['./row-details.component.css']
})
export class RowDetailsComponent implements OnInit {

   currentData: ExcelData = {
    title: '',
    description: '',
    published: false
  };
  constructor(private uploadFileService: UploadFileService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getData(this.route.snapshot.params["id"]);
    console.log(this.currentData);
  }

  getData(id:number):void {
      this.uploadFileService.getFileById(id).subscribe({
        next:(data)=> {
          this.currentData = data;
          console.log(data);
          console.log(this.currentData);
        },
        error:(e)=> console.log(e)
      })
  }

  updateData(): void {

    this.uploadFileService.updateData(this.currentData.id,this.currentData)
      .subscribe({
        next: (res) => {
          console.log("INSIDE",res);
          this.router.navigate(['/table']);
        },
        error: (e) => console.error(e)
      });
  }

}
