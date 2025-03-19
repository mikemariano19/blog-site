import type { Metadata } from "next";
import "./globals.css";


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
      <body
        className='bg-slate-50'
      >
        {children}
      </body>
    </html>
  );
}
