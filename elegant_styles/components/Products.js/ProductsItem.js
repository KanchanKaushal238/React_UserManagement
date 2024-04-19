'use client'

import Image from "next/image";
import classes from "./ProductsItem.module.css";
import Link from "next/link";
import { AddCartButton } from "../Cart/CartButton";


export default function ProductsItem({
  id,
  title,
  price,
  description,
  category,
  rating,
  image,
  productDetails
}) {
  let rate = 0;
  let rateArr = [];
  let rateArrGrey = [];

  if (rating) {
    rate = Math.round(rating.rate);
    for (let i = 1; i <= rate; i++) {
      rateArr.push(i);
    }

    let rateGrey = 5 - rate;
    for (let i = 1; i <= rateGrey; i++) {
      rateArrGrey.push(i);
    }
  }


  return (
    <article className={classes.product} key={`article-${title}`}>
      <div className={classes.banner} key={`category-${title}${id}`}>{category}</div>
      <header key={`header1-${title}${id}`}>
        <div className={classes.image} key={`div1-${title}`}>
          <Image src={image} alt={title} fill 
          sizes="(max-width: 768px) auto, (max-width: 1200px) auto"
          priority
          quality={80}
          key={`Image1-${title}${id}`} />
        </div>
        <div className={classes.headerText} key={`div2-${title}${id}`}>
          <h2 key={`h2-${title}${id}`} title={title}>{title}</h2>
          <p key={`p1-${title}${id}`} className={classes.productprice}>
            ${price}{" "}
          </p>
        </div>
      </header>
      <div className={classes.stars} key = {`rate-${title}${id}`}>
        <div className={classes.starsDiv} key = {`ratediv1-${title}${id}`}>
          {rateArr.length > 0 &&
            rateArr.map((index) => (
              <svg
                className={classes.checkedStars}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                key = {`svgindex-${index}`}
              >
                <path key = {`ratePath-${index}`}
                 d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
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
                key = {`rateArrGrey-${index}`}
              >
                <path key = {`rateArrGreyPath-${index}`}
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
        </div>
        <span key = {`spanRate-${id}`}
          className={classes.rate}>
          {rating.rate}
        </span>
      </div>
      <div className={classes.content} key={`div3-${title}${title}`}>
        <div className={classes.actions} key={`div4-${title}${title}`}>
          <Link href={`/product/${id}`} key={`link-${title}${title}`}>
            View Details
          </Link>
          <div className={classes.addCartButton} >
          <AddCartButton productDetail={productDetails} key={`link-${title}${id}`}>Add to Cart +</AddCartButton></div>
        </div>
      </div>
    </article>
  );
}
