import { NgModule } from '@angular/core';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PersonaComponent } from './componentes/persona/persona.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { VigilanteGuard } from './vigilante.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },    
  { path: 'login', component: LoginComponent },
  { path: 'Principal', component: PrincipalComponent, children:[ 
    { path: '', component: UsuarioComponent },  
    { path: 'usuario', component: UsuarioComponent },  
    { path: 'persona', component: PersonaComponent },  
    ] , canActivate:[VigilanteGuard]},  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
