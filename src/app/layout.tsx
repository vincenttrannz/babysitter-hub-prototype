import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
// import { GenkitProvider } from '@genkit-ai/next'; // Removed as it's not exported

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'Family Time Bank',
  description: 'A community-based babysitting exchange platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {/* <GenkitProvider> */}
          {children}
          <Toaster />
        {/* </GenkitProvider> */}
      </body>
    </html>
  );
}
