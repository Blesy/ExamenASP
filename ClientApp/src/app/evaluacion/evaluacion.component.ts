import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prospecto } from '../lista/lista.component'
import { ApiService, ProspectoPut } from '../Services/api.service';

@Component({
  selector: 'app-evaluacion-data',
  templateUrl: './evaluacion.component.html'
})
export class EvaluacionComponent implements OnInit {
  actualizable: Boolean = false;
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
  constructor(private route: ActivatedRoute, private apiServices: ApiService, private router: Router) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiServices.getOne(id).subscribe(data => {
      this.prospecto = data.data;
      this.actualizable = this.prospecto.estatus == "Enviado" ? true : false;
    });
  }

  descargarArchivo(item: any) {
    const downloadLink = document.createElement('a');
    const fileName = item.nombre;

    downloadLink.href = item.archivo;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  guardarEvaluacion() {
    const { prospectoID, estatus, observaciones } = { ...this.prospecto }
    const model: ProspectoPut = { prospectoID: prospectoID, Estatus: estatus, Observaciones: observaciones };
    this.apiServices.put(model).subscribe(data => data);
    this.router.navigate(['/lista']);
  }
}

