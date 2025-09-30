using Microsoft.AspNetCore.Mvc;
using Pentameld_Tracker.Server.Records;
using System.Text;
using System.Text.Json;
using static Pentameld_Tracker.Server.Extensions.GearExtensions;

namespace Pentameld_Tracker.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecordsController : ControllerBase
    {
        private readonly ILogger<RecordsController> _logger;

        public RecordsController(ILogger<RecordsController> logger)
        {
            _logger = logger;
        }

        [HttpPost("createGear")]
        public IActionResult CreateGear()
        {
            var gear = new Gear();
            return Ok(gear);
        }

        [HttpPost("createMateria")]
        public IActionResult CreateMateria([FromQuery] string gearId, [FromQuery] int meldSlot, [FromQuery] int gearMeldType)
        {
            return Ok(new Materia() { GearId = Guid.Parse(gearId), MeldSlot = meldSlot });
        }
    }
}
