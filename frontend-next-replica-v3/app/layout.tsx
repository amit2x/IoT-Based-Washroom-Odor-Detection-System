import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AeroMetric Insight | Smart Washroom Monitoring',
  description: 'Empowering airport infrastructure with real-time monitoring and smart insights.',
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
      <body className="antialiased min-h-screen flex flex-col bg-background text-on-background">
        {children}
      </body>
    </html>
  );
}

