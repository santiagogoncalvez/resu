"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { actions } from "@/actions";
import { cn } from "@/lib/utils";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import { SubmitButton } from "@/components/form/submit-button";
import ImagePicker from "@/components/custom/image-picker";

import { FormState } from "@/types/definitions";
import { Image } from "@/types/strapi";
import {
   IMAGE_FORM_STYLES,
   PROFILE_FORM_STYLES,
   SIGN_IN_FORM_STYLES,
} from "@/constants/styles";
import { toast } from "sonner";
import { FieldError } from "../ui/field";
import { parseFieldErrors } from "@/lib/parsers";
import { useRouter } from "next/navigation";

interface ProfileImageFormProps {
   image?: Image | null;
   className?: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function ProfileImageForm({ image, className }: ProfileImageFormProps) {
   const router = useRouter();
   const [formState, formAction, isPending] = useActionState(
      actions.profile.updateProfileImageAction,
      INITIAL_STATE,
   );

   const [hasChanges, setHasChanges] = useState(false);

   const lastTimestamp = useRef<number | null>(null);

   useEffect(() => {
      if (!formState.timestamp) return;

      if (formState.timestamp === lastTimestamp.current) return;

      lastTimestamp.current = formState.timestamp;

      if (formState.success) {
         toast.success(formState.message, {
            position: "top-center",
            duration: 3000,
         });

         // eslint-disable-next-line react-hooks/set-state-in-effect
         setHasChanges(false);

         router.refresh();
      }
   }, [
      formState.success,
      formState.message,
      formState.timestamp,
      router,
   ]);

   return (
      <div className={IMAGE_FORM_STYLES.container}>
         <form action={formAction} className={cn("w-full", className)}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={PROFILE_FORM_STYLES.title}>
                     Imagen de perfil
                  </CardTitle>
                  <CardDescription>
                     Sube una imagen para personalizar tu perfil.
                  </CardDescription>
               </CardHeader>

               <CardContent className={SIGN_IN_FORM_STYLES.content}>
                  <input
                     hidden
                     id="id"
                     name="id"
                     defaultValue={image?.documentId ?? ""}
                  />

                  <div className={IMAGE_FORM_STYLES.fieldGroup}>
                     <ImagePicker
                        id="image"
                        name="image"
                        label="Imagen de perfil"
                        defaultValue={image?.url ?? ""}
                        onChange={() => setHasChanges(true)}
                     />

                     <FieldError
                        errors={parseFieldErrors(formState.zodErrors?.image)}
                        className="text-center"
                     />
                  </div>
               </CardContent>

               <CardFooter className={SIGN_IN_FORM_STYLES.footer}>
                  <SubmitButton
                     className={SIGN_IN_FORM_STYLES.button}
                     text="Guardar imagen"
                     loadingText="Guardando imagen"
                     loading={isPending}
                     disabled={!hasChanges}
                  />

                  {formState.strapiErrors && (
                     <FieldError
                        errors={parseFieldErrors(
                           formState.strapiErrors.message,
                        )}
                     />
                  )}
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
