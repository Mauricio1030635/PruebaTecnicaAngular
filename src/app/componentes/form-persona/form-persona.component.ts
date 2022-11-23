import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from'sweetalert2';
import { ServicioRestService } from 'src/app/servicio-rest.service';
import {MatDialogRef } from '@angular/material/dialog';
import { PersonaDTO } from 'src/app/interfaces/PersonaDTO';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})
export class FormPersonaComponent implements OnInit {

  Data!:PersonaDTO;
  form:FormGroup;
  hide = true;
  public list!:any[];
  private estado!:number;
  constructor(private fb :FormBuilder, 
    private dialog:MatDialogRef<FormPersonaComponent> ,      
    private service: ServicioRestService) { 
      this.form= this.fb.group({
        NombresPersona:new FormControl('', [Validators.required ]),
        ApellidosPersona:new FormControl('', [Validators.required ]),       
        NumIdentificacionPersona:new FormControl('', [Validators.required,   ]),       
        EmailPersona:new FormControl('', [Validators.required,  ]),       
        TipoIdentificacionPersona:new FormControl('', [  ]),                    
      })
    }

  ngOnInit(): void {
  }

  Tipos: any[] = [
    {value: 'Cedula', viewValue: 'Cedula de ciudadania'},
    {value: 'Nit', viewValue: 'Nit'},
    {value: 'Cedula Extranjeria', viewValue: 'Cedula Extranjeria'},
  ];


  Validar(){  
    this.Data= this.form.value;
    console.log(this.Data);
      this.Add(this.Data);       
    }  



    Add(data:PersonaDTO){
      this.service.AgregarPersona(data).subscribe(x=>{            
        this.estado=x.estado; 
        this.list=x.data;           
        this.Mensajes(this.estado);
        
      }, error=>{            
        this.MensajesRespuesta("Error",'Valide conexión', 'error');      
      });  
      this.dialog.close('save');
      this.form.reset();   
    }
  
    Mensajes(estado:Number){    
      if(estado==1)
        this.MensajesRespuesta('Agregado','Persona Agregada','success');                 
        

      else
        this.MensajesRespuesta('Error','Error al agregar un Persona, valide  su información','error');           
      
      
     } 

  MensajesRespuesta(inicio:string, medio:string, icono:any){
    swal.fire(inicio, medio,icono);
  };


}
