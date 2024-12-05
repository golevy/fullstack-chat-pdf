import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { TailwindIndicator } from "~/components/TailwindIndicator";

import Navbar from "~/components/Navbar";
import AuthProvider from "~/components/providers/AuthProvider";
import { TooltipProvider } from "~/components/ui/tooltip";

import { Toaster as ReactHotToaster } from "react-hot-toast";
import { Toaster } from "~/components/ui/toaster";

import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  description: "",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "grainy min-h-screen font-sans antialiased",
          inter.variable,
        )}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <AuthProvider>
            <TooltipProvider>
              <ReactHotToaster />
              <Toaster />
              <Navbar />
              {children}
              <TailwindIndicator />
            </TooltipProvider>
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
