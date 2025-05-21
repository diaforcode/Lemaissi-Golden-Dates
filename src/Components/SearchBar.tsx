"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";

type typeBarProps = {
  typeBar?: "subscribe" | "search";
};

const SearchBar = ({ typeBar }: typeBarProps) => {
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
              placeholder={typeBar === "search" ? "search..." : "Email Address"}
            />
            <button className="w-12 flex items-center justify-center h-[40px] ">
              {typeBar === "search" ? (
                <Image
                  src="/search.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer "
                />
              ) : (
                typeBar === "subscribe" && (
                  <Image
                    src="/_email.png"
                    alt=""
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                )
              )}
            </button>
          </form>
          {emailErr && (
            <div className="text-red-600">Please enter valid email.</div>
          )}
        </>
      ) : (
        <div className="text-green-600">
          Thanks for subscribing! We will contact you soon.
        </div>
      )}
    </>
  );
};

export default SearchBar;
