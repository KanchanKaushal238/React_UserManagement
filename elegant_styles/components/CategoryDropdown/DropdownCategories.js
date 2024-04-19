"use client";

import { useState } from "react";
import classes from "./DropdownCategories.module.css";
import Link from "next/link";

export default function DropdownCategories({ categories }) {
  const [dropdownToggler, setDropdownToggler] = useState(false);

  const toggleDropdown = () => {
    setDropdownToggler(!dropdownToggler);
  };

  return (
    <>
      <button
        id="dropdownCategory"
        data-dropdown-toggle="dropdown"
        className={classes.dropdownButton}
        type="button"
        onClick={toggleDropdown}
      >
        Choose Product Category
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {dropdownToggler && (
        <div id="dropdown" className={classes.dropdowndiv}>
          <ul className={classes.ulDropdown} aria-labelledby="dropdownCategory">
            <li>
              <Link href="/products" className={classes.liDropdown}>
                All Products
              </Link>
            </li>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <li key={category}>
                  <Link href={`/products/${category}`} className={classes.liDropdown} key={index}>
                    {category}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
