import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import Swal from 'sweetalert2';

import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

export interface socio {
  nombre: string;
  apellidos: string;
  numeroSocio: any;
  dni: string;
  telefono: any;
  sexo: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(public dialog: MatDialog) {
    this.myDataArray = new MatTableDataSource<socio>([...this.SOCIO_DATA]);}

    name: string = "";

  columnsToDisplay: string[] = ["nombre", "apellidos","numeroSocio","dni", "telefono", "sexo", "actions"];
  public SOCIO_DATA: socio[] = [];
  public newSocio = {nombre: "", apellidos: "", numeroSocio:"", dni:"", telefono:"", sexo:""};
  public myDataArray: any;



  addSocio() {
    if(this.newSocio.nombre!=""&&this.newSocio.apellidos!=""&&this.newSocio.numeroSocio!=""&&this.newSocio.dni!=""&&this.newSocio.telefono!=""&&this.newSocio.sexo!=""){
      const newSociosArray = this.SOCIO_DATA;
      newSociosArray.push(this.newSocio);
      this.myDataArray = [...newSociosArray];
      this.newSocio = {nombre:"", apellidos: "", numeroSocio:"", dni:"", telefono:"", sexo:""};
      //console.warn(this.myDataArray);
    }else{
      Swal.fire('Invalid input values!')
    }
 }

delete(row_obj:any){
  this.SOCIO_DATA = this.SOCIO_DATA.filter((value, key)=>{
    return value.nombre != row_obj.nombre;
  });
  this.myDataArray = [...this.SOCIO_DATA];//refresh the dataSource
  Swal.fire('Deleted successfully!')
}

openDialog(row_obj:any): void {
  let dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '250px',
    data: row_obj
  });

  dialogRef.afterClosed().subscribe(result => {
    this.SOCIO_DATA = result;
    if(this.name!=undefined){
      if(this.name==""){


      }else {
        row_obj.nombre=this.SOCIO_DATA
          const newSociosArray = this.SOCIO_DATA;
          this.myDataArray = [...newSociosArray];
          Swal.fire('Updated successfully!')
      }
    }
  });
}

ngOnInit(){

}

}
