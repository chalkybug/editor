using Microsoft.AspNetCore.Mvc;
using Namek.Models;

namespace Namek.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(Users user)
        {
            // đoạn validate của .net
            if (ModelState.IsValid)
            {
                var name = user.uname;
                // handle login
                // compare password

                // set abc

                // if login true =>> chuyển sang trang gì đó

                // if false => vẫn ở trang login và thông báo lỗi
            }

            return View(user);
        }
    }
}
