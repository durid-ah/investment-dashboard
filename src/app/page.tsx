'use client'

import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href='accounts' className="btn btn-primary">Accounts</Link>
    </main>
  );
}