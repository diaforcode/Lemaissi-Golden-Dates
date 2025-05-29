import Image from "next/image";
import React from "react";
import SearchBar from "./Navbar/SearchBar";
import Link from "next/link";
import { FooterCollections, headerLinks } from "@/constants";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";
import SocialMedia from "./SocialMedia";
const Footer = async () => {
  const locale = await getCurrentLocale();

  const translations = await getTrans(locale);

  const { copyRight } = await getTrans(locale);
  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row ">
        <div className="px-5 py-12 lg:w-1/2 relative md:p-16">
          <Image
            src="https://res.cloudinary.com/dfe8kuxsd/image/upload/v1747412911/ee1cifiwkvbftnw7lkoq.png"
            alt="footer_Image"
            className="w-full h-full absolute inset-0 z-10 object-cover"
            sizes="100%"
            fill
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-85 z-20 "></div>
          <div className="relative z-20 max-w-md">
            {" "}
            {/* <div className="font-bold text-xl text-primary tracking-wide">
              Lemaissi Golden Dates
            </div> */}
            <div className="uppercase text-tertiary mt-12 text-sm font-sans tracking-wider font-semibold">
              {translations.footer.title}
            </div>
            <p className="text-sm mt-4 text-white">
              {translations.footer.description}
            </p>
            <div className="hidden md:block space-x-6 text-slate-200 font-sans text-sm mt-12  xl:mt-24">
              {copyRight}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 px-5 py-12  md:p-16">
          <h4 className="uppercase text-sm font-sans text-secondary tracking-wider font-semibold">
            {" "}
            {translations.footer.subscribe.title}
          </h4>
          <div className="max-w-sm mt-5">
            <SearchBar typeBar="subscribe" translations={translations} />
          </div>
          <SocialMedia translations={translations} />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
            <div className="space-y-5">
              <h4 className="uppercase text-sm font-sans text-secondary tracking-wider font-semibold">
                Useful Links
              </h4>
              <ul className="text-sm space-y-2 text-slate-600">
                {headerLinks.map((item, index) => (
                  <li className="cursor-pointer" key={index}>
                    <Link href="#"> {item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="uppercase text-sm font-sans text-secondary tracking-wider font-semibold">
                Collections
              </h4>
              <ul className="text-sm space-y-2 text-slate-600">
                {FooterCollections.map((item, index) => (
                  <li className="cursor-pointer" key={index}>
                    <Link href="#"> {item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hidden 2xl:block ">
        <Image
          alt=""
          src={"/assets/images/dried-dates.png"}
          width={450}
          height={450}
          className="absolute right-0 bottom-8 drop-shadow-lg h-[450px] w-[450px]"
        />
      </div> */}
    </div>
  );
};

export default Footer;
