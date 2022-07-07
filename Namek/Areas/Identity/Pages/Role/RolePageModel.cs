using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Identity;
using Namek.Data;

namespace Namek.Areas.Identity.Pages.Role
{
    public class RolePageModel : PageModel
    {
        protected readonly RoleManager<IdentityRole> _roleManager;
        protected readonly NamekContext _context;

        public RolePageModel(RoleManager<IdentityRole> roleManager, NamekContext context)
        {
            _roleManager = roleManager;
            _context = context;
        }
    }
}
