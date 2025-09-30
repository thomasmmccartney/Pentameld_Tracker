namespace Pentameld_Tracker.Server.Extensions
{
    public static class GearExtensions
    {
        public static GearMeldType ToGearMeldType(this GearSlot gearSlot)
        {
            return gearSlot switch
            {

                GearSlot.Head or
                GearSlot.Body or
                GearSlot.Gloves or
                GearSlot.Legs or
                GearSlot.Feet => GearMeldType.DoubleMeld,
                GearSlot.MainHand or
                GearSlot.OffHand or
                GearSlot.Earring or
                GearSlot.Necklace or
                GearSlot.Bracelet or
                GearSlot.Ring => GearMeldType.SingleMeld,
            };
        }


        public enum GearSlot
    {
        MainHand,
        OffHand,
        Head,
        Body,
        Gloves,
        Legs,
        Feet,
        Earring,
        Necklace,
        Bracelet,
        Ring,

    }
    public enum GearMeldType
    {
        SingleMeld,
        DoubleMeld,

    }
    }
}