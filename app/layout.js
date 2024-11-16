import { Inter, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";


// Import Inter for general text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// Import Montserrat for headings and numbers
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "ExpenseFlow",
  description: "developed by Laiba Hameed",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${montserrat.variable} ${outfit.variable} antialiased`}
        >
          <Toaster/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
