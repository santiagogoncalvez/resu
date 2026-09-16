"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { actions } from "@/actions";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/types/strapi";
import { FormState } from "@/types/definitions";
import { PROFILE_FORM_STYLES, SIGN_IN_FORM_STYLES } from "@/constants/styles";

import { SubmitButton } from "./submit-button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { parseFieldErrors } from "@/lib/parsers";

interface ProfileFormProps {
   user?: AuthUser | null;
   className?: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function ProfileForm({ user, className }: Readonly<ProfileFormProps>) {
   const [formState, formAction, isPending] = useActionState(
      actions.profile.updateProfileAction,
      INITIAL_STATE,
   );

   const [initialValues, setInitialValues] = useState({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      bio: user?.bio ?? "",
   });

   const [firstName, setFirstName] = useState(initialValues.firstName);
   const [lastName, setLastName] = useState(initialValues.lastName);
   const [bio, setBio] = useState(initialValues.bio);

   const isDirty =
      firstName !== initialValues.firstName ||
      lastName !== initialValues.lastName ||
      bio !== initialValues.bio;

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
         setInitialValues({
            firstName,
            lastName,
            bio,
         });
      }
   }, [
      formState.success,
      formState.message,
      formState.timestamp,
      firstName,
      lastName,
      bio,
   ]);

   if (!user) {
      return (
         <div className={cn(SIGN_IN_FORM_STYLES.container, className)}>
            No se pudieron cargar los datos del perfil.
         </div>
      );
   }

   return (
      <div className={PROFILE_FORM_STYLES.container}>
         <form action={formAction} className={cn("w-full", className)}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={PROFILE_FORM_STYLES.title}>
                     Información del perfil
                  </CardTitle>

                  <CardDescription>
                     Actualiza tu información personal y tu biografía.
                  </CardDescription>
               </CardHeader>

               <fieldset disabled={isPending}>
                  <CardContent className={PROFILE_FORM_STYLES.content}>
                     <div className={PROFILE_FORM_STYLES.nameRow}>
                        <Field className={PROFILE_FORM_STYLES.fieldGroup}>
                           <FieldLabel htmlFor="username">
                              Nombre de usuario
                           </FieldLabel>
                           <Input
                              id="username"
                              name="username"
                              placeholder="pablo"
                              defaultValue={user.username ?? ""}
                              disabled
                           />
                        </Field>

                        <Field className={PROFILE_FORM_STYLES.fieldGroup}>
                           <FieldLabel htmlFor="email">
                              Correo electrónico
                           </FieldLabel>
                           <Input
                              id="email"
                              name="email"
                              placeholder="pablo@gmail.com"
                              defaultValue={user.email ?? ""}
                              disabled
                           />
                        </Field>
                     </div>

                     <div className={PROFILE_FORM_STYLES.nameRow}>
                        <Field
                           className={PROFILE_FORM_STYLES.fieldGroup}
                           data-invalid={!!formState.zodErrors?.firstName}
                        >
                           <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                           <Input
                              id="firstName"
                              name="firstName"
                              placeholder="Nombre"
                              value={firstName}
                              onChange={(event) =>
                                 setFirstName(event.target.value)
                              }
                              aria-invalid={!!formState.zodErrors?.firstName}
                           />
                           <FieldError
                              errors={parseFieldErrors(
                                 formState.zodErrors?.firstName,
                              )}
                           />
                        </Field>

                        <Field
                           className={PROFILE_FORM_STYLES.fieldGroup}
                           data-invalid={!!formState.zodErrors?.lastName}
                        >
                           <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                           <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Apellido"
                              value={lastName}
                              onChange={(event) =>
                                 setLastName(event.target.value)
                              }
                              aria-invalid={!!formState.zodErrors?.lastName}
                           />
                           <FieldError
                              errors={parseFieldErrors(
                                 formState.zodErrors?.lastName,
                              )}
                           />
                        </Field>
                     </div>

                     <Field
                        className={PROFILE_FORM_STYLES.fieldGroup}
                        data-invalid={!!formState.zodErrors?.bio}
                     >
                        <FieldLabel htmlFor="bio">Biografía</FieldLabel>
                        <Textarea
                           id="bio"
                           name="bio"
                           placeholder="Escribe tu biografía aquí..."
                           className={PROFILE_FORM_STYLES.textarea}
                           value={bio}
                           onChange={(event) => setBio(event.target.value)}
                           aria-invalid={!!formState.zodErrors?.bio}
                        />
                        <FieldError
                           errors={parseFieldErrors(formState.zodErrors?.bio)}
                        />
                     </Field>
                  </CardContent>
               </fieldset>

               <CardFooter className={PROFILE_FORM_STYLES.footer}>
                  <SubmitButton
                     className={PROFILE_FORM_STYLES.button}
                     text="Guardar perfil"
                     loadingText="Guardando perfil"
                     loading={isPending}
                     disabled={!isDirty}
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

function CountBox({ text }: { text: number }) {
   return (
      <div className={PROFILE_FORM_STYLES.countBox}>
         Tú tienes
         <span className={PROFILE_FORM_STYLES.creditText}>{text}</span>
         crédito{text === 1 ? "" : "(s)"}
      </div>
   );
}
