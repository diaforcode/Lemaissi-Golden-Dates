import Image from "next/image";
import { Suspense } from "react";
import Categories from "./Categories";
import { Languages } from "@/constants/enums";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";

const CategoriesComponent = async () => {
  const locale = await getCurrentLocale();
  return (
    <div className="relative">
      <div className="my-12 px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-32">
        <Suspense fallback="lading...">
          <div className="flex justify-center items-center">
            <Categories />
          </div>
        </Suspense>
      </div>
      <Image
        alt="palm-tree"
        src="https://res.cloudinary.com/dfe8kuxsd/image/upload/v1747392911/ju4sgb3iy7od49lc7zar.png"
        width={700}
        height={700}
        // priority={true}
        className={`absolute bottom-0 -z-10 w-auto h-auto ${
          locale === Languages.ARABIC ? "-scale-x-100  " : ""
        }`}
      />
    </div>
  );
};

export default CategoriesComponent;
