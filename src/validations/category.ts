import { Translations } from "@/types/translations";
import * as z from "zod";

const imageValidation = (translations: Translations, isRequired: boolean) => {
  return !isRequired
    ? z.custom((val) => val instanceof File)
    : z.custom(
        (val) => {
          if (typeof val !== "object" || !val) {
            return false;
          }
          if (!(val instanceof File)) {
            return false;
          }
          const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
          return validMimeTypes.includes(val.type);
        },
        {
          message: translations.admin.categories.form.image.validation.required,
        }
      );
};
const getCommonValidations = (translations: Translations) => {
  return {
    name: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
    nameArabic: z.string().trim().min(1, {
      message:
        translations.admin.categories.form.nameArabic.validation.required,
    }),
    description: z.string().trim().min(1, {
      message:
        translations.admin.categories.form.description.validation.required,
    }),
    descriptionArabic: z.string().trim().min(1, {
      message:
        translations.admin.categories.form.descriptionArabic.validation
          .required,
    }),
  };
};

export const addCategorySchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, true),
  });
};

export const updateCategorySchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, false),
  });
};
