using DB;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace ExamenASP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProspectoController : ControllerBase
    {
        private ExamenASPContext _context;
        
        public ProspectoController(ExamenASPContext context)
        {
            _context = context;
        }

        [HttpGet]
        public Reply Get() {
            Reply oR = new Reply();
            oR.result = 0;
                try
                {
                    var contexto = _context.Prospectos.ToArray();
                    if (contexto != null && contexto.Length > 0)
                    {
                        oR.data = contexto;
                        oR.result = 200;
                        oR.message = "Prospectos encontrados";
                    }
                    else
                    {
                        oR.result = 404;
                        oR.message = "No se encontraron datos";
                    }
                }
                catch (Exception ex)
                {
                oR.message = ex.Message;
            }
            return oR;
        }
        [HttpGet("{id}")]
        public Reply Get(int id)
        {
            Reply oR = new Reply();
            oR.result = 0;
            try
            {
                var documento = _context.Documentos.Where(d => d.ProspectoID == id).ToArray();
                var prospecto = _context.Prospectos.Find(id);
                var documentos = new List<DocumentoViewModel>();
                foreach (var item in documento)
                {
                    documentos.Add(new DocumentoViewModel(item));
                }
                if (prospecto != null)
                {
                    var contexto = new ProspectoViewModel(prospecto, documento);
                    oR.data = contexto;
                    oR.result = 200;
                    oR.message = "Prospecto encontrado";
                }
                else
                {
                    oR.result = 404;
                    oR.message = "No se encontraron datos";
                }
            }
            catch (Exception ex)
            {
                oR.message = ex.Message;
            }
            return oR;
        }
        [HttpPost]
        public Reply Post(Prospecto model)
        {
            Reply oR = new Reply();
            oR.result = 0;
            try
            {
                var contexto = _context.Prospectos.Add(new Prospecto
                {
                    Nombre = model.Nombre,
                    ApellidoPaterno = model.ApellidoPaterno,
                    ApellidoMaterno = model.ApellidoMaterno,
                    Calle = model.Calle,
                    Numero = model.Numero,
                    Colonia = model.Colonia,
                    CodigoPostal = model.CodigoPostal,
                    Telefono = model.Telefono,
                    RFC = model.RFC,
                    Estatus = model.Estatus,
                    Observaciones = model.Observaciones
                });
                _context.SaveChanges();
                foreach (var item in model.Documentos)
                {
                    _context.Documentos.Add(new Documento
                    {
                        Nombre = item.Nombre,
                        Archivo = item.Archivo,
                        ProspectoID = contexto.Entity.ProspectoID
                    });
                }
                _context.SaveChanges();
                oR.data = contexto.Entity;
                oR.result = 200;
                oR.message = "Se guardaron los datos correctamente";
            }
            catch (Exception ex)
            {
                oR.message = ex.Message;
            }

            return oR;
        }
        [HttpPut]
        public Reply Put(ProspectoUpdate model)
        {
            Reply oR = new Reply();
            oR.result = 0;
            try
            {
                var busqueda = _context.Prospectos.Find(model.ProspectoID);
                if (busqueda != null && busqueda.Estatus == "Enviado")
                {
                    busqueda.Estatus = model.Estatus;
                    busqueda.Observaciones = model.Observaciones;
                    _context.SaveChanges();
                    oR.data = busqueda;
                    oR.result = 200;
                    oR.message = "Se actualizaron los datos correctamente";
                } 
                else
                {
                    oR.data = null;
                    oR.result = 404;
                    oR.message = "No se encontro el registro a actualizar";
                }
            }
            catch (Exception ex)
            {
                oR.message = ex.Message;
            }

            return oR;
        }
    }
}
