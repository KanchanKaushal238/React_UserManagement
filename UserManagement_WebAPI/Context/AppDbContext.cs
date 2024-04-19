using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement_WebAPI.Models;
using UserManagement_WebAPI.Models.ProductModels;

namespace UserManagement_WebAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<UserDetailsDTO> UserDetailsContext { get; set; }
        public DbSet<EducationDetailsDTO> EducationDetailsContext { get; set; }
        public DbSet<WorkExperienceDetailsDTO> WorkExperienceDetailsContext { get; set; }

        public DbSet<CartModelDTO> CartContext { get; set; }
    }
}
