import { Injectable,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant } from '../pajak/merchant';

const DATA_API = 'https://api.raspi-geek.com/v1/';
const API_KEY = "SnaCnkclS51QB7n0iIuj23NhUFBkwQP9kX4I7eh6";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  totalvalue(start:string,end:string): Observable<any>{
    let body={"startdate":start,"enddate":end}
    let headers={"x-api-key":API_KEY}
    return this.http.post<any>(DATA_API+'values',body,{headers})
  }

  totalorders(start:string,end:string): Observable<any>{
    let body={"startdate":start,"enddate":end}
    let headers={"x-api-key":API_KEY}
    return this.http.post<any>(DATA_API+'orders',body,{headers})
  }

  latestorder():Observable<any>{
    let headers={"x-api-key":API_KEY}
    return this.http.get<any>(DATA_API+'latestorder',{headers})

  }

  listmerchant():Observable<any>{
    let headers={"x-api-key":API_KEY}
    return this.http.get<any>(DATA_API+'merchants',{headers})    
  }

  addmerchant(merchant:Merchant):Observable<any>{
    let headers={"x-api-key":API_KEY}
    let body:any;
    body={
      "merchant_id":merchant.merchant_id,
      "owner":merchant.owner,
      "nik":merchant.nik,
      "email":merchant.email,
      "nama_usaha":merchant.nama_usaha,      
      "alamat":merchant.alamat,
      "kategori":merchant.kategori,
      "data_source":merchant.data_source
    }
    return this.http.post<any>(DATA_API+'merchants',body,{headers})    
  }

  earnbycategory(startdate:string,enddate:string):Observable<any>{
    let headers={"x-api-key":API_KEY}
    let body={"startdate":startdate,"enddate":enddate}
    return this.http.post<any>(DATA_API+'earnsbycat',body,{headers})
  }
}
