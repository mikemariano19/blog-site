import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Ask Dev",
  description: "Connect with fellow programmers, share knowledge, and grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-slate-50'> 
        {children}
      </body>
    </html>
  );
}
