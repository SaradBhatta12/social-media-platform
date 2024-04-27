import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Developed by Sarad Bhatta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
