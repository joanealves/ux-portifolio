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
  title: 'Joane Alves - UX/UI Designer e Full Stack Developer',
  description: 'Meu portfólio de UX/UI Design com projetos e jogos interativos',
  icons: {
    icon: '/favicon.png',
  },
  keywords: 'UX, UI, Design, UX Design, Interface, Portfolio, Front-End, Next.js, React, sites, desenvolvimento web, wireframes, web design',
  authors: [{ name: 'Joane Alves' }],
  colorScheme: 'dark',
  openGraph: {
    title: 'Joane Alves - UX/UI Designer e Front-End Developer',
    description: 'Portfólio de UX/UI Design com projetos de interfaces, arquitetura da informação e desenvolvimento front-end para web e aplicativos',
    url: 'https://ux-portifolio-tmuq.vercel.app/lab',
    siteName: 'Joane Alves Portfolio UX',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Joane Alves Portfolio',
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    }
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark"
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}