import {
  GetAllImages,
  GetAllProducts,
  GetDistinctCategories,
} from "@/lib/products";
import Image from "next/image";
import classes from "./page.module.css";
import DropdownCategories from "@/components/CategoryDropdown/DropdownCategories";
import ProductImages from "@/components/ProductImages.js/ProductImages";

export default async function Home() {
  const categories = await GetDistinctCategories();
  const images = await GetAllImages();

  return (
    <>
      <header className={classes.header}>
        <div className={classes.images}>
          <ProductImages images={images} />
        </div>

        <div className={classes.content}>
          <h1>
            Elegant style, created
            <span className={classes.highlight}>for you</span></h1>
            <p>Browse the products by your choice.....</p>
          
          <DropdownCategories categories={categories} />
        </div>
      </header>
      <main className="flex p-14 z-[-1]">
    
      </main>
    </>
  );
}
