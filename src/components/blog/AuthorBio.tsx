export default function AuthorBio({ author }: { author: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-alt p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted">
            Writing about money, frugality, and building wealth with intention.
          </p>
        </div>
      </div>
    </div>
  );
}
