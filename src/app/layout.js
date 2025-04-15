import './globals.css';
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: 'Portfólio UX/UI Designer',
  description: 'Meu portfólio de UX/UI Design com projetos e jogos interativos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}