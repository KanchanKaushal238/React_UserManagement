using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using UserManagement_WebAPI.Context;
using UserManagement_WebAPI.Mapper;
using UserManagement_WebAPI.Models;
using UserManagement_WebAPI.Models.ProductModels;

namespace UserManagement_WebAPI.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;
        public CartService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseModel> AddCartProduct(CartModel cartModel)
        {
            try
            {
                if (cartModel.ProductId != 0)
                {
                    CartModelDTO cartDetails = _context.CartContext.
                           Where(x => x.ProductId == cartModel.ProductId).FirstOrDefault();

                    if (cartDetails != null)
                    {
                        cartDetails.quantity += 1;
                        cartDetails.price = Convert.ToString(float.Parse(cartDetails.price) * (cartDetails.quantity));

                        _context.CartContext.Update(cartDetails);

                        int updateresult = await _context.SaveChangesAsync();

                        if (updateresult == 0)
                        {
                            return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Cart not updated");
                        }
                        return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.OK), "Cart updated Successfully");
                    }
                    else
                    {
                        CartModelDTO cartProducts = JsonConvert.DeserializeObject<CartModelDTO>(JsonConvert.SerializeObject(cartModel));
                        cartProducts.quantity = 1;
                        await _context.CartContext.AddAsync(cartProducts);

                        int result = await _context.SaveChangesAsync();

                        if (result > 0)
                        {
                            return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Cart not added");
                        }

                        return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.OK), "Product added in cart Successfully");
                    }
                }
                else
                {
                    return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Invalid data");
                }
            }
            catch(Exception ex)
            {
                return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.InternalServerError), "Server Error");
            }
        }

        public async Task<ResponseModel> DeleteCartProducts(int cartId)
        {
            try
            {
                if (cartId != 0)
                {
                    CartModelDTO cartDetails = _context.CartContext.
                           Where(x => x.id == cartId).FirstOrDefault();

                    float priceofSingleItem = float.Parse(cartDetails.price) / cartDetails.quantity;

                    if(cartDetails!=null)
                    {
                        if (cartDetails.quantity > 1)
                        {
                            cartDetails.quantity -= 1;
                            cartDetails.price = Convert.ToString(priceofSingleItem * cartDetails.quantity);

                            _context.CartContext.Update(cartDetails);

                            int updateresult = await _context.SaveChangesAsync();
                            if (updateresult == 0)
                            {
                                return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Cart not updated");
                            }
                            return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.OK), "Cart updated Successfully");
                        }
                        else
                        {
                            _context.CartContext.Remove(cartDetails);

                            int result = await _context.SaveChangesAsync();

                            if (result == 0)
                            {
                                return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Cart not deleted");
                            }

                            return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.OK), "Cart deleted Successfully");
                        }
                    }
                    else
                    {
                        return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Product not found");
                    }
                }
                else
                {
                    return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Invalid data");
                }
            }
            catch (Exception)
            {
                return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.InternalServerError), "Server Error");
            }
        }

        public async Task<List<CartModelDTO>> GetCartProducts()
        {
            try
            {
                var cartDetails = from data in _context.CartContext select data;
                if(cartDetails != null)
                {
                    return await cartDetails.ToListAsync();
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<ResponseModel> UpdateCartProduct(CartModel cartModel)
        {
            try
            {
                if (cartModel.id != 0)
                {
                    CartModelDTO cartDetails = _context.CartContext.
                           Where(x => x.id == cartModel.id).FirstOrDefault();

                    if (cartDetails != null)
                    {
                        cartDetails.quantity += 1;
                        cartDetails.price = Convert.ToString(float.Parse(cartDetails.price) * cartDetails.quantity);

                        _context.CartContext.Update(cartDetails);

                        int result = await _context.SaveChangesAsync();

                        if (result == 0)
                        {
                            return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Cart not updated");
                        }

                        return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.OK), "Cart updated Successfully");
                    }
                    else
                    {
                        return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Product not found");
                    }
                }
                else
                {
                    return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.BadRequest), "Invalid data");
                }
            }
            catch (Exception)
            {
                return RegistrationMapper.MapResponse(Convert.ToInt32(HttpStatusCode.InternalServerError), "Server Error");
            }
        }
    }
}
