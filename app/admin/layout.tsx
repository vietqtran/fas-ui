import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import AdminLayout from "@/components/Common/Layouts/AdminLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminLayout>
            {children}
        </AdminLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
