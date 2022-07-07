namespace Namek.Models
{
    public class Workout
    {
        public virtual ICollection<Set> Sets { get; set; }
    }
    public class Set
    {
        public int Id { get; set; }
        public int Weight { get; set; }
        public int Reps { get; set; }
    }
}
