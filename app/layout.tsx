import type { Metadata } from "next";
import { Geist, Lato, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./_componants/Navbar";
import Footer from "./_componants/Footer";
import Context, { Provider } from "./_context/Context";

const geistSans = Lato({
  subsets: ["latin"],
  weight:["100","300" ,"400" , "700" , "900"]
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Sefoo Store",
  description: "created By Seifeldeen Ali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{

  

  


  return (
    <html lang="ar">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <Context>
        {/* <div className="cart_window"><h1>te</h1></div> */}
        {children}
        </Context>
      </body>
    </html>
  );
}
