import type { Metadata } from 'next';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import localFont from 'next/font/local';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
import { Toaster } from '@/components/ui/toaster';
export const metadata: Metadata = {
  title: 'ZOOMIFY',
  description: 'Video calling App',
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/icons/yoom-logo.svg',
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#1C1F2E',
          colorInputBackground: '#252A41',
          colorInputText: '#fff',
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
