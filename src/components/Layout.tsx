import React from 'react';
import Navbar from '~/components/Navbar';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />

      <div className="p-5 md:max-w-5xl md:m-auto">{children}</div>
    </>
  );
}
