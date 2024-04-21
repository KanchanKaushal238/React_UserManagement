import ProductsItem from "./ProductsItem";
import classes from './ProductGrid.module.css';

export default function ProductGrid({products})
{
    return (
        <ul className={classes.products}>
          {products.map((product) => 
            <li key={product.id}>
              <ProductsItem key = {product.title} productDetails = {product} {...product}></ProductsItem> 
            </li>
          )}
        </ul>
      );
}