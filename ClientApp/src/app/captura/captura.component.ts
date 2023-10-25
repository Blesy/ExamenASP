import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Prospecto } from '../../Classes/Prospecto';
import { ApiService, ProspectoPost } from '../Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './captura.component.html',
})
export class CapturaComponent implements OnInit {
  prospectoModel = new Prospecto("", "", "", "", 0, "", 0, "", "", [], "");
  exampleModel = new Prospecto("Lop", "Martin", "", "LOPS", 1000, "sojq", 80000, "6446644664", "1234567890123", [], "");
  counter = 0;

  constructor(private apiServices: ApiService) { }
  @ViewChild('documentos')
    d1!: ElementRef;

  ngOnInit() {
    this.prospectoModel.Documentos.push({ Nombre: "", Archivo: null })
  }

  agregarDoc() {
    this.prospectoModel.Documentos.push({ Nombre: "", Archivo: null })
  }

  salir() {
    if (confirm("¿Está seguro que desea salir? Se perderán los datos capturados") == true) {
      window.location.reload();
    }
  }
  handleUpload(event: any, id: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.prospectoModel.Documentos[id].Archivo = reader.result;
    };
  }

  onSubmit() {
    this.exampleModel = this.prospectoModel;
    let { Nombre, ApellidoPaterno, Calle, Numero, Colonia, CodigoPostal, Telefono, RFC, Documentos } = { ...this.prospectoModel };
    if (Nombre && ApellidoPaterno && Calle && Numero && Colonia && CodigoPostal && Telefono.length == 10 && RFC.length == 13 && Documentos[0].Nombre && Documentos[0].Archivo) {
      let model: ProspectoPost = { ...this.prospectoModel, Observaciones: "", Estatus: "Enviado" };
      model.Documentos = [];
      for (let doc of Documentos) {
        if (doc.Nombre.length > 0 && doc.Archivo) model.Documentos.push(doc)
      }
      this.apiServices.post(model).subscribe(data => console.log(data));
      
    }
  }
}
