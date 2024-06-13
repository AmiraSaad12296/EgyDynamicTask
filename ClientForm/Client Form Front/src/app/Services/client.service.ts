import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Models/client';
import { ClientAdd } from '../Models/clientAdd';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://localhost:7194/api/ClientForm';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Client[]>(this.apiUrl);
  }

  addClient(client: ClientAdd){
    return this.http.post<ClientAdd>(this.apiUrl, client);
  }
  getById(id :number){
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  updateUClient(client: Client){
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  deleteUser(id: number){
    return this.http.delete<Client>(`${this.apiUrl}/${id}`);
  }

  getClientPagination(page: number, pageSize: number){
    return this.http.get<any>(`${this.apiUrl}/pagination?page=${page}&pageSize=${pageSize}`);
  }
}
