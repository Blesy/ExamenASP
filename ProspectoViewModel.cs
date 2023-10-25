using DB;

namespace ExamenASP
{
    public class ProspectoViewModel
    {
        public ProspectoViewModel(Prospecto prospecto, Documento[]? documentos) {
            var doc = documentos;
            this.ProspectoID = prospecto.ProspectoID;
            this.Nombre = prospecto.Nombre;
            this.ApellidoPaterno = prospecto.ApellidoPaterno;
            this.ApellidoMaterno = prospecto.ApellidoMaterno;
            this.Calle = prospecto.Calle;
            this.Numero = prospecto.Numero;
            this.Colonia = prospecto.Colonia;
            this.CodigoPostal = prospecto.CodigoPostal;
            this.Telefono = prospecto.Telefono;
            this.RFC = prospecto.RFC;
            this.Estatus = prospecto.Estatus;
            this.Observaciones = prospecto.Observaciones;
            this.Documentos = doc;
        }
        public int? ProspectoID { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public string Calle { get; set; }
        public int Numero { get; set; }
        public string Colonia { get; set; }
        public int CodigoPostal { get; set; }
        public string Telefono { get; set; }
        public string RFC { get; set; }
        public string Estatus { get; set; }
        public string Observaciones { get; set; }
        public Documento[]? Documentos { get; set; }
    }

    public class ProspectoUpdate
    {
        public int ProspectoID { get; set; }
        public string Estatus { get; set; }
        public string Observaciones { get; set; }
    }
}
