using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserManagement_WebAPI.Models.AuthenticationModel;
using UserManagement_WebAPI.Util;

namespace UserManagement_WebAPI.Authentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        /// <summary>
        /// Logins the specified login.
        /// </summary>
        /// <param name="login">The login.</param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();

            User user = await AuthenticateUser(login);

            if(user != null)
            {
                var tokenString = GenerateJWTToken(user);

                response = Ok(new
                {
                    token = tokenString,
                    userName = user.EmailAddress,
                    userRole = user.UserRole
                });
            }

            return response;
        }

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="loginCredentials">The login credentials.</param>
        /// <returns></returns>
        public async Task<User> AuthenticateUser(User loginCredentials)
        {
            if (loginCredentials.UserName != null && loginCredentials.Password != null && loginCredentials.EmailAddress != null)
            {
                User user = null;
                List<SqlParameter> sqlParameters = new List<SqlParameter> {
                    new SqlParameter("@UserName", loginCredentials.UserName), 
                    new SqlParameter("@Password", loginCredentials.Password),
                    new SqlParameter("@Email", loginCredentials.EmailAddress)
                };

                try
                {
                    DataTable dt = await SqlDataAccessHelper.ExecuteQueryAsDataTable(_config["ConnectionStrings:DbCon"], "GetUserDetails", CommandType.StoredProcedure, sqlParameters.ToArray());

                    if(dt != null && dt.Rows.Count == 1)
                    {
                        foreach (DataRow dr in dt.Rows)
                        {
                            user = new User()
                            {
                                UserName = Convert.ToString(dr["UserName"]),
                                EmailAddress = Convert.ToString(dr["EmailAddress"]),
                                UserRole = Convert.ToString(dr["UserRole"])
                            };
                        }
                    }
                }
                catch(Exception)
                {
                    return null;
                }

                return user;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Generates the JWT token.
        /// </summary>
        /// <param name="userInfo">The user information.</param>
        /// <returns></returns>
        public string GenerateJWTToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SecretKey"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.EmailAddress),
                new Claim("userName", userInfo.UserName.ToString()),
                new Claim("role", userInfo.UserRole),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
               );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
