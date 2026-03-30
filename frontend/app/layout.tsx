import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Toaster />
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
