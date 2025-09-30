using Microsoft.AspNetCore.Mvc;
using Pentameld_Tracker.Server.Records;
using System.Text;
using System.Text.Json;

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
            return Ok(new Gear());
        }

        [HttpPost("createMateria")]
        public IActionResult CreateMateria([FromQuery] string gearId, [FromQuery] int meldSlot)
        {
            return Ok(new Materia() {GearId = Guid.Parse(gearId), MeldSlot = meldSlot});
        }
    }
}
