"use client";

import Image from "next/image";
import { useState } from "react";

const Product = ({ items }: { items?: any }) => {
  const [index, setIndex] = useState(0);
  // console.log("items", items);
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={items?.images[index]?.image}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items?.images?.map((item: any, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item.image}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item?.image}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
