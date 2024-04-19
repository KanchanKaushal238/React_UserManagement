import Link from "next/link";
import MainHeaderBackground from "./main-header-background";
import classes from "./main-header.module.css";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import trolley from "@/assets/trolley12.png";
import DropdownCategories from "../CategoryDropdown/DropdownCategories";
import { GetAllCart, GetDistinctCategories } from "@/lib/products";


export default async  function MainHeader() {

  const totalCartItems = await GetAllCart();

  const categories = await GetDistinctCategories();
  return (
    <>
      <div className={classes.stickyHeader}>
        <MainHeaderBackground />
        <header className={classes.header}>
          <Link className={classes.logo} href="/">
            <Image src={logo} alt="Logo Image" priority />
            <div className={classes.title}>Elegant Styles</div>
          </Link>

          <nav className={classes.nav}>
            <ul>
               <li>
                <button type = "button" className={classes.navButton}>
                  {/* <DropdownCategories categories= {categories}/> */}
                  <Link href = "/products/">Browse Products</Link>
                </button>
              </li> 
              <li>
                <Link href = "/cartdetails">
                  <p className={classes.cartP}>{totalCartItems.length}</p>
                  <Image
                    src={trolley}
                    alt="Shopping Cart"
                    className={classes.cartImage}
                    priority
                  ></Image>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
}
