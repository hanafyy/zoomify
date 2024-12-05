import StreamVideoProvider from '@/providers/StreamClientProvider';
import React from 'react';

function Rootlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StreamVideoProvider>
      <main>{children}</main>
    </StreamVideoProvider>
  );
}

export default Rootlayout;
