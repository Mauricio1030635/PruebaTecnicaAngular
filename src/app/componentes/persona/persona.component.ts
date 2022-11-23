import { Component, OnInit } from '@angular/core';
import { FormPersonaComponent } from '../form-persona/form-persona.component';
import {MatDialog, } from '@angular/material/dialog';
import { ServicioRestService } from 'src/app/servicio-rest.service';
import { UsuarioDTOEntity } from 'src/app/interfaces/UsuarioDTOEntity';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nombres', 'Apellidos','Tipo','#Identidad','Correo','Creacion','Nombre Completo', 'Identificacion Completo', 'Acciones'];
  dataSource! : MatTableDataSource<any>;
  public list! :any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public dialog: MatDialog, private MiservicioService:ServicioRestService

  ) { }

  ngOnInit(): void {
    this.GetLista();
  }


  openDialog() {
    this.dialog.open(FormPersonaComponent, {
      data: {},
    }).afterClosed().subscribe(x=>{
      this.GetLista();
        })
  }
  

  GetLista(){
    this.MiservicioService.ListarPersona().subscribe(x=>{
      this.list=x.data;         
      this.dataSource= new  MatTableDataSource(this.list);
      this.dataSource.paginator= this.paginator;
      
    });     
  }

}
