"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Languages } from "@/constants/enums";
import { Languages as Lang } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
const SwitchLanguage = ({ responsive }: { responsive?: string }) => {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const switchLang = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div>
      {responsive === "MOBILE" ? (
        <div className="flex flex-col gap-1 pl-2 text-sm font-medium md:absolute md:flex-row md:pl-0  md:bg-white md:top-10 md:w-max md:h-auto md:drop-shadow-xl">
          <div
            className="md:text-secondary cursor-pointer hover:text-primary"
            onClick={() => switchLang(Languages.ENGLISH)}
          >
            English
          </div>
          <div
            className="md:text-secondary cursor-pointer hover:text-primary"
            onClick={() => switchLang(Languages.ARABIC)}
          >
            العربية
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Lang />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={`${
                  locale === Languages.ENGLISH && "text-primary font-bold"
                } `}
                onClick={() => switchLang(Languages.ENGLISH)}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`${
                  locale === Languages.ARABIC && "text-primary font-bold"
                } `}
                onClick={() => switchLang(Languages.ARABIC)}
                dir="rtl"
              >
                العربية
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default SwitchLanguage;
