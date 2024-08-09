using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainController : ControllerBase
    {
        private readonly AppSettings appSettings;

        public MainController(IOptions<AppSettings> appSettingsOptions)
        {
            appSettings = appSettingsOptions.Value;
        }

        [HttpPost]
        [RequestSizeLimit(2_097_152)]
        public async Task UploadFile(IFormFile formFile)
        {
            if (formFile != null)
            {
                using var fileStream = new FileStream(appSettings.UploadedFilesFolderPath + formFile.FileName, FileMode.Create);
                await formFile.CopyToAsync(fileStream);
            }
        }
    }
}
