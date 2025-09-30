using Microsoft.AspNetCore.Mvc;
using Pentameld_Tracker.Server.Records;
using static Pentameld_Tracker.Server.Extensions.GearExtensions;

namespace Pentameld_Tracker.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PentameldMateriaProbabilityController : ControllerBase
    {
        private readonly ILogger<PentameldMateriaProbabilityController> _logger;

        public PentameldMateriaProbabilityController(ILogger<PentameldMateriaProbabilityController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetPentameldMateriaProbability")]
        public IEnumerable<Materia> Get([FromQuery] int meldType, [FromQuery] string gearId)
        {
            return Enumerable.Range(0, 5).Select(index => new Materia
            {
                MateriaType = (MateriaType)Random.Shared.Next(3),
                MeldSlot = index + 1,
                GearId = Guid.Parse(gearId)
             
          
            }).ToArray();
        }

    }
}
