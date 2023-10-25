using DB;

namespace ExamenASP
{
    public class DocumentoViewModel
    {
        public DocumentoViewModel(Documento documento)
        {
            this.DocumentoID = documento.DocumentoID;
            this.Nombre = documento.Nombre;
            this.ProspectoId = documento.ProspectoID;
            this.Archivo = documento.Archivo;
        }
        public int DocumentoID { get; set; }

        public string Nombre { get; set; }

        public string Archivo { get; set; }

        public int ProspectoId { get; set; }
    }

}
