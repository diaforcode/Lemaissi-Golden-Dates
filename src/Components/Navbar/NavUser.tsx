"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Translations } from "@/types/translations";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes, UserRole } from "@/constants/enums";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";
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
import { UserRound } from "lucide-react";
function NavUser({
  initialSession,
  translations,
  responsive,
}: {
  initialSession: Session | null;
  translations: Translations;
  responsive?: string;
}) {
  const session = useClientSession(initialSession);
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  return (
    <div>
      {responsive === "MOBILE" ? (
        <div className="flex flex-col gap-1 pl-2 text-sm  md:absolute md:flex-row md:pl-0  md:bg-white md:top-10 md:w-max md:h-auto md:drop-shadow-xl">
          {session.data?.user && (
            <>
              <div
                className="md:text-secondary cursor-pointer hover:text-primary"
                onClick={() =>
                  session.data?.user.role === UserRole.ADMIN
                    ? router.push(`/${locale}/${Routes.ADMIN}`)
                    : router.push(`/${locale}/${Routes.PROFILE}`)
                }
              >
                {translations.navbar.profile}
              </div>
              {session.data?.user.role === UserRole.ADMIN && (
                <div
                  className="md:text-secondary cursor-pointer hover:text-primary"
                  onClick={() =>
                    router.push(
                      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`
                    )
                  }
                >
                  {translations.navbar.admin}
                </div>
              )}
              <div
                className="md:text-secondary cursor-pointer hover:text-primary"
                onClick={() => signOut()}
              >
                {translations.navbar.signOut}
              </div>
            </>
          )}
          {!session.data?.user && (
            <>
              <div
                className="md:text-secondary cursor-pointer hover:text-primary"
                onClick={() =>
                  router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
                }
              >
                {translations.navbar.login}
              </div>

              <div
                className="md:text-secondary cursor-pointer hover:text-primary"
                onClick={() =>
                  router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)
                }
              >
                {translations.navbar.register}
              </div>
            </>
          )}
        </div>
      ) : (
        <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
          <DropdownMenuTrigger asChild>
            <UserRound color="#976348" className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            {session.data?.user && (
              <>
                <DropdownMenuLabel>
                  {translations.navbar.myAccount}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className={`${
                      pathname.startsWith(`/${locale}/${Routes.PROFILE}`)
                        ? "text-primary font-bold"
                        : "text-accent"
                    } `}
                    onClick={() =>
                      session.data?.user.role === UserRole.ADMIN
                        ? router.push(`/${locale}/${Routes.ADMIN}`)
                        : router.push(`/${locale}/${Routes.PROFILE}`)
                    }
                  >
                    {translations.navbar.profile}
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>

                  {session.data?.user.role === UserRole.ADMIN && (
                    <DropdownMenuItem
                      className={`${
                        pathname.startsWith(`/${locale}/${Routes.ADMIN}`)
                          ? "text-primary font-bold"
                          : "text-accent"
                      } `}
                      onClick={() =>
                        router.push(
                          `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`
                        )
                      }
                    >
                      {translations.navbar.admin}
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  {translations.navbar.signOut}
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            )}
            {!session.data?.user && (
              <div>
                <DropdownMenuItem
                  className={`${
                    pathname.startsWith(
                      `/${locale}/${Routes.AUTH}/${Pages.LOGIN}`
                    )
                      ? "text-primary font-bold"
                      : "text-accent"
                  } `}
                  onClick={() =>
                    router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
                  }
                >
                  {translations.navbar.login}
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={`${
                    pathname.startsWith(
                      `/${locale}/${Routes.AUTH}/${Pages.Register}`
                    )
                      ? "text-primary font-bold"
                      : "text-accent"
                  } `}
                  onClick={() =>
                    router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)
                  }
                >
                  {translations.navbar.register}
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export default NavUser;
