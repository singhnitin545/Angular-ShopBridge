import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, ReplaySubject, from, of, range } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ItemServiceService {
  private _itemUrl = "https://603538216496b9001749e923.mockapi.io/api/items";
  constructor(private _http: HttpClient) {}

  getitems(): Observable<any> {
    return this._http.get(this._itemUrl).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
  
  saveitems(items): Observable<any> {
    return this._http.post(this._itemUrl, items).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteitem(id): Observable<any> {   
    return this._http.delete(this._itemUrl+'/'+id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  itemDetail(id): Observable<any> {   
    return this._http.get(this._itemUrl+'/'+id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
