import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { Box } from "@mui/material";
import "./globals.css";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talker",
  description: "Let's talk...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeRegistry>
      <Box component="html" lang="en">
        <Box component="body" className={`h-screen flex flex-col ${inter.className}`}>
          <Box component="div" className="flex-grow bg-white">
            <Providers>
              {children}
            </Providers>
          </Box>
        </Box>
      </Box>
    </ThemeRegistry>
  );
}
