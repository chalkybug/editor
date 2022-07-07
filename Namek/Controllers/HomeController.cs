using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Namek.Models;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using System.Diagnostics;
using System.Globalization;
using System.Text;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace Namek.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHostingEnvironment _environment;
        public HomeController(ILogger<HomeController> logger, IHostingEnvironment environment)
        {
            _logger = logger;
            _environment = environment;
        }
        [HttpGet]
        public IActionResult Index()
        {

            return RedirectToAction("Video2");
        }

        [HttpGet]
        public ActionResult Export()
        {
            const int SECOND = 5; // 0.05
            const int BREAK_TIME_START = 5; // 0.05
            const int BREAK_TIME_END = 5; // 0.05

            // custom path save file 
            var csvName = $"{_environment.WebRootPath}\\images\\{DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss")}filePersons.csv";
            // get list data
            var myPersonObjects = CreateTestItems();
            // config csv
            var configPersons = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true
            };
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            using (var writer = new StreamWriter(csvName, false, Encoding.UTF8))
            using (var csv = new CsvWriter(writer, configPersons))
            {
                csv.Context.RegisterClassMap<PersonMapByName>();
                csv.WriteRecords(myPersonObjects);
            }
            //// delete file after using
            //FileInfo file = new FileInfo(csvName);
            //if (file.Exists)//check file exsit or not  
            //{
            //    file.Delete();
            //}
            // return file
            return View();
        }

        private List<Person> CreateTestItems()
        {
            var resultsList = new List<Person>();
            for (int i = 0; i < 15; i++)
            {
                var time = DateTime.Now;
                var a = new Person()
                {
                    FirstName = i + "",
                    LastName = "1094121510-001",
                    IsActive = "日下川新規放水路（?口側）工事",
                    Time = DateTime.Now.AddMinutes(-5),
                };
                resultsList.Add(a);
            }
            return resultsList;
        }
        public IActionResult Create(Workout info)
        {
            return View();
        }
        public IActionResult Video()
        {
            return View();
        }
        public IActionResult Video2()
        {
            return View();
        }
        public IActionResult Video3()
        {
            return View();
        }
        public IActionResult Chart()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}