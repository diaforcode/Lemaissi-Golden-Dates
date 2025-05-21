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
const SwitchLanguage = () => {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
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
            onClick={() => switchLanguage(Languages.ENGLISH)}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`${
              locale === Languages.ARABIC && "text-primary font-bold"
            } `}
            onClick={() => switchLanguage(Languages.ARABIC)}
            dir="rtl"
          >
            العربية
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchLanguage;
