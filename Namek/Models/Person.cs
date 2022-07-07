using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Namek.Models
{
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Age { get; set; }
        public string IsActive { get; set; }
        //[Format("HH:ss")]
        public DateTime Time { get; set; }
    }
}
