import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core"
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + "prospecto";
  }

  public getAll(): Observable<any> {
    return this.http.get(this.url);
  }
  public getOne(id: number): Observable<any> {
    return this.http.get(this.url + "/" + id);
  }
  public post(model: ProspectoPost): Observable<any> {
    return this.http.post(this.url, model, { headers: ({ setTimeout: "60000" }) });
  }
  public put(model: ProspectoPut): Observable<any> {
    return this.http.put(this.url, model);
  }

}

export interface ProspectoPost {
  Nombre: string,
  ApellidoPaterno: string,
  Calle: string,
  Numero: number,
  Colonia: string,
  CodigoPostal: number,
  Telefono: string,
  RFC: string,
  Observaciones: string,
  Documentos: Documento[],
  Estatus: "Enviado",
  ApellidoMaterno?: string,
}

export interface ProspectoPut {
  prospectoID: number,
  Estatus: string,
  Observaciones: string
}

export interface Documento {
  Nombre: string,
  Archivo: string | null | ArrayBuffer
}
