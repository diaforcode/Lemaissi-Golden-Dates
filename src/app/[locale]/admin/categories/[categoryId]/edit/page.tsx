import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getProduct, getProducts } from "@/server/db/products";
import { redirect } from "next/navigation";
import Form from "../../_components/Form";
import { getCategories, getcategory } from "@/server/db/categories";
import getTrans from "@/Lib/translation";

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({ categoryId: category.id }));
}
async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; categoryId: string }>;
}) {
  const { categoryId, locale } = await params;
  const translations = await getTrans(locale);
  const category = await getcategory(categoryId);

  if (!category) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
  }

  return (
    <main>
      <section>
        <div className="container">
          <Form category={category} translations={translations} />
        </div>
      </section>
    </main>
  );
}

export default EditProductPage;
