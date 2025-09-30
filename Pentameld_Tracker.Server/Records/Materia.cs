using static Pentameld_Tracker.Server.Extensions.GearExtensions;

namespace Pentameld_Tracker.Server.Records
{
    public class Materia
    {
        public MateriaType MateriaType { get; set; }
        public string MateriaTypeString => MateriaType.ToString();

        public Guid Id { get; set; } = Guid.NewGuid();
        public int MeldSlot { get; set; }
        public Guid GearId { get; set; }

        public int AverageNumberOfMelds { get; set; }

        public void SetAverageNumberOfMelds(GearMeldType meldType)
        {
            var index = MeldSlot;

            if (meldType == GearMeldType.SingleMeld)
            {
                index += 1;
            }
            AverageNumberOfMelds = index switch
            {
                0 or 1 => 1,
                2 => 6,
                3 => 10,
                4 => 15,
                5 => 20,
            };
        }
    }
    public enum MateriaType
    {
        Control,
        Craftsmanship,
        CP
    }
}
