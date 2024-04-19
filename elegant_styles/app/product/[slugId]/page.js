import {
  GetSingleProduct,
} from "@/lib/products";
import Image from "next/image";
import classes from "./page.module.css";
import Link from "next/link";
import { AddCartButton } from "@/components/Cart/CartButton";


export default async function SingleProductPage({ params }) {
  const productDetail = await GetSingleProduct(params.slugId);

  let rate = 0;
  let rateArr = [];
  let rateArrGrey = [];

  if (productDetail && productDetail.rating) {
    rate = Math.round(productDetail.rating.rate);
    for (let i = 1; i <= rate; i++) {
      rateArr.push(i);
    }

    let rateGrey = 5 - rate;
    for (let i = 1; i <= rateGrey; i++) {
      rateArrGrey.push(i);
    }
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.images}>
          <div className={classes.imageClass}>
            <Image
              src={productDetail.image}
              className={classes.active}
              alt={productDetail.title}
              fill
              sizes="(max-width: 768px) auto, (max-width: 1200px) auto"
              priority
              quality={80}
            />
          </div>
        </div>

        <div className={classes.content}>
          <h1>{productDetail.title}</h1>

          <div className={classes.stars}>
            <div className={classes.starsDiv}>
              {rateArr.length > 0 &&
                rateArr.map((index) => (
                  <svg
                    className={classes.checkedStars}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    key={`svgindex-${index}`}
                  >
                    <path
                      key={`ratePath-${index}`}
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                ))}

              {rateArrGrey.length > 0 &&
                rateArrGrey.map((index) => (
                  <svg
                    className={classes.uncheckedStars}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    key={`rateArrGrey-${index}`}
                  >
                    <path
                      key={`rateArrGreyPath-${index}`}
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                ))}
            </div>
            <span className={classes.rate}>{productDetail.rating.rate}</span>
          </div>

          <p className={classes.price}>${productDetail.price}</p>
          <p className={classes.description}>{productDetail.description}</p>
          
              <div className={classes.actions}>
                <p><Link href="/cartdetails">Go to cart</Link></p>
                
                <p><AddCartButton productDetail={productDetail}>Add to Cart +</AddCartButton></p>
              </div>
        
          {/* <DropdownCategories categories={categories} /> */}
        </div>
      </header>
      <main className="flex p-14 z-[-1]"></main>
    </>
  );
}
