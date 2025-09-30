using Microsoft.AspNetCore.Mvc;
using Pentameld_Tracker.Server.Records;

namespace Pentameld_Tracker.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PentameldGearProbabilityController : ControllerBase
    {
        private readonly ILogger<PentameldGearProbabilityController> _logger;

        public PentameldGearProbabilityController(ILogger<PentameldGearProbabilityController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "import")]
        public IEnumerable<Gear> ImportFile()
        {
            return Enumerable.Range(0, 11).Append(10).Select(index => new Gear
            {
                Slot = (Extensions.GearExtensions.GearSlot)index,
            })
            .ToArray();
        }
    }
}
