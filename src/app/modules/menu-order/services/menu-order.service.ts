import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuOrderService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL + "v1/Menu/";
  }

  sendOrder(inputRequest: string): Promise<any> {
    const options = {
      responseType: 'text' as const,
    };
    return firstValueFrom(this.http.get(`${this.apiUrl}GetMenuOptions?menuRequest=${inputRequest}`, options));
  }
}
