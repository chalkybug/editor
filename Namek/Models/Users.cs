using System.ComponentModel.DataAnnotations;

namespace Namek.Models
{
    public class Users
    {
        public int? id { get; set; }
        [Required(ErrorMessage = "Please enter username")]
        public string? uname { get; set; }
        public string? upass { get; set; }
    }
}
