import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/Header/main-header";
import ToastContainerWrapper from "@/components/Toaster/ToastContainerWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ElegantStyles",
  description: "Your Shopping Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainerWrapper />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
