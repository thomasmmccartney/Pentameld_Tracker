using Microsoft.AspNetCore.Mvc;
using Pentameld_Tracker.Server.Records;
using System.Text;
using System.Text.Json;

namespace Pentameld_Tracker.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PentameldGearExporterController : ControllerBase
    {
        private readonly ILogger<PentameldGearExporterController> _logger;

        public PentameldGearExporterController(ILogger<PentameldGearExporterController> logger)
        {
            _logger = logger;
        }

        [HttpPost("export")]
        public IActionResult Export([FromBody] GearRequest request)
        {
            var meldedGear = new List<MeldedGear>();

            foreach(var materia in request.Melds.SelectMany(x=>x))
            {
                materia.SetAverageNumberOfMelds(request.Gear.Where(x => x.Id.Equals(materia.GearId)).Single().MeldType);
            }

            foreach (var gearPiece in request.Gear)
            {
                meldedGear.Add(new MeldedGear(gearPiece, request.Melds.SelectMany(x=>x).Where(x => x.GearId.Equals(gearPiece.Id))));
            }

            var json = JsonSerializer.Serialize(meldedGear);
            var bytes = Encoding.UTF8.GetBytes(json);
            return File(bytes, "application/json", $"MyMelds.json");
        }
    }

    public class GearRequest
    {
        public List<Gear> Gear { get; set; }
        public List<List<Materia>> Melds { get; set; }
    }
}
