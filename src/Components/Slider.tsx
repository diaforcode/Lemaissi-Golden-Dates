"use client";

import type { Slider } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type SliderType = {
  title: string;
  description: string;
  description2: string;
  Meetus: string;
};
const Slider = ({
  sliders,
  sliderComponent,
  locale,
}: {
  sliders: Slider[];
  sliderComponent: SliderType;
  locale: string;
}) => {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === NewIn.length - 1 ? 0 : prev + 1));
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div
      dir="ltr"
      className="h-[calc(50vh-80px)] sm:h-[calc(70vh-80px)] overflow-hidden relative"
    >
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        // style={{
        //   transform: `translateX(${locale === "en" ? "-" : "+"}${
        //     current * 100
        //   }vw)`,
        // }}
        style={{
          transform: `translateX(-${current * 100}vw)`,
        }}
      >
        {sliders.map((slide: Slider) => (
          <div className={`w-screen h-full `} key={slide.id}>
            <div className="flex min-w-full relative h-full">
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
                priority
              />
              <div className="hidden sm:block sm:w-1/2 sm:z-40 sm:p-4 ">
                <div className="h-full flex flex-col items-center justify-center ">
                  <h2 className="font-sans font-extralight sm:text-2xl xl:text-5xl pb-3">
                    {sliderComponent.title}
                  </h2>

                  <div className="flex flex-col items-center justify-center ">
                    <h3 className="font-sans font-bold sm:text-xl xl:text-4xl">
                      {sliderComponent.description}
                      <br />
                      <p className="flex justify-center">
                        {sliderComponent.description2}
                      </p>
                    </h3>
                  </div>
                  <Link
                    href="http://www.biodattes.com/content/24-nous-rencontrer"
                    className=" flex items-center justify-center hover:font-bold pt-10 ml-52"
                  >
                    <p className=" p-2 hover:mr-4 ">{sliderComponent.Meetus}</p>

                    <ChevronRight className="h-4 w-4 hover:w-4 hover:h-4 hover:ml-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex absolute m-auto left-1/2 transform -translate-x-1/2 -translate-y-1/2  bottom-8  gap-4">
        {sliders.map((slide: Slider, index: number) => (
          <div
            className={`w-2 h-2  rounded-full bg-black bg-opacity-40 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-2 h-2 bg-primary  rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      {/* <Image
        alt=""
        src="/arrowR.png"
        width={16}
        height={16}
        className="absolute right-4 hover:w-5 hover:h-5 w-4 h-4 top-[50%] cursor-pointer "
        onClick={() =>
          setCurrent((prev) => (prev === sliders.length - 1 ? 0 : prev + 1))
        }
      /> */}
      <ChevronRight
        className="absolute right-4 hover:w-9 hover:h-9 w-8 h-8 top-[50%] cursor-pointer "
        onClick={() =>
          setCurrent((prev) => (prev === sliders.length - 1 ? 0 : prev + 1))
        }
      />
      <ChevronLeft
        className="absolute left-4 hover:w-9 hover:h-9 w-8 h-8 top-[50%] cursor-pointer "
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? sliders.length - 1 : current - 1))
        }
      />
      {/* <Image
        alt=""
        src="/arrowL.png"
        width={16}
        height={16}
        className="absolute left-4 hover:w-5 hover:h-5 w-4 h-4 top-[50%] cursor-pointer "
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? sliders.length - 1 : current - 1))
        }
      /> */}
    </div>
  );
};

export default Slider;
