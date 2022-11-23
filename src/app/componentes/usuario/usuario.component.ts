import { Component, OnInit } from '@angular/core';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';
import {MatDialog, } from '@angular/material/dialog';
import { ServicioRestService } from 'src/app/servicio-rest.service';
import { UsuarioDTOEntity } from 'src/app/interfaces/UsuarioDTOEntity';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Usuario', 'Creacion','Acciones'];
  dataSource! : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  public list:UsuarioDTOEntity[]=[];
  

  constructor(public dialog: MatDialog, private MiservicioService:ServicioRestService) { }

  ngOnInit(): void {
    this.GetLsita();
  }


  openDialog() {
    this.dialog.open(FormUsuarioComponent, {
      data: {},
    }).afterClosed().subscribe(x=>{
      this.GetLsita();
        })
  }


  GetLsita(){
    this.MiservicioService.ListarUsuarios().subscribe(x=>{
      this.list=x.data;   
      this.dataSource= new  MatTableDataSource(this.list);
      this.dataSource.paginator= this.paginator;
      
    });     
  }


}


