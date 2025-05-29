"use client";

import Link from "next/link";
import { useState } from "react";

import { headerLinks } from "@/constants";
import { ChevronDown, ChevronUp, Languages, MenuIcon, X } from "lucide-react";
import SocialMedia from "../SocialMedia";
import SwitchLanguage from "../SwitchLanguage";
import { useParams } from "next/navigation";
import { Languages as AR } from "@/constants/enums";
import { Translations } from "@/types/translations";
import NavUser from "./NavUser";
import { Session } from "next-auth";
import NavCartWrapper from "./NavCartWrapper";

const Menu = ({
  initialSession,
  translations,
}: {
  initialSession: Session | null;
  translations: Translations;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { locale } = useParams();
  return (
    <div className="">
      {showSidebar ? (
        <>
          <X
            color="#976348"
            className={`cursor-pointer fixed  ${
              locale === AR.ARABIC ? "left-[16px]" : "right-[16px]"
            } top-6 z-50`}
            onClick={() => setShowSidebar(!showSidebar)}
          />

          <div
            className={`flex flex-col justify-center top-0 ${
              locale === AR.ARABIC ? "left-0 pr-20" : "right-0 pl-20"
            } w-[75vw] bg-white  p-10  text-black fixed h-full z-40  ease-in-out duration-300 ${
              showSidebar ? "translate-x-0 " : "translate-x-full"
            }`}
          >
            <div className="h-[1px] bg-gray-300 w-full my-4" />
            <div className="">
              <div className="flex items-center  w-fit border-x-0 border-t-0 border-b-2 border-b-transparent  hover:border-b-primary ">
                {translations.navbar.myAccount}
                <button
                  onClick={() =>
                    !showAccount
                      ? (setShowAccount(true), setShowCollections(false))
                      : setShowAccount(false)
                  }
                >
                  {showAccount ? <ChevronDown /> : <ChevronUp />}
                </button>
              </div>
              <div>
                {showAccount && (
                  <NavUser
                    translations={translations}
                    initialSession={initialSession}
                    responsive="MOBILE"
                  />
                )}
              </div>
            </div>
            <Link
              href={`/${locale}/cart`}
              className="cursor-pointer hover:text-primary pt-1"
            >
              {translations.cart.title}
            </Link>

            <div className="flex flex-col justify-center gap-2 pt-6">
              {headerLinks.map((item, index) => (
                <Link
                  href={item.route}
                  className="cursor-pointer flex items-center text-sm font-light font-serif hover:text-primary"
                  key={index}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <SocialMedia />
            <div className="h-[1px] bg-gray-300 w-full my-4" />

            <div>
              <div className="flex items-center  w-fit border-x-0 border-t-0 border-b-2 border-b-transparent  hover:border-b-primary ">
                <Languages />
                <button
                  onClick={() =>
                    !showCollections
                      ? (setShowCollections(true), setShowAccount(false))
                      : setShowCollections(false)
                  }
                >
                  {showCollections ? <ChevronDown /> : <ChevronUp />}
                </button>
              </div>
              <div>
                {showCollections && <SwitchLanguage responsive="MOBILE" />}
              </div>
            </div>
          </div>
        </>
      ) : (
        <MenuIcon
          color="#976348"
          onClick={() => setShowSidebar(!showSidebar)}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Menu;
