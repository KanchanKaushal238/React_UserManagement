using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement_WebAPI.Models;

namespace UserManagement_WebAPI.Services
{
    public interface IRegistrationService
    {
        Task<ResponseModel> RegisterUser(UserDetailsForRegistration registrationModel, string connString);
    }
}
