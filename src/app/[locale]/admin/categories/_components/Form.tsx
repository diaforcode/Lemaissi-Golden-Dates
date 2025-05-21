"use client";

import { Button, buttonVariants } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Loader from "@/Components/ui/loader";
import { toast } from "@/hooks/use-toast";
import { Translations } from "@/types/translations";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { useActionState, useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../_actions/category";
import { Category } from "@prisma/client";
import useFormFields from "@/hooks/useFormFields";
import { Pages, Routes } from "@/constants/enums";
import { ValidationErrors } from "@/validations/auth";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { IFormField } from "@/types/app";
import FormFields from "@/Components/form-fields/form-fields";
import Link from "@/Components/link";
import { useParams } from "next/navigation";

function Form({
  translations,
  category,
}: {
  translations: Translations;
  category?: Category;
}) {
  const [selectedImage, setSelectedImage] = useState(
    category ? category.image : ""
  );
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.CATEGORIES}`,
    translations,
  });

  const formData = new FormData();

  Object.entries(category ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
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
    category ? updateCategory.bind(null, category.id) : addCategory,
    initialState
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      toast({
        title: state.message,
        className:
          state.status === 201 || state.status === 200
            ? "text-green-400"
            : "text-destructive",
      });
    }
  }, [pending, state.message, state.status]);

  return (
    <form action={action} className="flex flex-col md:flex-row gap-10">
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {state?.error?.image && (
          <p className="text-sm text-destructive text-center mt-4 font-medium">
            {state.error?.image}
          </p>
        )}
      </div>

      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state.formData?.get(field.name) ?? formData.get(field.name);

          return (
            <div key={field.name} className="mb-3">
              <FormFields
                {...field}
                error={state?.error}
                defaultValue={fieldValue as string}
              />
            </div>
          );
        })}
        <FormActions
          translations={translations}
          pending={pending}
          category={category}
        />
      </div>
    </form>
  );
}

export default Form;

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <div className="group mx-auto md:mx-0 relative w-[200px] h-[200px] overflow-hidden rounded-full">
      {selectedImage && (
        <Image
          src={selectedImage}
          alt="Add Product Image"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      )}
      <div
        className={`${
          selectedImage
            ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
            : ""
        } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageChange}
          name="image"
        />
        <label
          htmlFor="image-upload"
          className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer"
        >
          <CameraIcon className="!w-8 !h-8 text-accent" />
        </label>
      </div>
    </div>
  );
};

const FormActions = ({
  translations,
  pending,
  category,
}: {
  translations: Translations;
  pending: boolean;
  category?: Category;
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
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });
      const res = await deleteCategory(id);
      setState((prev) => {
        return { ...prev, status: res.status, message: res.message };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, pending: false };
      });
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
        className={`${category ? "grid grid-cols-2" : "flex flex-col"} gap-4`}
      >
        <Button type="submit" disabled={pending}>
          {pending ? (
            <Loader />
          ) : category ? (
            translations.save
          ) : (
            translations.create
          )}
        </Button>
        {category && (
          <Button
            variant="outline"
            disabled={state.pending}
            onClick={() => handleDelete(category.id)}
          >
            {state.pending ? <Loader /> : translations.delete}
          </Button>
        )}
      </div>

      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`}
        className={`w-full mt-4 mb-4 ${buttonVariants({ variant: "outline" })}`}
      >
        {translations.cancel}
      </Link>
    </>
  );
};
