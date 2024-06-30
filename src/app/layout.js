import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Snake Game",
  description: "Nextjs Snake Game",
  creator: "Zulfikri Nanda Hadi",
     icons: {
    icon: './icon.ico',
  },  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
