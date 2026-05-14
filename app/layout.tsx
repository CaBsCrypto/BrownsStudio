import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
