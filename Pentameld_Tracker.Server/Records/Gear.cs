using static Pentameld_Tracker.Server.Extensions.GearExtensions;

namespace Pentameld_Tracker.Server.Records
{
    public class Gear
    {
        public GearSlot Slot { get; set; }
        public Guid Id => Guid.NewGuid();
        public GearMeldType MeldType => Slot.ToGearMeldType();

        public string SlotString => Slot.ToString();
        public string MeldTypeString => MeldType.ToString();

    }
}
