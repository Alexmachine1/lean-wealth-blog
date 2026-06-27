import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="mt-2 text-muted">
          Looks like this page wandered off. Let us get you back on track.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-dark hover:shadow-md"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
