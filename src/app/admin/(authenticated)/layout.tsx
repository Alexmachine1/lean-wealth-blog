import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/admin";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await checkAuth();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/admin" className="text-lg font-bold text-primary">
            Lean Wealth Admin
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              View Site
            </a>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
