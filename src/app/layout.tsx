import type { Metadata, Viewport } from 'next';
import { Inter, Ubuntu } from 'next/font/google';
import { Toaster } from 'sonner';
import { StoreProvider } from '@/lib/store';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rent gaming gadgets in Bangalore | Zero Deposit Rentals | SharePal',
  description:
    'Rent PS5, Xbox, Oculus VR and racing wheels in Bangalore with zero deposit and free delivery and pickup. A recreation of the SharePal gaming rentals page.',
  // This is an assignment recreation, not the real store: keep it out of search results.
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: 'https://images.sharepal.in/common-icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://images.sharepal.in/common-icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: 'https://images.sharepal.in/common-icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#4C187C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${ubuntu.variable}`}>
      <body className="font-sans">
        <StoreProvider>
          {children}
          <Toaster position="top-center" richColors closeButton toastOptions={{ className: 'font-sans' }} />
        </StoreProvider>
      </body>
    </html>
  );
}
