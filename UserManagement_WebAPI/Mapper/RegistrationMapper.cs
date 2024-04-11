using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement_WebAPI.Models;

namespace UserManagement_WebAPI.Mapper
{
    public class RegistrationMapper
    {
        /// <summary>
        /// Maps the user details.
        /// </summary>
        /// <param name="userDetails">The user details.</param>
        /// <returns></returns>
        public static UserDetailsDTO MapUserDetails(UserDetails userDetails)
        {
            return JsonConvert.DeserializeObject<UserDetailsDTO>(JsonConvert.SerializeObject(userDetails));
        }

        /// <summary>
        /// Maps the work experience details.
        /// </summary>
        /// <param name="workExperienceDetails">The work experience details.</param>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>
        public static WorkExperienceDetailsDTO MapWorkExperienceDetails(WorkExperienceDetails workExperienceDetails, int userId)
        {
            workExperienceDetails.UserId = userId;
            return JsonConvert.DeserializeObject<WorkExperienceDetailsDTO>(JsonConvert.SerializeObject(workExperienceDetails));
        }

        /// <summary>
        /// Maps the education details.
        /// </summary>
        /// <param name="educationDetails">The education details.</param>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>
        public static EducationDetailsDTO MapEducationDetails(EducationDetails educationDetails, int userId)
        {
            educationDetails.UserId = userId;
            return JsonConvert.DeserializeObject<EducationDetailsDTO>(JsonConvert.SerializeObject(educationDetails));
        }

        /// <summary>
        /// Maps the response.
        /// </summary>
        /// <param name="statusCode">The status code.</param>
        /// <param name="statusMessage">The status message.</param>
        /// <returns></returns>
        public static ResponseModel MapResponse(int statusCode, string statusMessage)
        {
            return new ResponseModel
            {
                StatusCode = statusCode,
                ResponseMessage = statusMessage
            };
        }
    }
}
