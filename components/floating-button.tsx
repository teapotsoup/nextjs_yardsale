import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a className="fixed hover:bg-blue-500 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-blue-400 rounded-full w-14 flex items-center justify-center text-white">
        {children}
      </a>
    </Link>
  );
}