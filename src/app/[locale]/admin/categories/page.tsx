import { Locale } from "@/i18n.config";
import { getCategories } from "@/server/db/categories";
import getTrans from "@/Lib/translation";
import Link from "@/Components/link";
import { buttonVariants } from "@/Components/ui/button";
import { Languages, Pages, Routes } from "@/constants/enums";
import { ArrowRightCircle } from "lucide-react";
import MenuCategories from "./_components/MenuCategories";

async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;
  const categories = await getCategories();
  const translations = await getTrans(locale);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <Link
            href={`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}/${Pages.NEW}`}
            className={`${buttonVariants({
              variant: "outline",
            })} !mx-auto !flex !w-80 !h-10 mb-8`}
          >
            {translations.admin.categories.createNewCategory}
            <ArrowRightCircle
              className={`!w-5 !h-5 ${
                locale === Languages.ARABIC ? "rotate-180 " : ""
              }`}
            />
          </Link>
          <MenuCategories categories={categories} />
        </div>
      </section>
    </main>
  );
}

export default CategoriesPage;
