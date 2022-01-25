import { Component, Input, OnInit } from '@angular/core';
import { ExcelData } from 'src/app/models/excel-data.model';
import { UploadFileService } from 'src/app/services/upload-file.service';
import * as XLSX from 'xlsx';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface DataToExport {
  id?:number,
  title:string,
  description:string,
  published:boolean
}

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})

export class TableDataComponent implements OnInit {
  

  @Input() currentData:ExcelData = {
    title:'',
    description:'',
    published:false
  }

  closeModal:string;
  excelDatas: ExcelData[] = [];
  datasToExport:DataToExport[]=[];
  fileNme='excelData.xlsx';

  constructor(private uploadFileService:UploadFileService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.uploadFileService.getFiles().subscribe({
      next:(data) => {
        this.excelDatas = data;
        console.log(this.excelDatas[0].title);
        
        this.datasToExport = JSON.parse(JSON.stringify(this.excelDatas));
        for (var i = 0, len = this.datasToExport.length; i < len; i++) {
          delete this.datasToExport[i].id;
        }
        console.log("DATAS:" , this.datasToExport);
      },
      error:(e)=> console.log(e)
    }
        );
      }

  deleteData(id:number){
    this.uploadFileService.deleteData(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getData();
      },
      error: (e) => console.error(e)
    }
    )

  }

  //Aici am uitat eu sa spun. Pentru a exorta datele din tabel intr-un excel file, am folosit pachetul XLSX. se poate exporta dintr-un json, sau tabel

  exportDataToExcel() {
    //let element = document.getElementById('excel-table');
    const ws:XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datasToExport);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb, this.fileNme);
  }

  saveData() {
    this.uploadFileService.uploadByElement(this.currentData).subscribe({
      next:(response) => {
        console.log(response);
        this.getData();
      },
      error:(e) => console.error(e)
    });
  }

  triggerModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  

}


