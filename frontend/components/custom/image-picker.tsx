"use client";

import { useState, useRef, Fragment, useEffect } from "react";
import { MediaImage } from "./media-image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "../ui/field";
import { parseFieldErrors } from "@/lib/parsers";

interface ImagePickerProps {
   id: string;
   name: string;
   label: string;
   showCard?: boolean;
   defaultValue?: string;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImagePreview({ dataUrl }: { readonly dataUrl: string }) {
   return (
      <MediaImage
         src={dataUrl}
         alt="preview"
         height={200}
         width={200}
         className="rounded-3xl w-full object-cover"
      />
   );
}

function ImageCard({
   dataUrl,
   error,
   fileInput,
   className,
}: {
   readonly dataUrl: string;
   error: string | null;
   readonly fileInput: React.RefObject<HTMLInputElement | null>;
   className: string;
}) {
   return (
      <div className={cn("w-full relative", className)}>
         <div className="flex items-center justify-center space-x-4 rounded-3xl border border-input/80 p-0 w-full aspect-square">
            {error ? (
               <FieldError errors={parseFieldErrors(error)} />
            ) : dataUrl ? (
               <ImagePreview dataUrl={dataUrl} />
            ) : (
               <p className="text-center">
                  No se ha seleccionado ninguna imagen
               </p>
            )}
         </div>

         <button
            type="button"
            className="absolute inset-0 w-full hover:cursor-pointer"
            aria-label="Seleccionar una imagen"
            onClick={() => fileInput.current?.click()}
         />
      </div>
   );
}

export default function ImagePicker({
   id,
   name,
   label,
   defaultValue,
   onChange,
}: Readonly<ImagePickerProps>) {
   const fileInput = useRef<HTMLInputElement>(null);

   const [dataUrl, setDataUrl] = useState<string | null>(defaultValue ?? null);

   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      return () => {
         if (dataUrl?.startsWith("blob:")) {
            URL.revokeObjectURL(dataUrl);
         }
      };
   }, [dataUrl]);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
         setError("Solo se permiten archivos de imagen.");
         setDataUrl(null);

         // limpia el input para poder volver a elegir el mismo archivo
         e.target.value = "";

         return;
      }

      onChange?.(e);

      setError(null);

      if (dataUrl?.startsWith("blob:")) {
         URL.revokeObjectURL(dataUrl);
      }

      const previewUrl = URL.createObjectURL(file);

      setDataUrl(previewUrl);
   };

   return (
      <Fragment>
         <div className="hidden">
            <Label htmlFor={name}>{label}</Label>

            <Input
               ref={fileInput}
               id={id}
               name={name}
               type="file"
               accept="image/*"
               onChange={handleFileChange}
            />
         </div>

         <ImageCard
            dataUrl={dataUrl ?? ""}
            error={error}
            fileInput={fileInput}
            className="max-w-xs"
         />
      </Fragment>
   );
}
