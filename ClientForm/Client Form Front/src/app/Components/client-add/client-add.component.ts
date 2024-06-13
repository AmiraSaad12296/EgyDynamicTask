import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClientAdd } from '../../Models/clientAdd';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-add',
  standalone: true,
  imports: [RouterLink , FormsModule ,CommonModule],
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent implements OnDestroy
{
 client:ClientAdd= new ClientAdd("","","","",new Date(),"",new Date(),"","","")
 constructor(public clientService:ClientService ,public router:Router){}

  sub:Subscription|null=null;
  save(){
    this.sub=this.clientService.addClient(this.client).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl("/home");
    });

  }
  Cancel(){
      this.router.navigateByUrl("/home");

  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }

}
