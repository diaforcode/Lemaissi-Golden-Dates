"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";
import { Translations } from "@/types/translations";
import { Mail, Search } from "lucide-react";

type typeBarProps = {
  typeBar?: "subscribe" | "search";
};

const SearchBar = ({
  typeBar,
  translations,
}: {
  typeBar: typeBarProps["typeBar"];
  translations: Translations;
}) => {
  const router = useRouter();
  const [subscribe, setSubscribe] = useState(true);
  const [newsEmail, setNewsEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name && typeBar === "search") {
      router.push(`/list?name=${name}`);
    }
    if (name && typeBar === "subscribe") {
      if (!validator.isEmail(name)) {
        // setEmailErr("Please enter valid email...");
        setEmailErr(true);
        setEmailValid(false);
      } else {
        setEmailValid(true);
        setEmailErr(false);
      }
    }
  };

  const inputPlaceholder =
    typeBar === "search"
      ? translations?.navbar?.search
      : translations?.footer?.subscribe?.emailSubscribe;

  return (
    <>
      {!emailValid ? (
        <>
          <form
            className="flex items-center rounded-md bg-[#ae7f582c] flex-1"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              name="name"
              className="w-full h-[40px] p-[12px] bg-transparent  outline-none flex-1 focus:bg-transparent"
              placeholder={inputPlaceholder}
            />

            <button className="w-12 flex items-center justify-center h-[40px] ">
              {typeBar === "search" ? (
                <Search className="cursor-pointer w-5 h-5 text-secondary" />
              ) : (
                typeBar === "subscribe" && (
                  <Mail className="cursor-pointer w-6 h-6 text-secondary " />
                )
              )}
            </button>
          </form>
          {emailErr && (
            <div className="text-red-600">
              {translations?.footer?.subscribe?.errorMessage}
            </div>
          )}
        </>
      ) : (
        <div className="text-green-600">
          {translations?.footer?.subscribe?.successMessage}
        </div>
      )}
    </>
  );
};

export default SearchBar;
