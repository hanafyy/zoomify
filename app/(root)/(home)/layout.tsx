import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import React from 'react';

function Homelayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 max-md:px-14 ">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}

export default Homelayout;
