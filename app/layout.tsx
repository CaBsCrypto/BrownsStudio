import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is a minimal root layout that just passes through to children.
  // The actual <html> and <body> tags are in app/[locale]/layout.tsx
  // to support dynamic lang attributes and localized metadata.
  return children;
}
