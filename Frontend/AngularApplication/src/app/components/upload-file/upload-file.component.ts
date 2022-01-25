import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  selectedFile: FileList | null;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos : Observable<any>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event:any) {
    this.selectedFile = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFile.item(0);
    this.uploadService.upload(this.currentFile).subscribe({
      next:(event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      error:(e)=> {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      }
    });

    this.selectedFile = undefined;
  }

}
