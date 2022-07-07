// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Namek.Data;

namespace Namek.Areas.Identity.Pages.Role
{
    [Authorize(Roles = "Admin")]
    public class IndexModel : RolePageModel
    {
        public IndexModel(RoleManager<IdentityRole> roleManager, NamekContext context) : base(roleManager, context)
        {
        }

        public List<IdentityRole> roles { get; set; }
        public async Task OnGetAsync(string returnUrl = null)
        {
            roles = await _roleManager.Roles.ToListAsync();
        }
        public void OnPost() => RedirectToPage();
    }

}