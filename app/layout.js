import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

const getInter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Bookit",
  description: "Experince and Slot booking assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${getInter.className} antialiased`}>
        <Header />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
