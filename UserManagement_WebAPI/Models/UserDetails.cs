using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement_WebAPI.Models
{
    /// <summary>
    /// UserDetailsForRegistration
    /// </summary>
    public class UserDetailsForRegistration
    {
        public UserDetails userDetails { get; set; }
        public List<EducationDetails> educationDetails { get; set; }
        public List<WorkExperienceDetails> workExperienceDetails { get; set; }
    }

    /// <summary>
    /// UserDetails
    /// </summary>
    public class UserDetails
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string CurrentTechnology { get; set; }
        public string UserRole { get; set; }
    }

    /// <summary>
    /// EducationDetails
    /// </summary>
    public class EducationDetails
    {
        public int EducationId { get; set; }
        public int UserId { get; set; }
        public string Qualification { get; set; }
        public string University { get; set; }
        public string Percentage { get; set; }
        public string PassingYear { get; set; }
        public string Stream { get; set; }
        public string Address { get; set; }
    }

    /// <summary>
    /// WorkExperienceDetails
    /// </summary>
    public class WorkExperienceDetails
    {
        public int WorkExperienceId { get; set; }
        public int UserId { get; set; }
        public string CompanyName { get; set; }
        public string Designation { get; set; }
        public string Duration { get; set; }
        public string Technology { get; set; }
    }

    /// <summary>
    /// ResponseModel
    /// </summary>
    public class ResponseModel
    {
        public int StatusCode { get; set; }
        public string ResponseMessage { get; set; }
    }
}
