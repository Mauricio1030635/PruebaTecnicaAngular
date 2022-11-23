import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { ListaRespuesta } from './interfaces/ListaRespuesta';
import { Observable } from 'rxjs';
import {  throwError  as atraparError} from "rxjs";
import { UsuarioDTO } from './interfaces/UsuarioDTO';
import { PersonaDTO } from './interfaces/PersonaDTO';



@Injectable({
  providedIn: 'root'
})
export class ServicioRestService {

  constructor(private http:HttpClient) { }

  public URL ="https://localhost:7052/api/";  


  Login(model:UsuarioDTO):Observable<ListaRespuesta>{
    return this.http.post<ListaRespuesta>(this.URL+"Login",model).pipe(
      catchError(this.ErrorMensaje)
    );}   

  AgregarUsuarios(model:UsuarioDTO):Observable<ListaRespuesta>{
    return this.http.post<ListaRespuesta>(this.URL+"Usuario",model).pipe(
      catchError(this.ErrorMensaje)
    );}

  ListarUsuarios():Observable<ListaRespuesta>{
    return this.http.get<ListaRespuesta>(this.URL+"Usuario").pipe(
      catchError(this.ErrorMensaje)
    );}


    AgregarPersona(model:PersonaDTO):Observable<ListaRespuesta>{
      return this.http.post<ListaRespuesta>(this.URL+"Persona",model).pipe(
        catchError(this.ErrorMensaje)
      );}
  
    ListarPersona():Observable<ListaRespuesta>{
      return this.http.get<ListaRespuesta>(this.URL+"Persona").pipe(
        catchError(this.ErrorMensaje)
      );}




  
    ErrorMensaje(mensaje:HttpErrorResponse){
      return atraparError(mensaje.message);
    }

      
}
