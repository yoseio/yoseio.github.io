import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

import { Container } from "@/components/Container";
import { NavBar } from "@/components/NavBar";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Container>
          <NavBar />
          {children}
        </Container>
      </body>
    </html>
  );
}
