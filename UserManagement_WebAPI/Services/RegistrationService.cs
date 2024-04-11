using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using UserManagement_WebAPI.Context;
using UserManagement_WebAPI.Mapper;
using UserManagement_WebAPI.Models;
using UserManagement_WebAPI.Util;

namespace UserManagement_WebAPI.Services
{
    public class RegistrationService : IRegistrationService
    { 

        private readonly AppDbContext _context;
        public RegistrationService(AppDbContext context)
        {
            _context = context;
        }

        public WorkExperienceDetailsDTO JSONConvert { get; private set; }

        /// <summary>
        /// Registers the user.
        /// </summary>
        /// <param name="registrationModel">The registration model.</param>
        /// <returns></returns>
        public async Task<ResponseModel> RegisterUser(UserDetailsForRegistration registrationModel, string connString)
        {
            int workExperienceResult = 0;
            int educationDetailsResult = 0;

            try
            {
                UserDetailsDTO user = _context.UserDetailsContext.
                           Where(x => x.UserName == registrationModel.userDetails.UserName ||
                           x.EmailAddress == registrationModel.userDetails.EmailAddress)
                           .FirstOrDefault();

                if (user != null && user?.UserName != null && user?.UserId != 0)
                {
                    return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.Conflict), "Duplicate Record, UserName or Email Already exist");
                }

                List<SqlParameter> sqlParameters = new List<SqlParameter> {
                    new SqlParameter("@UserName", registrationModel?.userDetails?.UserName),
                    new SqlParameter("@Password",  registrationModel?.userDetails?.Password),
                    new SqlParameter("@Email",  registrationModel?.userDetails?.EmailAddress),
                    new SqlParameter("@CurrentTechnology",  registrationModel?.userDetails?.CurrentTechnology),
                    new SqlParameter("@UserRole",  registrationModel?.userDetails?.UserRole),
                    new SqlParameter("@PhoneNumber",  registrationModel?.userDetails?.PhoneNumber),
                };


                DataTable dt = await SqlDataAccessHelper.ExecuteQueryAsDataTable(connString, "InsertUserDetails", CommandType.StoredProcedure, sqlParameters.ToArray());
                int userId = 0;
                if (dt != null && dt.Rows.Count == 1)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        userId  = Convert.ToInt32(dr["UserId"]);
                    }
                }

                if(userId > 0)
                {
                    foreach (var experienceDetail in registrationModel.workExperienceDetails)
                    {
                        WorkExperienceDetailsDTO workExperienceDetailsDTO = RegistrationMapper.MapWorkExperienceDetails(experienceDetail, userId);

                        await _context.WorkExperienceDetailsContext.AddAsync(workExperienceDetailsDTO);
                    }
                    workExperienceResult = await _context.SaveChangesAsync();

                    foreach (var eduDetail in registrationModel.educationDetails)
                    {
                        EducationDetailsDTO educationDetailsDTO = RegistrationMapper.MapEducationDetails(eduDetail, userId);

                        await _context.EducationDetailsContext.AddAsync(educationDetailsDTO);
                    }
                    educationDetailsResult = await _context.SaveChangesAsync();

                    if ((registrationModel?.workExperienceDetails?.Count > 0 && workExperienceResult != registrationModel?.workExperienceDetails?.Count) ||
                        (registrationModel?.educationDetails?.Count > 0 && educationDetailsResult != registrationModel?.educationDetails?.Count))
                    {
                        return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.PartialContent), "User Registered Partially");
                    }

                    return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.OK), "User Registered Successfully");
                }

                return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "User Not Registered");
            }
            catch(Exception ex)
            {
                return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.InternalServerError), "Server Error");
            }
        }
    }
}
