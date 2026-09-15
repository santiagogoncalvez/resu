"use client";

import { ArrowLeft, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorContentProps {
   title?: string;
   description?: string;
   backLabel?: string;
   retryLabel?: string;
   retry?: () => void;
   children?: React.ReactNode;
}

export function ErrorContent({
   title = "Algo salió mal",
   description = "Ocurrió un problema al cargar la aplicación. Intentá nuevamente o volvé a la página anterior.",
   backLabel = "Volver",
   retryLabel = "Intentar de nuevo",
   retry,
   children,
}: ErrorContentProps) {
   return (
      <main className="flex flex-1 items-center justify-center px-4 py-16 h-full">
         <div className="flex w-full max-w-md flex-col items-center text-center">
            <h1 className="text-3xl font-medium tracking-tight">{title}</h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
               {description}
            </p>

            <div className="mt-8 flex items-center gap-2 justify-center flex-wrap">
               <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => window.history.back()}
               >
                  <ArrowLeft strokeWidth={1.5} />
                  {backLabel}
               </Button>

               {retry && (
                  <Button size="lg" onClick={retry}>
                     <RefreshCw strokeWidth={1.5} />
                     {retryLabel}
                  </Button>
               )}
            </div>

            {children}
         </div>
      </main>
   );
}
