import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AAI Smart Washroom Management | Secure Portal Access',
  description: 'Role-Based Access Control authentication gateway for Airports Authority of India Smart Washroom systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Plus+Jakarta+Sans:wght@200..800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#0b0f19] text-[#e2e8f0]">
        {children}
      </body>
    </html>
  );
}
