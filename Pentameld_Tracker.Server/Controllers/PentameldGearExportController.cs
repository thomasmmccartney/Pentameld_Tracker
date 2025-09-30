using Microsoft.AspNetCore.Mvc;
using Pentameld_Tracker.Server.Records;
using System.Text;
using System.Text.Json;

namespace Pentameld_Tracker.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PentameldGearExportController : ControllerBase
    {
        private readonly ILogger<PentameldGearExportController> _logger;

        public PentameldGearExportController(ILogger<PentameldGearExportController> logger)
        {
            _logger = logger;
        }

        [HttpGet("export")]
        public IActionResult Export([FromQuery] IEnumerable<Gear> gear, [FromQuery] IEnumerable<Materia> melds)
        {
            var meldedGear = new List<MeldedGear>();

            foreach (var gearPiece in gear)
            {
                meldedGear.Add(new MeldedGear(gearPiece, melds.Where(x => x.GearId.Equals(gearPiece.Id))));
            }

            var json = JsonSerializer.Serialize(meldedGear);
            var bytes = Encoding.UTF8.GetBytes(json);
            return File(bytes, "application/json", $"MyMelds.json");
        }
    }
}
