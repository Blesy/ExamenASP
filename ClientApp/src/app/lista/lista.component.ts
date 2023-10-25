import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-lista-component',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  data: any[] = [];
  vistaLista: boolean = true;
  prospecto: Prospecto = {
    prospectoID: 0,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    calle: "",
    numero: 0,
    colonia: "",
    codigoPostal: 0,
    telefono: "",
    rfc: "",
    observaciones: "",
    documentos: [],
    estatus: "Enviado"
  }
;

  constructor(private apiServices: ApiService) { }

  ngOnInit() {
     this.llenarTabla();
  }

  llenarTabla() {
    this.apiServices.getAll().subscribe(data => {
      this.data = data.data
    })
  }

  interpolarVista(id: number) {
    this.vistaLista = !this.vistaLista;
    if (id) this.apiServices.getOne(id).subscribe(data => this.prospecto = data.data);
  }

  descargarArchivo(item: any) {
    const downloadLink = document.createElement('a');
    const fileName = item.nombre;

    downloadLink.href = item.archivo;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}

export interface Prospecto {
  prospectoID: number,
  nombre: string,
  apellidoPaterno: string,
  calle: string,
  numero: number,
  colonia: string,
  codigoPostal: number,
  telefono: string,
  rfc: string,
  observaciones: string,
  documentos: any[],
  estatus: "Enviado",
  apellidoMaterno?: string,
}
