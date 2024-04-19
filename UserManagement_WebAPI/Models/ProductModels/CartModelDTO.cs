using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement_WebAPI.Models.ProductModels
{
    [Table("Cart")]
    public class CartModelDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public int ProductId { get; set; }
        public string title { get; set; }
        public string price { get; set; }
        public string description { get; set; }
        public string category { get; set; }
        public int quantity { get; set; }
    }
}
