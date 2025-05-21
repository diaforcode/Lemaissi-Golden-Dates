import { cache } from "@/Lib/cache";
import { db } from "@/Lib/prisma";

export const getSliders = cache(
  () => {
    const Sliders = db.slider.findMany();
    return Sliders;
  },
  ["sliders"],
  { revalidate: 3600 }
);
