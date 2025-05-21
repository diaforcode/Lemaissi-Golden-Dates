import Link from "next/link";

import Menu from "./Menu";

import MenuLinks from "./MenuLinks";
import SearchBar from "./SearchBar";
import Image from "next/image";
import NavCartIcons from "./NavCartIcons";
import { getServerSession } from "next-auth";
import getTrans from "@/Lib/translation";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import { authOptions } from "@/server/auth";
import NavUser from "./NavUser";
import SwitchLanguage from "../SwitchLanguage";

const Navbar = async () => {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const translations = await getTrans(locale);
  const Logo = () => {
    return (
      <Link href={`/${locale}`} dir="ltr">
        <div className="flex justify-center items-center max-[300px]:flex-col flex-row gap-0.5 sm:gap-1">
          <p className="max-[280px]:leading-[0.8] max-[280px]:m-0 max-[280px]:p-0 text-xs sm:text-sm font-semibold">
            Lemaissi
          </p>
          <div className="flex flex-col">
            <p className="max-[280px]:leading-[0.8] max-[280px]:m-0 max-[280px]:p-0 text-base  sm:text-lg font-bold text-primary">
              Golden
            </p>
            <div className="max-[280px]:leading-[0.8] max-[280px]:m-0 max-[280px]:p-0 border-t border-yellow-600 mt-1 " />
          </div>
          <p className="max-[280px]:leading-[0.8] max-[280px]:m-0 max-[280px]:p-0 text-xs sm:text-sm font-semibold">
            Dates
          </p>
        </div>
        {/* <div className="flex flex-col items-center  font-sans">
            <p className="text-sm font-semibold leading-[1] m-0 p-0">
              Lemaissi
            </p>
            <div className="text-lg font-bold leading-[1] m-0 p-0 text-primary">
              <p>Golden</p>
              <div className="border-t border-yellow-600  " />
            </div>
            <p className="text-sm font-semibold leading-[1] m-0 p-0">Dates</p>
          </div> */}
      </Link>
    );
  };
  return (
    <div className="h-20 px-2  md:px-4 lg:px-8 xl:px-8 2xl:px-32 relative">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Logo />
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-[50%] flex items-center  justify-between">
          <Logo />

          <div className="hidden xl:flex">
            <MenuLinks translations={translations} />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-[50%] flex items-center justify-between gap-8">
          <SearchBar typeBar="search" translations={translations} />
          <NavCartIcons />
          <NavUser
            translations={translations}
            initialSession={initialSession}
          />
          <SwitchLanguage />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
