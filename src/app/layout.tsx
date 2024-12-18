import "./globals.css";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Note-chat",
  description: "Share your chats and notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <ConvexClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </>
  );
}
