'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import classes from './ProductImages.module.css';

export default function ProductImages({images}){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className={classes.slideshow}>
        
        {images.map((image, index) => (

          <Image
            key={index}
            src={image}
            className={index === currentImageIndex ? classes.active : ''}
            alt={image}
            fill
            sizes="(max-width: 768px) auto, (max-width: 1200px) auto"
            priority
            quality={80}
          />
        ))}
      </div>
    );
}