"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { Translations } from "@/types/translations";
import { Routes } from "@/constants/enums";
import { useParams } from "next/navigation";

const MenuLinks = ({ translations }: { translations: Translations }) => {
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
