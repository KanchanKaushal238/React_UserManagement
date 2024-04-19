using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement_WebAPI.Models;
using UserManagement_WebAPI.Models.ProductModels;
using UserManagement_WebAPI.Services;

namespace UserManagement_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _service;

        public CartController(IConfiguration config, ICartService service)
        {
            _service = service;
        }

        [HttpPost("AddCart")]
        public async Task<ResponseModel> AddCart([FromBody] CartModel cartModel)
        {
            ResponseModel response = await _service.AddCartProduct(cartModel);

            return response;
        }

        [HttpPut("UpdateCart")]
        public async Task<ResponseModel> UpdateCart([FromBody] CartModel cartModel)
        {
            ResponseModel response = await _service.UpdateCartProduct(cartModel);

            return response;
        }

        [HttpGet("GetAllCart")]
        public async Task<List<CartModelDTO>> GetAllCart()
        {
            List<CartModelDTO> response = await _service.GetCartProducts();
            return response;
        }

        [HttpDelete("DeleteCart/{productId}")]
        public async Task<ResponseModel> DeleteCart(int productId)
        {
            ResponseModel response = await _service.DeleteCartProducts(productId);

            return response;
        }
    }
}
