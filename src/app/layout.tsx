import "@/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

import ConvexClientProvider from "../providers/ConvexClientProvider";

import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Note-Chat",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body>
        <ConvexClientProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster richColors />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
