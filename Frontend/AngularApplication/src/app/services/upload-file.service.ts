import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcelData } from '../models/excel-data.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8080/excel';

  constructor(private http: HttpClient) { }

  upload(file:File) : Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file',file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`,formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles() : Observable<any> {
    return this.http.get(`${this.baseUrl}/data`);
  }

  getFileById(id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/data/${id}`);
  }

  updateData(id:number,excelData:ExcelData): Observable<any> {
    return this.http.put<ExcelData>(`${this.baseUrl}/upload/${id}`,excelData);
  }

  deleteData(id:number) :Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/data/delete/${id}`);
  }

  uploadByElement(dataToUpload:ExcelData):Observable<ExcelData> {
    return this.http.post<ExcelData>(`${this.baseUrl}/uploadByElement`,dataToUpload);
  }
}
