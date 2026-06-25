import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__inner">
        <p className="not-found-page__code">404</p>
        <h1 className="not-found-page__title">Page not found</h1>
        <p className="not-found-page__text">
          That page doesn&apos;t exist or isn&apos;t available right now.
        </p>
        <Link href="/" className="not-found-page__link">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
