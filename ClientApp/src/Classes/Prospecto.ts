import { Documento } from "../app/Services/api.service";


export class Prospecto {
  constructor(
    public Nombre: string,
    public ApellidoPaterno: string,
    public ApellidoMaterno: string,
    public Calle: string,
    public Numero: number,
    public Colonia: string,
    public CodigoPostal: number,
    public Telefono: string,
    public RFC: string,
    public Documentos: Documento[],
    public Estatus: string
  ) { }
}
