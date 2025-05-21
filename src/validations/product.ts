import { Translations } from "@/types/translations";
import { z } from "zod";

// Update image validation to handle multiple images
const imageValidation = (translations: Translations, isRequired: boolean) => {
  return !isRequired
    ? z.array(z.custom((val) => val instanceof File))
    : z
        .array(
          z.custom((val) => {
            if (!val || !(val instanceof File)) {
              return false;
            }
            const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
            return validMimeTypes.includes(val.type);
          }),
          {
            message:
              translations.admin["menu-items"].form.image.validation.required,
          }
        )
        .min(1, {
          message:
            translations.admin["menu-items"].form.image.validation.required,
        });
};

// Common validations for name, description, price, and categoryId
const getCommonValidations = (translations: Translations) => {
  return {
    name: z.string().trim().min(1, {
      message: translations.admin["menu-items"].form.name.validation.required,
    }),
    nameArabic: z.string().trim().min(1, {
      message:
        translations.admin["menu-items"].form.nameArabic.validation.required,
    }),
    description: z.string().trim().min(1, {
      message:
        translations.admin["menu-items"].form.description.validation.required,
    }),
    descriptionArabic: z.string().trim().min(1, {
      message:
        translations.admin["menu-items"].form.descriptionArabic.validation
          .required,
    }),
    price: z.string().min(1, {
      message: translations.admin["menu-items"].form.price.validation.required,
    }),
    categoryId: z.string().min(1, {
      message:
        translations.admin["menu-items"].form.category.validation.required,
    }),
  };
};

// Schema for adding a new product with multiple images
export const addProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    // image: imageValidation(translations, true),
  });
};

// Schema for updating a product, allowing for optional image upload
export const updateProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    // image: imageValidation(translations, false),
  });
};
