import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Objeto } from '../../model/Objeto.model';

@Component({
  selector: 'app-objetos',
  standalone: false,
  templateUrl: './objetos.component.html',
  styleUrl: './objetos.component.css',
  providers: [ApiService]
})
export class ObjetosComponent {

    constructor(private api: ApiService) {}

    objetos: Objeto[] = []; // Inicializado como array vacío
    tituloDialogo: string = "Nuevo Objeto";
    visible: boolean = false; // Cambiado a false para que no aparezca al inicio
    
    objetoDialogo: Objeto = new Objeto();
    nuevoObjeto: boolean = true;

    ngOnInit() {
      this.obtenerObjetos();
    }
    
    obtenerObjetos() {
      this.api.getObjetos().subscribe((res: Objeto[]) => {
        this.objetos = res;
      }); 
    }
    
    editarObjeto(objeto: Objeto) {
      this.visible = true;
      this.nuevoObjeto = false;
      this.objetoDialogo = {...objeto}; // Usamos spread operator para copia
      this.tituloDialogo = "Editar Objeto";
    }

    eliminarObjeto(objeto: Objeto) {
      if (confirm('¿Estás seguro de eliminar este objeto?')) {
        this.api.deleteObjeto(objeto.id).subscribe(() => {
          this.objetos = this.objetos.filter(o => o.id !== objeto.id);
        });
      }
    }

    abrirDialogo() {
      this.visible = true;
      this.nuevoObjeto = true;
      this.objetoDialogo = new Objeto();
      this.tituloDialogo = "Nuevo Objeto";
    }

    guardarObjeto() {
      if (this.nuevoObjeto) {
        this.api.postObjeto(this.objetoDialogo).subscribe((res: Objeto) => {
          this.obtenerObjetos();
          this.visible = false;
        });
      } else {
        this.api.putObjeto(this.objetoDialogo.id, this.objetoDialogo).subscribe((res: Objeto) => {
          this.obtenerObjetos();
          this.visible = false;
        });
      }  
    } 
}