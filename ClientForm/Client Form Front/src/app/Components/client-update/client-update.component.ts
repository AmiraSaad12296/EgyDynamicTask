import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../Models/client';
import {  Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-update',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent implements OnInit , OnDestroy {

  client:Client= new Client (0,"","","","",new Date(),"",new Date(),"","","")
  constructor(public clientService:ClientService ,public router:Router
    ,public activatedRoute:ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p=>{
      this.clientService.getById(p['id']).subscribe(d=>{
        this.client=d;
      })
    })
  }
  sub:Subscription|null=null;

  save(){
    this.sub=this.clientService.updateUClient(this.client).subscribe(d=>{
      console.log(d);
      this.router.navigateByUrl("/home");
    });
  }

  Cancel(){
    this.router.navigateByUrl("/home");

}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();  }
}
