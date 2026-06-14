import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center">
      <h1 className="text-3xl font-semibold text-black">newtestnext</h1>
      <p className="max-w-md text-zinc-600">
        Hook Agency roofing marketing page clone built from Firecrawl scrape data.
      </p>
      <Link
        href="/roofing-marketing"
        className="rounded bg-[#d4fd52] px-6 py-3 text-sm font-bold uppercase text-black"
      >
        View clone
      </Link>
    </main>
  );
}
