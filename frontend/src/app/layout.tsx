import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/page";


export const metadata: Metadata = {
  title: "Cat Blog",
  description: "Purrfect blog for cat and dog lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-slate-50'> 
        <Navbar />
        {children}
      </body>
    </html>
  );
}
