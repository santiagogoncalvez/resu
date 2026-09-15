import { geistMono, plusJakartaSans } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { loaders } from "@/data/loaders";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const appUrl =
   process.env.VERCEL_ENV === "production"
      ? (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
   const metadata = await loaders.getMetaData();

   return {
      metadataBase: new URL(appUrl),
      title: metadata.data.title ?? "resu | Resume tus videos",
      description:
         metadata.data.description ??
         "Resume videos de YouTube con inteligencia artificial y ahorrá tiempo.",
      openGraph: {
         type: "website",
         locale: "es_AR",
         siteName: "resu",
         title: "resu | Resume tus videos",
         description:
            "Resume tus videos de YouTube con inteligencia artificial.",
         images: [
            {
               url: "/og.png",
               width: 1200,
               height: 630,
               alt: "resu | Resume tus videos",
            },
         ],
      },
   };
}

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html
         lang="en"
         suppressHydrationWarning
         className={`${plusJakartaSans.className} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      >
         <body className="min-h-full flex flex-col bg-background">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               {children}

               <Toaster />
            </ThemeProvider>
         </body>
      </html>
   );
}
