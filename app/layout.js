import { Inter } from "next/font/google";
import "./globals.css";


const getInter = Inter({
  subsets: ["latin"],
})


export const metadata = {
  title: "Bookit",
  description: "Experince and Slot booking assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${getInter.className} antialiased` }
      >
        {children}
      </body>
    </html>
  );
}
