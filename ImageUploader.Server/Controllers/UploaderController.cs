using ImageUploader.Server.Models;
using Microsoft.AspNetCore.Mvc;
using IWebHostEnvironment = Microsoft.AspNetCore.Hosting.IWebHostEnvironment;

namespace ImageUploader.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploaderController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<UploaderController> _logger;

        public UploaderController(IWebHostEnvironment environment, ILogger<UploaderController> logger)
        {
            _logger = logger;
            _env = environment;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
            })
            .ToArray();
        }

        [HttpGet]
        [Route("GetImage")]
        public ActionResult GetImage(string name)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\uploads", name);
            var steam = System.IO.File.OpenRead(path);

            return File(steam, "image/jpeg");
        }

        [HttpPost]
        [Route("UploadImage")]
        public ActionResult<string> UploadImage(FilePayload payload)
        {
            var path = this._env.WebRootPath + "\\uploads\\";

            if (payload != null && payload?.File?.Length > 0)
            {
                try
                {
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }

                    using (FileStream stream = System.IO.File.Create(path + payload.File.FileName))
                    {
                        payload.File.CopyTo(stream);
                        stream.Flush();

                    }

                    return Ok(payload.File.FileName);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }

            return BadRequest();
        }
    }
}
