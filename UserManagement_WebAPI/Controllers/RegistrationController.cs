using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement_WebAPI.Models;
using UserManagement_WebAPI.Services;

namespace UserManagement_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IRegistrationService _service;

        public RegistrationController(IConfiguration config, IRegistrationService service)
        {
            _config = config;
            _service = service;
        }

        [HttpPost("RegisterUser")]
        public async Task<ResponseModel> RegisterUser([FromBody] UserDetailsForRegistration registrationModel)
        {
            ResponseModel response = await _service.RegisterUser(registrationModel, _config["ConnectionStrings:DbCon"]);

            return response;
        }
    }
}
