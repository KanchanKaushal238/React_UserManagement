using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement_WebAPI.Models
{
    [Table("UserDetails")]
    public class UserDetailsDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public byte[] Password { get; set; }
        public string PhoneNumber { get; set; }
        public string CurrentTechnology { get; set; }
        public string UserRole { get; set; }
    }

    [Table("User_EducationDetails")]
    public class EducationDetailsDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EducationId { get; set; }
        public int UserId { get; set; }
        public string Qualification { get; set; }
        public string University { get; set; }
        public string Percentage { get; set; }
        public string PassingYear { get; set; }
        public string Stream { get; set; }
        public string Address { get; set; }
    }

    [Table("User_WorkExperienceDetails")]
    public class WorkExperienceDetailsDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WorkExperienceId { get; set; }
        public int UserId { get; set; }
        public string CompanyName { get; set; }
        public string Designation { get; set; }
        public string Duration { get; set; }
        public string Technology { get; set; }
    }
}
