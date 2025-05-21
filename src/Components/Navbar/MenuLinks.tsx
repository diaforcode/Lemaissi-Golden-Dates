"use client";

import Link from "next/link";
import { useState } from "react";
import NavImages from "./NavImages";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { Translations } from "@/types/translations";
import { Routes } from "@/constants/enums";
import { useParams } from "next/navigation";
// import { Bags, Collection, NewIn } from "@/Lib/data";

const MenuLinks = ({ translations }: { translations: Translations }) => {
  // const [showCollections, setShowCollections] = useState(false);
  // const [showNewIn, setShowNewIn] = useState(false);
  // const [showBags, setShowBags] = useState(false);

  // const Arrow_down_menu = () => {
  //   return (
  //     <Image
  //       src="/arrow_down_menu.png"
  //       alt=""
  //       width={24}
  //       height={24}
  //       className="cursor-pointer p-1 "
  //     />
  //   );
  // };
  // const Arrow_up_menu = () => {
  //   return (
  //     <Image
  //       src="/arrow_up_menu.png"
  //       alt=""
  //       width={24}
  //       height={24}
  //       className="cursor-pointer p-1 "
  //     />
  //   );
  // };
  const { locale } = useParams();

  return (
    <div className="flex flex-col  justify-center gap-4 pt-6 md:flex-row md:pt-0 z-40">
      <div className="md:hidden">
        <SearchBar typeBar="search" translations={translations} />
      </div>
      <div className="flex flex-col  justify-center gap-4 md:flex-row">
        <div className="md:relative">
          <div className="flex items-center  w-fit border-x-0 border-t-0 border-b-2 border-b-transparent  hover:border-b-primary ">
            <Link href={`/${locale}`} className="cursor-pointer font-semibold">
              {translations?.navbar?.home}
            </Link>
          </div>
        </div>
        <div className="md:relative">
          <div className="flex items-center  w-fit border-0  hover:border-b-2  hover:border-b-primary">
            <Link
              href={`/${locale}/${Routes.PRODUCTS}`}
              className="cursor-pointer font-semibold"
            >
              {translations?.navbar?.ourProducts}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLinks;
