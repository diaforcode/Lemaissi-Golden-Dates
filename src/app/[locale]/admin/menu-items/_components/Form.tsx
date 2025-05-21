"use client";

import FormFields from "@/Components/form-fields/form-fields";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useMemo, useState } from "react";
import SelectCategory from "./SelectCategory";
import { Category, Image as ImageType } from "@prisma/client";

import Link from "@/Components/link";
import { useParams } from "next/navigation";
import { ValidationErrors } from "@/validations/auth";
import { addProduct, deleteProduct, updateProduct } from "../_actions/product";
import Loader from "@/Components/ui/loader";
import { toast } from "@/hooks/use-toast";
import { ProductWithRelations } from "@/types/product";

function Form({
  translations,
  categories,
  product,
}: {
  translations: Translations;
  categories: Category[];
  product?: ProductWithRelations;
}) {
  const [selectedImages, setSelectedImages] = useState<string[]>(
    product ? product.images.map((image) => image.image) : [] // Assuming `product.images` is an array of image objects
  );

  const [categoryId, setCategoryId] = useState(
    product ? product.categoryId : categories[0].id
  );

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translations,
  });

  const formData = new FormData();

  Object.entries(product ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  // const formData = useMemo(() => {
  //   const fd = new FormData();
  //   Object.entries(product ?? {}).forEach(([key, value]) => {
  //     if (value !== null && value !== undefined && key !== "image") {
  //       fd.append(key, value.toString());
  //     }
  //   });
  //   selectedImages.forEach((url) => fd.append("images", url));
  //   return fd;
  // }, [product, selectedImages]);

  // Append the selected images to formData
  selectedImages.forEach((imageUrl) => {
    formData.append("images", imageUrl); // You will handle image URLs differently in the backend
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData: null,
  };

  const [state, action, pending] = useActionState(
    product
      ? updateProduct.bind(null, {
          productId: product.id,

          images: selectedImages, // Send the selected images
        })
      : addProduct.bind(null, {
          categoryId,
          images: selectedImages,
        }), // Send the selected images
    initialState
  );

  useEffect(() => {
    if (state && state.message && state.status && !pending) {
      toast({
        title: state.message,
        className:
          state.status === 201 || state.status === 200
            ? "text-green-400"
            : "text-destructive",
      });
    }
  }, [pending, state && state.message, state && state.status]);

  return (
    <form
      action={action}
      className="flex flex-col md:items-center gap-10 my-12"
    >
      <div>
        <UploadImages
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          productId={product?.id}
        />

        {state?.error?.image && (
          <p className="text-sm text-destructive text-center mt-4 font-medium">
            {state.error?.image}
          </p>
        )}
      </div>

      <div className="flex-1 md:w-[750px]">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state.formData?.get(field.name) ?? formData.get(field.name);

          return (
            <div key={field.name} className="mb-3">
              <FormFields
                {...field}
                error={state?.error}
                // defaultValue={fieldValue as string}
                defaultValue={
                  (state.formData?.get(field.name) as string) ??
                  (product?.[
                    field.name as keyof ProductWithRelations
                  ] as string) ??
                  (fieldValue as string)
                }
              />
            </div>
          );
        })}
        <SelectCategory
          categoryId={categoryId}
          categories={categories}
          setCategoryId={setCategoryId}
          translations={translations}
        />

        <FormActions
          translations={translations}
          pending={pending}
          product={product}
        />
      </div>
    </form>
  );
}

export default Form;

const handleImageUpload = async (files: File[]) => {
  const formData = new FormData();

  // Append files to FormData
  files.forEach((file) => formData.append("file", file));

  // For example, set the upload path for product images
  formData.append("pathName", "product_images");

  try {
    // POST request to Cloudinary upload API (you should have an API route set up for this)
    const response = await fetch("/api/upload/productImage", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload images");
    }

    const data = await response.json();
    return data.urls; // Assuming the server returns an array of URLs
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};

const UploadImages = ({
  selectedImages,
  setSelectedImages,
  productId,
}: {
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  productId?: string;
}) => {
  const [uploading, setUploading] = useState(false); // Track upload status
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const MAX_FILE_SIZE_MB = 1; // Set max file size to 1MB

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;
    const validFiles = Array.from(files).filter((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({
          title: `File too large (max ${MAX_FILE_SIZE_MB}MB)`,
          className: "text-destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    if (validFiles) {
      const previews = Array.from(validFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prev) => [...prev, ...previews]);

      setUploading(true);
      const uploadedUrls = await handleImageUpload(Array.from(validFiles));
      setUploading(false);
      if (uploadedUrls.length === 0) {
        toast({ title: "Upload failed", className: "text-destructive" });
        return;
      }
      // Only store Cloudinary URLs in selectedImages
      setSelectedImages((prev) => [...prev, ...uploadedUrls]);
    }
  };

  const handleImageRemove = async (imageUrl: string) => {
    // Optional: Ask confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmed) return;

    try {
      // If product ID exists, call the delete API
      if (productId) {
        const res = await fetch(
          `/api/upload/deleteImage?imageUrl=${encodeURIComponent(
            imageUrl
          )}&productId=${productId}`,
          { method: "DELETE" }
        );

        if (!res.ok) {
          const error = await res.json();
          toast({
            title: error.message || "Failed to delete image",
            className: "text-destructive",
          });
          return;
        }
      }

      // Remove from UI
      setSelectedImages((prevImages) =>
        prevImages.filter((url) => url !== imageUrl)
      );

      toast({
        title: "Image removed successfully",
        className: "text-green-400",
      });
    } catch (err) {
      console.error("Error removing image:", err);
      toast({
        title: "An error occurred while removing the image.",
        className: "text-destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {selectedImages.map((imageUrl, index) => (
        <div
          key={index}
          className="relative w-[200px] h-[200px] overflow-hidden rounded-full"
        >
          <Image
            src={imageUrl}
            alt={`Product Image ${index + 1}`}
            width={200}
            height={200}
            className="rounded-full object-cover"
          />

          <button
            onClick={() => handleImageRemove(imageUrl)}
            className="absolute font-black top-5 right-8 bg-white p-1 rounded-full text-red-500"
          >
            &times;
            {/* delete */}
          </button>
        </div>
      ))}
      {/* Upload new images */}
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          multiple
          onChange={handleImageChange}
          name="images"
        />
        {uploading ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 cursor-pointer">
            <div
              className={`w-4 h-4 border-2 border-t-2 border-gray-200 rounded-full animate-spin border-t-black `}
            ></div>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="border rounded-full w-[200px] h-[200px] flex items-center justify-center cursor-pointer"
          >
            <CameraIcon className="!w-8 !h-8 text-accent" />
          </label>
        )}
      </div>
    </div>
  );
};

const FormActions = ({
  translations,
  pending,
  product,
}: {
  translations: Translations;
  pending: boolean;
  product?: ProductWithRelations;
}) => {
  const { locale } = useParams();
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });
  const handleDelete = async (id: string) => {
    alert("Delete triggered");
    try {
      setState((prev) => ({ ...prev, pending: true }));
      const res = await deleteProduct(id);
      // console.log("Delete response", res);
      setState((prev) => ({
        ...prev,
        status: res.status,
        message: res.message,
      }));
    } catch (error) {
      console.log("Error during delete:", error);
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  useEffect(() => {
    if (state.message && state.status && !pending) {
      toast({
        title: state.message,
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [pending, state.message, state.status]);
  return (
    <>
      <div
        className={`${product ? "grid grid-cols-2" : "flex flex-col"} gap-4`}
      >
        <Button type="submit" disabled={pending}>
          {pending ? (
            <Loader />
          ) : product ? (
            translations.save
          ) : (
            translations.create
          )}
        </Button>
        {product && (
          <Button
            variant="outline"
            disabled={state.pending}
            onClick={() => handleDelete(product.id)}
          >
            {state.pending ? <Loader /> : translations.delete}
          </Button>
        )}
      </div>

      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}
        className={`w-full mt-4 ${buttonVariants({ variant: "outline" })}`}
      >
        {translations.cancel}
      </Link>
    </>
  );
};
