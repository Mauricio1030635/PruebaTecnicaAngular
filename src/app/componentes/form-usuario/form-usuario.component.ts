import { Component, OnInit } from '@angular/core';
import {UsuarioDTO} from "../../interfaces/UsuarioDTO";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from'sweetalert2';
import { ServicioRestService } from 'src/app/servicio-rest.service';
import {MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  Data!:UsuarioDTO;
  form:FormGroup;
  hide = true;
  public list!:any[];
  private estado!:number;
  constructor(private fb :FormBuilder, 
    private dialog:MatDialogRef<FormUsuarioComponent> ,      
    private service: ServicioRestService) { 
      this.form= this.fb.group({
        Usuario:new FormControl('', [Validators.required ]),
        PassUsuario:new FormControl('', [Validators.required, Validators.min(3),Validators.min(18)  ]),
        //ConfirmPassUsuario:new FormControl('', [Validators.required, Validators.min(3),Validators.min(18)  ]),
      })
    }

  ngOnInit(): void {
  }

  Validar(){  
    this.Data= this.form.value;
      this.Add(this.Data);       
    }  



    Add(data:UsuarioDTO){
      this.service.AgregarUsuarios(data).subscribe(x=>{            
        this.estado=x.estado; 
        this.list=x.data;           
        this.Mensajes(this.estado);
        
      }, error=>{            
        this.MensajesRespuesta('Error','Valide conexión', 'error');      
      });  
      this.dialog.close('save');
      this.form.reset();   
    }
  
    Mensajes(estado:Number){    
      if(estado==1)
        this.MensajesRespuesta('Agregado','Usuario Agregado','success');                 
        

      else
        this.MensajesRespuesta('Error','Error al agregar un usuario, valide  su información','error');           
      
      
     } 

  MensajesRespuesta(inicio:string, medio:string, icono:any){
    swal.fire(inicio, medio,icono);
  };

}
