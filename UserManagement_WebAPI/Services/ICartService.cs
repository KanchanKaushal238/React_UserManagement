using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement_WebAPI.Models;
using UserManagement_WebAPI.Models.ProductModels;

namespace UserManagement_WebAPI.Services
{
    public interface ICartService
    {
        Task<ResponseModel> AddCartProduct(CartModel cartModel);
        Task<ResponseModel> UpdateCartProduct(CartModel cartModel);
        Task<List<CartModelDTO>> GetCartProducts();
        Task<ResponseModel> DeleteCartProducts(int productId);
    }
}
