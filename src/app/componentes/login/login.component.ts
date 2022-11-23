import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {UsuarioDTO} from "../../interfaces/UsuarioDTO";
import swal from'sweetalert2';
import { ServicioRestService } from 'src/app/servicio-rest.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Data!:UsuarioDTO;
  form:FormGroup;
  hide = true;
  public list!:any[];
  private estado!:number;

  constructor(private fb :FormBuilder,    
    private router: Router ,
    private service: ServicioRestService,private cookieService: CookieService
    ) { 
    this.form= this.fb.group({
      Usuario:new FormControl('', [Validators.required ]),
      PassUsuario:new FormControl('', [Validators.required, Validators.min(3),Validators.min(18)  ])
    })
  }

  ngOnInit(): void {
  }

  Validar(){  
  this.Data= this.form.value;  
   this.Login(this.Data);          
  }  
  
   Mensajes(estado:Number, data:any){   
    console.log(data); 
    if(estado==1){      
        this.MensajesRespuesta('Hola',`Bienvenido ${data.usuario}`,'success' ); 
        this.router.navigate(['/Principal']);
    }
    else
      this.MensajesRespuesta('Error','Error en la validación','error');       

   } 

   Login(data:UsuarioDTO){
    this.service.Login(data).subscribe(x=>{            
      this.estado=x.estado; 
      this.list=x.data;    
      this.cookieService.set('tokenC', x.mensaje);      
      this.Mensajes(this.estado,this.list);
    }, error=>{      
      this.MensajesRespuesta('Error','Valide conexión', 'error');      
    });     
  }

MensajesRespuesta(inicio:string, medio:string, icono:any){
  swal.fire(inicio, medio,icono);
};


 


}
