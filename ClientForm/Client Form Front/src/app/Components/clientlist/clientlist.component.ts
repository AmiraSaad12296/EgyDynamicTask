import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { Client } from '../../Models/client';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-clientlist',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './clientlist.component.html',
  styleUrl: './clientlist.component.css'
})
export class ClientlistComponent implements OnInit , OnDestroy
 {


  sub:Subscription|null=null;
  refreshFlag: boolean = false;

  clients: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 4;
  totalPagesArray: number[] = [];


  filterDialogOpen: boolean = false;
  showFilterDialog: boolean = false;
  allColumns: string[] = ['','Name', 'Description', 'Job', 'Entered By', 'Entry Date', 'Last Modification By', 'Last Modification In', 'Sales Man', 'Client Source', 'Client Class',''];
  displayedColumns: string[] = [...this.allColumns];
  displayedColumnsMap: { [key: string]: boolean } = {};
  tempClientistArray = [...this.clients];
  showSRRow = false;
  @ViewChild('name') name: any = '';
  @ViewChild('Desc') Desc: any = '';
  @ViewChild('Job') Job: any = '';
  @ViewChild('EnteredBy') EnteredBy: any = '';
  @ViewChild('EntryDate') EntryDate: any = '';
  @ViewChild('LastModificationBy')LastModificationBy: any = '';
  @ViewChild('LastModificationIn') LastModificationIn: any = '';
  @ViewChild('Salesman') Salesman: any = '';
  @ViewChild('ClientSrc') ClientSrc: any = '';
  @ViewChild('ClientClass') ClientClass: any = '';




  constructor(public clientservice:ClientService)
  {}

  ngOnInit(): void {
  this.loadClients(this.currentPage);
  }

  deleteClient(id: number): void {
    this.sub = this.clientservice.deleteUser(id).subscribe(
      () => {
        this.clients= this.clients.filter(client => client.id !== id);
      },
    );
  }

  exportToExcel(): void {
    const data: any[] = [['Id','Name', 'Description', 'Job', 'Entered By', 'Entry Date', 'Last Modification By', 'Last Modification In', 'Sales Man', 'Client Source', 'Client Class',""]];
    this.clients.forEach(client => {
      data.push([client.name, client.description , client.job , client.enteredBy , client.entryDate , client.lastModificationBy , client.lastModificationIn , client.salesMan , client.clientSource , client.clientClass]);
    });
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients');
    XLSX.writeFile(wb, 'clients.xlsx');
  }

  printTable(): void {
    const printContent = document.getElementById('clientTable');
    if (printContent) {
      const clonedTable = printContent.cloneNode(true) as HTMLElement;
      const printWindow = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Client Table</title>
              <style>
                table {
                  border-collapse: collapse;
                  width: 100%;
                }
                th, td {
                  border: 1px solid black;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <h1>Client Table</h1>
            </body>
          </html>
        `);
        printWindow.document.body.appendChild(clonedTable);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      } else {
        alert('Popup blocked! Please allow popups for this website.');
      }
    } else {
      alert('Table content not found. Please try again.');
    }
  }



  refreshTable() {
    this.refreshFlag = true;
    this.loadClients(this.currentPage);
    this.refreshFlag = false;
  }

  loadClients(page: number): void {

    this.clientservice.getClientPagination(page, this.pageSize)
  .subscribe(response => {
    this.clients = response.clients;
    this.totalPages = response.totalPages;
    this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1); // Generate an array of page numbers
    this.currentPage = page;
  });
  }
  goToPage(page: number): void {
    this.loadClients(page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadClients(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadClients(this.currentPage - 1);
    }
  }



  openFilterModal(): void {
    this.showFilterDialog = true;
    this.displayedColumns.forEach(column => {
      this.displayedColumnsMap[column] = true;
    });
  }

  closeFilterModal(): void {
    this.showFilterDialog = false;
  }
  toggleColumn(columnName: string): void {
    this.displayedColumnsMap[columnName] = !this.displayedColumnsMap[columnName];

    if (!this.displayedColumnsMap[columnName]) {
        const columnIndex = this.displayedColumns.indexOf(columnName);
        if (columnIndex !== -1) {
            this.displayedColumns.splice(columnIndex, 1);
            console.log(this.displayedColumns)
        }
    } else {
        const originalIndex = this.allColumns.indexOf(columnName);
        if (originalIndex !== -1) {
            this.displayedColumns.splice(originalIndex, 0, columnName);
        }
        console.log(this.displayedColumns)
    }
}



  applyFilter(): void {
    this.displayedColumnsMap = { ...this.displayedColumnsMap };
        this.displayedColumns = this.displayedColumns.filter(
      (column) => this.displayedColumnsMap[column]
    );

    this.closeFilterModal();
  }

  searchFilter() {
    this.tempClientistArray = [];
    const filterObject: any = {
      name: this.name.nativeElement.value,
      description: this.Desc.nativeElement.value,
      job: this.Job.nativeElement.value,
      enteredBy: this.EnteredBy.nativeElement.value,
      entryDate: this.EntryDate.nativeElement.value,
      lastModificationBy: this.LastModificationBy.nativeElement.value,
      lastModificationIn: this.LastModificationIn.nativeElement.value,
      salesMan: this.Salesman.nativeElement.value,
      clientSource: this.ClientSrc.nativeElement.value,
      clientClass: this.ClientClass.nativeElement.value,
    };

    this.clients.forEach(client => {
      let isStringExist = true;
      for (const key in filterObject) {
        if (filterObject[key] && client[key].toString().toUpperCase().indexOf(filterObject[key].toUpperCase()) === -1) {
          isStringExist = false;
          break;
        }
      }
      if (isStringExist) {
        this.tempClientistArray.push(client);
      }
    });

    this.clients = this.tempClientistArray;
  }

  toggleSRRow() {
    this.showSRRow = !this.showSRRow;
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }
}
