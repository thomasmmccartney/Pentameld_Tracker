using static Pentameld_Tracker.Server.Extensions.GearExtensions;

namespace Pentameld_Tracker.Server.Records
{
    public record MeldedGear(Gear Gear, IEnumerable<Materia> Melds);
}
