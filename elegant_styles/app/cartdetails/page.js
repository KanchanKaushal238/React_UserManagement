import { GetAllCart } from "@/lib/products";
import classes from "./page.module.css";
import {
  DeleteCartButton,
  UpdateCartButton,
} from "@/components/Cart/CartButton";
import Link from "next/link";

function calculateTotalPrice(cartProduct) {
  let totalPrice = 0;

  if (cartProduct) {
    cartProduct.forEach((product) => {
      totalPrice += parseFloat(product.price);
    });

    return parseFloat(totalPrice.toFixed(2));
  }
}

export default async function CartPage() {
  const cartDetails = await GetAllCart();

  return (
    <>
      <main className={classes.content}>
        <h1>Your Cart Details</h1>
        <p className={classes.priceItem}>
          Cart Total : {cartDetails.errorCode && '0'} {!cartDetails.errorCode  && calculateTotalPrice(cartDetails)}
        </p>

        {
          cartDetails.errorCode &&
          <>
            {" "}
            <p className={classes.noItems}>{cartDetails.errorCode} - {cartDetails.message} !!</p>
            <p className={classes.noItems}>
              Browse products to add in the cart......
            </p>
          </>
        }

        {cartDetails.length == 0 && (
          <>
            {" "}
            <p className={classes.noItems}>No Items in cart !!</p>
            <p className={classes.noItems}>
              Browse products to add in the cart......
            </p>
          </>
        )}
        {cartDetails.length > 0 && (
          <ul>
            {cartDetails.map((cartDetail) => (
              <>
                <div className={classes.listContent}>
                  <li key={cartDetail.id}>
                    {cartDetail.title} (
                    <span className={classes.price}>
                      ${parseFloat(cartDetail.price).toFixed(2)}
                    </span>
                    )
                  </li>
                  <div className={classes.actions}>
                    <Link href="/cartdetails" className={classes.linkAction}>
                      <UpdateCartButton productDetail={cartDetail}>
                        +
                      </UpdateCartButton>{" "}
                    </Link>
                    {cartDetail.quantity}
                    <Link href="/cartdetails" className={classes.linkAction}>
                      <DeleteCartButton id={cartDetail.id}>-</DeleteCartButton>{" "}
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
