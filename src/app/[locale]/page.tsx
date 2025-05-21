import CategoriesComponent from "@/Components/Categories/CategoriesComponent.";
import ProductsComponent from "@/Components/Products/ProductsComponent";
import Slider from "@/Components/Slider";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";
import { getSliders } from "@/server/db/sliders";

export default async function Home() {
  // const products = await db.extra.create({
  //   data:{
  //     // id:"01",
  //     price:20,
  //     productId:"cm553jdfq0000v7rkdf3chry9"
  //   }
  // });
  // console.log("products", products);
  const locale = await getCurrentLocale();

  const { home } = await getTrans(locale);
  const sliders = await getSliders();

  return (
    <div className="">
      <Slider
        sliderComponent={home.sliderComponent}
        locale={locale}
        sliders={sliders}
      />
      <ProductsComponent />
      <CategoriesComponent />
    </div>
  );
}
