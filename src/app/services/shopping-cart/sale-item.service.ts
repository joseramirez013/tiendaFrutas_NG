import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-config';
import { SaleItemModel } from 'src/app/models/shoppingCart/sale-item.model';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class SaleItemService {
  entity = 'shopping-carts';
  token: String = '';
  filter: String = '?filter={"include":[{"relation":"name"},{"relation":"price"},{"relation":"images"}]}';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
  }
/**
 * Get all records of a collection
 */
  getAllRecords(): Observable<SaleItemModel[]>{
    return this.http.get<SaleItemModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${this.filter}`);
  }

  /**
   * Get record by id
   * @param id id to search
   */
  /* getRecordById(id: String): Observable<SaleItemModel>{
    return this.http.get<SaleItemModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}${this.filter}`);
  } */

  getRecordById(id: String): Observable<SaleItemModel>{
    return this.http.get<SaleItemModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/${'sale-items'}`);
  }

  /**
   * Add new record to sale-item collection
   * @param record record data
   */
  saveNewRecord(record: SaleItemModel):Observable<SaleItemModel>{
    return this.http.post<SaleItemModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  EditRecord(record: SaleItemModel):Observable<SaleItemModel>{
    return this.http.put<SaleItemModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  DeleteRecord(recordId: String):Observable<any>{
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
    
}
