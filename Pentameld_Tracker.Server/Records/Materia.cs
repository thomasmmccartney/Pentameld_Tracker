using static Pentameld_Tracker.Server.Extensions.GearExtensions;

namespace Pentameld_Tracker.Server.Records
{
    public class Materia
    {
        public MateriaType MateriaType { get; set; }
        public string MateriaTypeString => MateriaType.ToString();
        public Guid Id => Guid.NewGuid();
        public int MeldSlot { get; set; }
        public Guid GearId { get; set; }

        public int AverageNumberOfMelds { get; set; }

    }

    public enum MateriaType
    {
        Control,
        Craftsmanship,
        CP
    }
}
